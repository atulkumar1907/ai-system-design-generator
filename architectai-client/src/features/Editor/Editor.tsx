import React from 'react'
import EditorSidePanel from './editorSidePanel/EditorSidePanel'
import AnalysisPanel from './analysisPanel/AnalysisPanel'
import { useGenerateSlice } from '@/store/sliceManager/generateSliceManager'

const Editor = () => {
  const {
    architectures,
    activeArchitectureType,
    isLoading,
    error,
    setActiveArchitectureType,
  } = useGenerateSlice();

  console.log({ architectures})

  return (
    <div className='flex justify-between'>
      <EditorSidePanel />

      <div className='h-10 w-10 p-4 bg-white'>
        {architectures.map((arch) => (
          <span className='text-yellow-500' key={arch.type}>{arch.systemName}</span>
        ))}
      </div>

      <AnalysisPanel />
    </div>
  )
}

export default Editor