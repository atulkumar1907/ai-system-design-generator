import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './CodeGeneratorPage.css';
import CodeSidebar from './components/CodeSideBar/CodeSideBar';
import CodeViewport from './components/CodeViewPort/CodeViewPort';

const CodeGeneratorPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="code-gen-layout">
      {/* FULL HEIGHT SIDEBAR */}
      <CodeSidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

      {/* MAIN CONTENT AREA */}
      <div className="code-gen-main">
        <header className="code-gen-header">
          <div className="header-text">
            <h1>Code generator</h1>
            <p>Generate backend boilerplate from your architecture diagram.</p>
          </div>
          
          {/* Mobile Toggle Button */}
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>
        
        <div className="code-gen-scroller">
          <CodeViewport />
        </div>
      </div>
    </div>
  );
};

export default CodeGeneratorPage;