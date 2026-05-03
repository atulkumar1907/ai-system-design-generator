import React from 'react';
import './CodeViewport.css';

const CodeViewport = () => {
  return (
    <div className="code-viewport">
      {/* File 1: Controller */}
      <div className="editor-window">
        <div className="editor-header">
          <div className="window-dots"><span/><span/><span/></div>
          <span className="file-path">src/controllers/feedController.ts</span>
        </div>
        <pre className="code-block">
          <code>
            <span className="keyword">import</span> {'{ Request, Response }'} <span className="keyword">from</span> <span className="string">'express'</span>;{'\n'}
            <span className="comment">// ... logic as seen in reference image</span>
          </code>
        </pre>
      </div>

      {/* File 2: Service */}
      <div className="editor-window">
        <div className="editor-header">
          <div className="window-dots"><span/><span/><span/></div>
          <span className="file-path">src/services/feedService.ts</span>
        </div>
        <pre className="code-block">
          <code>
            <span className="keyword">export class</span> <span className="type">FeedService</span> {'{'}{'\n'}
            <span className="keyword">  private</span> cache = <span className="keyword">new</span> <span className="type">RedisCache</span>();
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeViewport;