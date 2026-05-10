import React, { useCallback, useEffect, useMemo, useState } from 'react'
import EditorSidePanel from './editorSidePanel/EditorSidePanel'
import AnalysisPanel from './analysisPanel/AnalysisPanel'
import useGenerateSliceManager from '@/store/sliceManager/generateSliceManager'
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

// ─── Custom Node Types ────────────────────────────────────────────────────────

interface ArchNodeData {
  label: string
  systemName: string
  type: string
  isActive: boolean
}

const ArchitectureNode = ({ data, selected }: { data: ArchNodeData; selected: boolean }) => {
  return (
    <div
      className={`
        relative px-4 py-3 rounded-xl border-2 min-w-[160px] cursor-pointer
        transition-all duration-200 shadow-md
        ${data.isActive
          ? 'border-blue-500 bg-blue-50 shadow-blue-200'
          : 'border-slate-200 bg-white hover:border-slate-400'
        }
        ${selected ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
      `}
    >
      {/* Type badge */}
      <span className='absolute -top-2.5 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-700 text-white'>
        {data.type}
      </span>

      {/* Icon placeholder */}
      <div className={`w-8 h-8 rounded-lg mb-2 flex items-center justify-center text-base
        ${data.isActive ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
        ⬡
      </div>

      <p className='text-xs font-semibold text-slate-800 leading-tight'>{data.systemName}</p>
      <p className='text-[10px] text-slate-400 mt-0.5'>{data.label}</p>

      {/* Active indicator */}
      {data.isActive && (
        <span className='absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse' />
      )}
    </div>
  )
}

const nodeTypes: NodeTypes = {
  architecture: ArchitectureNode,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Convert architectures from the store into RF nodes arranged in a grid */
const buildNodes = (
  architectures: Array<{ type: string; systemName: string }>,
  activeType: string | null
): Node<ArchNodeData>[] => {
  const COLS = 3
  const GAP_X = 240
  const GAP_Y = 160

  return architectures.map((arch, i) => ({
    id: arch.type,
    type: 'architecture',
    position: {
      x: (i % COLS) * GAP_X + 60,
      y: Math.floor(i / COLS) * GAP_Y + 60,
    },
    data: {
      label: arch.type,
      systemName: arch.systemName,
      type: arch.type,
      isActive: arch.type === activeType,
    },
  }))
}

/** Build a simple sequential edge chain between nodes */
const buildEdges = (nodes: Node[]): Edge[] =>
  nodes.slice(0, -1).map((node, i) => ({
    id: `e-${node.id}-${nodes[i + 1].id}`,
    source: node.id,
    target: nodes[i + 1].id,
    animated: true,
    style: { stroke: '#94a3b8', strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' },
  }))

// ─── Main Editor ──────────────────────────────────────────────────────────────

const Editor = () => {
  const {
    architectures,
    activeArchitectureType,
    isLoading,
    error,
    setActiveArchitectureType,
  } = useGenerateSliceManager()

  const initialNodes = useMemo(
    () => buildNodes(architectures, activeArchitectureType),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const initialEdges = useMemo(() => buildEdges(initialNodes), [initialNodes])

  const [nodes, setNodes, onNodesChange] = useNodesState<ArchNodeData>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // Sync store → nodes when architectures or activeArchitectureType change
  useEffect(() => {
    setNodes((prev) => {
      const updated = buildNodes(architectures, activeArchitectureType)
      // Preserve existing positions so dragging isn't reset
      return updated.map((newNode) => {
        const existing = prev.find((n) => n.id === newNode.id)
        return existing ? { ...newNode, position: existing.position } : newNode
      })
    })
  }, [architectures, activeArchitectureType, setNodes])

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            animated: true,
            style: { stroke: '#94a3b8', strokeWidth: 1.5 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' },
          },
          eds
        )
      ),
    [setEdges]
  )

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node<ArchNodeData>) => {
      setActiveArchitectureType(node.data.type)
    },
    [setActiveArchitectureType]
  )

  return (
    <div className='flex h-screen w-full overflow-hidden bg-slate-50'>
      {/* Left panel */}
      <EditorSidePanel />

      {/* React Flow canvas */}
      <div className='relative flex-1 h-full'>
        {/* Loading overlay */}
        {isLoading && (
          <div className='absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm'>
            <div className='flex flex-col items-center gap-3'>
              <div className='w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin' />
              <p className='text-sm text-slate-500 font-medium'>Generating architecture…</p>
            </div>
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className='absolute top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-lg
            bg-red-50 border border-red-200 text-red-600 text-sm shadow-sm'>
            ⚠ {error}
          </div>
        )}

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color='#cbd5e1'
          />

          <Controls
            className='!bottom-4 !left-4 !top-auto !shadow-md !rounded-xl !overflow-hidden !border !border-slate-200'
            showInteractive={false}
          />

          <MiniMap
            nodeColor={(node) =>
              (node.data as ArchNodeData)?.isActive ? '#3b82f6' : '#e2e8f0'
            }
            className='!bottom-4 !right-4 !top-auto !rounded-xl !border !border-slate-200 !shadow-md'
            maskColor='rgba(248,250,252,0.7)'
          />

          {/* Top panel — active arch info */}
          <Panel position='top-center'>
            <div className='flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-sm text-slate-600'>
              <span className='w-2 h-2 rounded-full bg-blue-500' />
              {activeArchitectureType
                ? `Active: ${activeArchitectureType}`
                : 'Click a node to set active architecture'}
            </div>
          </Panel>

          {/* Top-right — node count */}
          <Panel position='top-right'>
            <div className='px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg shadow'>
              {nodes.length} node{nodes.length !== 1 ? 's' : ''}
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Right panel */}
      <AnalysisPanel />
    </div>
  )
}

export default Editor