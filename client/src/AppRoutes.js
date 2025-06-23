import React from "react";
import Welcome from "./Welcome";
import Dashboard from "./Dashboard";
import { Routes, Route} from "react-router-dom";
import CPUScheduler from "./CPUScheduler"; // keep as-is if file is still App.js
import PageReplacement from "./PageReplacement";
import DiskScheduling from "./DiskScheduling";
import Petersons from "./Petersons";


<div style={{
  textAlign: "center",
  padding: "40px 0",
  background: "rgba(0,0,0,0.4)",
  borderBottom: "2px solidrgb(97, 236, 251)"
}}>
  <h1 style={{ fontSize: "2.5rem", color: "#fff" }}>⚙️ OS Algorithm Visualizer</h1>
  <p style={{ fontSize: "1.2rem", color: "#ddd" }}>Interactive simulations of CPU, Memory, Disk & Sync</p>
</div>


function AppRoutes() {
  return (
    <Routes>
         <Route path="/" element={<Welcome />} />
      <Route path="/" element={<Dashboard />} /> 
      <Route path="/cpu" element={<CPUScheduler />} />
      <Route path="/memory" element={<PageReplacement />} />
      <Route path="/disk" element={<DiskScheduling />} />
      <Route path="/sync" element={<Petersons />} />
    </Routes>
  );
}

export default AppRoutes;
