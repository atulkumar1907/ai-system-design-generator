import React, { useCallback, useEffect, useState } from 'react'
import EditorSidePanel from './editorSidePanel/EditorSidePanel'
import AnalysisPanel from './analysisPanel/AnalysisPanel'
import useGenerateSliceManager from '@/store/sliceManager/generateSliceManager'
import { useSaveDiagramMutation } from '@/store/api/generateApi'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Panel,
  type Node,
  type Edge,
  type Connection,
  type NodeTypes,
  MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ArchNodeData {
  label: string
  nodeType: string
  color: string
}

interface ApiNode {
  id: string
  type: string
  label: string
  x: number
  y: number
  color: string
}

interface ApiEdge {
  id: string
  from: string
  to: string
  label?: string
}

// ─── Color map ────────────────────────────────────────────────────────────────

const TYPE_COLORS: Record<string, string> = {
  'Client App':    '#6366f1',
  'Gateway':       '#3b82f6',
  'Microservice':  '#10b981',
  'Database':      '#ef4444',
  'Cache':         '#f59e0b',
  'Storage':       '#8b5cf6',
  'Message Queue': '#eab308',
  'external':      '#6366f1',
  'application':   '#3b82f6',
  'service':       '#10b981',
  'database':      '#ef4444',
  'cache':         '#f59e0b',
}

// ─── Custom node ──────────────────────────────────────────────────────────────

const ArchitectureNode = ({ data, selected }: { data: ArchNodeData; selected: boolean }) => {
  const accent = data.color || TYPE_COLORS[data.nodeType] || '#64748b'
  return (
    <div
      className={`relative px-3 py-2.5 rounded-xl min-w-[140px] cursor-pointer transition-all duration-150 ${selected ? 'ring-2 ring-white/40' : ''}`}
      style={{
        background: 'rgba(30,32,48,0.92)',
        border: `1.5px solid ${accent}55`,
        boxShadow: selected
          ? `0 0 0 2px ${accent}88, 0 4px 24px ${accent}33`
          : '0 2px 12px rgba(0,0,0,0.4)',
      }}
    >
      <div className='absolute top-0 left-0 right-0 h-0.5 rounded-t-xl' style={{ background: accent }} />
      <span
        className='inline-block text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded mb-1.5'
        style={{ background: `${accent}22`, color: accent }}
      >
        {data.nodeType}
      </span>
      <p className='text-[11px] font-semibold text-white leading-tight'>{data.label}</p>
    </div>
  )
}

const nodeTypes: NodeTypes = { arch: ArchitectureNode }

// ─── Converters ───────────────────────────────────────────────────────────────

const apiNodesToRF = (apiNodes: ApiNode[]): Node<ArchNodeData>[] =>
  apiNodes.map((n) => ({
    id: n.id,
    type: 'arch',
    position: { x: n.x * 1.4, y: n.y * 1.4 },
    data: { label: n.label, nodeType: n.type, color: n.color || TYPE_COLORS[n.type] || '#64748b' },
  }))

const apiEdgesToRF = (apiEdges: ApiEdge[]): Edge[] =>
  apiEdges.map((e) => ({
    id: e.id,
    source: e.from,
    target: e.to,
    label: e.label,
    animated: false,
    labelStyle: { fill: '#94a3b8', fontSize: 9 },
    labelBgStyle: { fill: 'rgba(15,17,28,0.85)' },
    style: { stroke: '#334155', strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#475569' },
  }))

// ─── Save button ──────────────────────────────────────────────────────────────

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

const SaveButton = ({ status, onClick }: { status: SaveStatus; onClick: () => void }) => {
  const cfg = {
    idle:   { label: 'Save Design',  border: '#6366f1', text: '#a5b4fc', bg: 'rgba(99,102,241,0.15)',  icon: '↑' },
    saving: { label: 'Saving…',      border: '#4f46e5', text: '#818cf8', bg: 'rgba(99,102,241,0.1)',   icon: '·' },
    saved:  { label: 'Saved',        border: '#10b981', text: '#6ee7b7', bg: 'rgba(16,185,129,0.15)',  icon: '✓' },
    error:  { label: 'Retry',        border: '#ef4444', text: '#fca5a5', bg: 'rgba(239,68,68,0.15)',   icon: '!' },
  }[status]

  return (
    <button
      onClick={onClick}
      disabled={status === 'saving' || status === 'saved'}
      className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all disabled:cursor-not-allowed'
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        color: cfg.text,
        opacity: status === 'saving' ? 0.7 : 1,
      }}
    >
      <span className={status === 'saving' ? 'animate-pulse' : ''}>{cfg.icon}</span>
      {cfg.label}
    </button>
  )
}

// ─── Editor ───────────────────────────────────────────────────────────────────

const Editor = () => {
  const {
    architectures,
    activeArchitectureType,
    isLoading,
    error,
    result,           // full GenerateResponse — posted as-is to POST /diagrams
    setActiveArchitectureType,
  } = useGenerateSliceManager()

  const [saveDiagram] = useSaveDiagramMutation()
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')

  const activeArch =
    architectures.find((a) => a.type === activeArchitectureType) ??
    architectures[0] ??
    null

  const [nodes, setNodes, onNodesChange] = useNodesState<ArchNodeData>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  // Reset save badge whenever a fresh generation lands
  useEffect(() => { setSaveStatus('idle') }, [result])

  useEffect(() => {
    if (!activeArch) return
    setNodes((prev) => {
      const next = apiNodesToRF(activeArch.nodes ?? [])
      return next.map((n) => {
        const existing = prev.find((p) => p.id === n.id)
        return existing ? { ...n, position: existing.position } : n
      })
    })
    setEdges(apiEdgesToRF(activeArch.edges ?? []))
  }, [activeArch, setNodes, setEdges])

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            animated: false,
            style: { stroke: '#334155', strokeWidth: 1.5 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#475569' },
          },
          eds
        )
      ),
    [setEdges]
  )

  const handleSave = useCallback(async () => {
    if (!result || saveStatus === 'saving' || saveStatus === 'saved') return
    setSaveStatus('saving')
    try {
      await saveDiagram(result).unwrap()
      setSaveStatus('saved')
    } catch {
      setSaveStatus('error')
    }
  }, [result, saveDiagram, saveStatus])

  return (
    <div className='flex h-screen w-full overflow-hidden' style={{ background: '#0f1117' }}>
      <EditorSidePanel />

      <div className='relative flex-1 h-full'>
        {isLoading && (
          <div
            className='absolute inset-0 z-10 flex items-center justify-center'
            style={{ background: 'rgba(15,17,23,0.7)', backdropFilter: 'blur(4px)' }}
          >
            <div className='flex flex-col items-center gap-3'>
              <div className='w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin' />
              <p className='text-sm text-slate-400 font-medium'>Generating architecture…</p>
            </div>
          </div>
        )}

        {error && (
          <div
            className='absolute top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-lg border border-red-800 text-red-400 text-sm'
            style={{ background: 'rgba(30,10,10,0.9)' }}
          >
            ⚠ {error}
          </div>
        )}

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.25 }}
          proOptions={{ hideAttribution: true }}
          style={{ background: '#0f1117' }}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1} color='#1e2235' />

          <Controls
            className='!bottom-4 !left-4 !top-auto !rounded-xl !overflow-hidden'
            showInteractive={false}
            style={{
              background: 'rgba(20,22,35,0.9)',
              border: '1px solid #1e2a3a',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
          />

          <MiniMap
            nodeColor={(node) => (node.data as ArchNodeData)?.color ?? '#334155'}
            className='!bottom-4 !right-4 !top-auto !rounded-xl'
            style={{ background: 'rgba(20,22,35,0.9)', border: '1px solid #1e2a3a' }}
            maskColor='rgba(15,17,28,0.75)'
          />

          {/* Active arch pill */}
          <Panel position='top-center'>
            <div
              className='flex items-center gap-2 px-4 py-2 rounded-full text-sm text-slate-300'
              style={{
                background: 'rgba(20,22,35,0.9)',
                border: '1px solid #1e2a3a',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
              }}
            >
              <span className='w-2 h-2 rounded-full bg-indigo-500' />
              {activeArchitectureType ? `Active: ${activeArchitectureType}` : 'No architecture selected'}
            </div>
          </Panel>

          {/* Node count + Save */}
          <Panel position='top-right'>
            <div className='flex items-center gap-2'>
              <div
                className='px-3 py-1.5 text-xs text-slate-400 rounded-lg'
                style={{ background: 'rgba(20,22,35,0.9)', border: '1px solid #1e2a3a' }}
              >
                {nodes.length} node{nodes.length !== 1 ? 's' : ''}
              </div>

              <SaveButton status={saveStatus} onClick={handleSave} />
            </div>
          </Panel>

          {/* Architecture type tabs */}
          {architectures.length > 1 && (
            <Panel position='top-left'>
              <div className='flex gap-1'>
                {architectures.map((arch) => (
                  <button
                    key={arch.type}
                    onClick={() => setActiveArchitectureType(arch.type)}
                    className='px-3 py-1.5 text-xs rounded-lg transition-all'
                    style={{
                      background: arch.type === activeArchitectureType ? 'rgba(99,102,241,0.2)' : 'rgba(20,22,35,0.9)',
                      border: arch.type === activeArchitectureType ? '1px solid #6366f1' : '1px solid #1e2a3a',
                      color: arch.type === activeArchitectureType ? '#a5b4fc' : '#64748b',
                    }}
                  >
                    {arch.type}
                  </button>
                ))}
              </div>
            </Panel>
          )}
        </ReactFlow>
      </div>

      <AnalysisPanel />
    </div>
  )
}

export default Editor