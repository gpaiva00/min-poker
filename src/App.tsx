import React from "react";
import { Routes, Route } from "react-router-dom";

import { HomePage } from "@/pages/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:roomId" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
