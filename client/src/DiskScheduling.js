import React, { useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function DiskScheduling() {
  const [head, setHead] = useState("");
  const [requests, setRequests] = useState("");
  const [algorithm, setAlgorithm] = useState("fcfs");
  const [result, setResult] = useState(null);

  const handleRun = () => {
    const parsedRequests = requests
      .split(",")
      .map((r) => parseInt(r.trim()))
      .filter((n) => !isNaN(n));

    let apiUrl = "";
    if (algorithm === "fcfs")
      apiUrl = "http://localhost:5000/api/disk/fcfs";
    else if (algorithm === "sstf")
      apiUrl = "http://localhost:5000/api/disk/sstf";

    axios
      .post(apiUrl, {
        head: parseInt(head),
        requests: parsedRequests,
      })
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => console.error("API Error:", err));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Disk Scheduling Visualizer</h2>

      {/* Algorithm Selector */}
      <label>Select Algorithm:</label>
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        style={{ marginLeft: 10, marginBottom: 20 }}
      >
        <option value="fcfs">FCFS</option>
        <option value="sstf">SSTF</option>
      </select>

      <br />
      <label>Head Start Position: </label>
      <input
        type="number"
        value={head}
        onChange={(e) => setHead(e.target.value)}
      />

      <br /><br />
      <label>Disk Queue (comma-separated): </label>
      <input
        type="text"
        value={requests}
        onChange={(e) => setRequests(e.target.value)}
        placeholder="e.g. 95, 180, 34, 119, 11"
        style={{ width: "300px" }}
      />

      <br /><br />
      <button onClick={handleRun}>Run</button>

      {/* Output */}
      {result && (
        <div style={{ marginTop: 30 }}>
          <h3>{result.algorithm}</h3>
          <p>
            Total Head Movement:{" "}
            <strong>{result.total_head_movement}</strong>
          </p>

          <h4>Seek Sequence:</h4>
          <ul>
            {result.seek_sequence.map((step, i) => (
              <li key={i}>
                From {step.from} to {step.to} — Move: {step.move}
              </li>
            ))}
          </ul>

          <h4>Visual Representation (Line Chart):</h4>
          <LineChart
            width={600}
            height={300}
            data={result.seek_sequence.map((step, index) => ({
              step: index + 1,
              position: step.to,
            }))}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="step"
              label={{
                value: "Step",
                position: "insideBottomRight",
                offset: -5,
              }}
            />
            <YAxis
              label={{
                value: "Head Position",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="position"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      )}
    </div>
  );
}

export default DiskScheduling;
