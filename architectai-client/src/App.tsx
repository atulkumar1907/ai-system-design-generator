import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import Home from "./features/home/Home";
import { Navbar } from "./components/shared/navbar/Navbar";
import Editor from "./features/Editor/Editor";
import Compare from "./features/compare/Compare";
import { GenerateForm } from "./features/GenerateForm/GenerateForm";
import { SavedDesigns } from "./features/save/Save";
import CodeGeneratorPage from "./features/code/CodeGeneratorpage";

export default function App() {
  return (
    <Provider store={store}>
      <div className="dark">
        <BrowserRouter>
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/code" element={<CodeGeneratorPage />} />
              <Route path="/saved" element={<SavedDesigns />} />
              <Route path="/generate" element={<GenerateForm />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </Provider>
  );
}