import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./features/home/Home";
import { Navbar } from "./components/shared/navbar/Navbar";
import Editor from "./features/Editor/Editor";
import Compare from "./features/compare/Compare";
import { Code, Save } from "lucide-react";


export default function App() {
  return (
    <div className="dark">
      <BrowserRouter>
        <Navbar />

        {/* Add padding-top because navbar is fixed */}
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/code" element={<Code />} />
            <Route path="/saved" element={<Save />} />
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  );
}