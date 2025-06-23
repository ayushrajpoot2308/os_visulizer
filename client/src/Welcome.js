import React from "react";
import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <h1>👋 Welcome to OS Visualizer</h1>
        <p>An Interactive Simulation of Operating System Algorithms</p>
      </div>

      <div className="welcome-content">
        <h2>📘 About This Project</h2>
        <p>
          This project is built to help students visualize and understand core
          Operating System algorithms such as CPU Scheduling, Memory Management,
          Disk Scheduling, and Synchronization (Peterson's Solution).
        </p>

        <h3>🔧 Technologies Used</h3>
        <ul>
          <li>React.js (Frontend)</li>
          <li>Flask (Backend API)</li>
          <li>Axios for API Requests</li>
          <li>Recharts for Graph Visualizations</li>
        </ul>

        <h3>🎯 Project-Based Learning</h3>
        <p>
          This OS Visualizer supports hands-on learning through:
          <ul>
            <li>Real-time simulations and process tracking</li>
            <li>Graphical and tabular representations</li>
            <li>Modular design to add and understand different algorithms</li>
          </ul>
        </p>
      </div>

      <div className="welcome-footer">
        <h4>Developed by Ayush Singh and it's Team</h4>
        <p>B.Tech CSE | 3rd Year</p>
        <p>Guided by: [Mr. Aditya Harbola Sir]</p>
      </div>
    </div>
  );
};

export default Welcome;
