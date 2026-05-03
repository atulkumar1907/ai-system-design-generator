import React from 'react'
import EditorSidePanel from './editorSidePanel/EditorSidePanel'
import AnalysisPanel from './analysisPanel/AnalysisPanel'

const Editor = () => {
  return (
    <div className='flex justify-between'>
      <EditorSidePanel />
      <AnalysisPanel />
    </div>
  )
}

export default Editor