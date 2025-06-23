import React, { useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./PageReplacement.css";

function PageReplacement() {
  const [pages, setPages] = useState("7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2");
  const [frames, setFrames] = useState(3);
  const [results, setResults] = useState([]);
  const [comparison, setComparison] = useState([]);

  const handleRun = () => {
    axios
      .post("http://localhost:5000/api/page-replacement", {
        pages: pages.split(",").map((n) => parseInt(n.trim())),
        frames: parseInt(frames),
      })
      .then((res) => {
        setResults(res.data.step_by_step);
        setComparison(res.data.comparison);
      })
      .catch((err) => console.error("API Error:", err));
  };

  return (
    <div className="page-replacement-container">
      <h2>📦 Page Replacement Simulator</h2>

      <div className="input-panel">
        <label>Pages (comma-separated): </label>
        <input
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          style={{ width: "300px" }}
        />

        <label>Frames: </label>
        <input
          type="number"
          value={frames}
          onChange={(e) => setFrames(e.target.value)}
          style={{ width: "60px" }}
        />

        <button onClick={handleRun}>Run</button>
      </div>

      {/* Step-by-Step Table */}
      {results.length > 0 && (
        <div>
          <h3>🧩 Frame-by-Frame Visualization</h3>
          <table className="frame-table">
            <thead>
              <tr>
                <th>Step</th>
                <th>Page</th>
                {[...Array(parseInt(frames))].map((_, i) => (
                  <th key={i}>Frame {i + 1}</th>
                ))}
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((step, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{step.page}</td>
                  {step.frames.map((f, j) => (
                    <td key={j}>{f !== null ? f : "-"}</td>
                  ))}
                  <td style={{ color: step.hit ? "green" : "red" }}>
                    {step.hit ? "Hit" : "Fault"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Comparison Graph */}
      {comparison.length > 0 && (
        <div style={{ marginTop: 50 }}>
          <h3>📊 Page Fault Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="algorithm" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="page_faults" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default PageReplacement;
