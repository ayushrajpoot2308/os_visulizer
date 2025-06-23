import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const modules = [
    { label: "🧠 CPU Scheduling", route: "/cpu", color: "#4caf50" },
    { label: "📦 Memory Management", route: "/memory", color: "#2196f3" },
    { label: "💽 Disk Scheduling", route: "/disk", color: "#ff9800" },
    { label: "🔐 Synchronization", route: "/sync", color: "#9c27b0" },
  ];

  return (
    <div className="dashboard">
      <h1 className="dash-title">⚙️ OS Visualizer Dashboard</h1>
      <p className="dash-subtitle">Select a module to begin</p>

      <div className="card-grid">
        {modules.map((mod, i) => (
          <div
            key={i}
            className="dash-card"
            style={{ backgroundColor: mod.color }}
            onClick={() => navigate(mod.route)}
          >
            {mod.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
