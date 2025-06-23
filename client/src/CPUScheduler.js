import React, { useState } from "react";
import axios from "axios";
import PageReplacement from "./PageReplacement";
import DiskScheduling from "./DiskScheduling";
import Petersons from "./Petersons";


function CPUScheduler() {
  const [algorithm, setAlgorithm] = useState("round_robin");
  const [quantum, setQuantum] = useState(2);
  const [processes, setProcesses] = useState([
    { pid: "P1", burst_time: 5, priority: 2 },
    { pid: "P2", burst_time: 3, priority: 1 },
  ]);

  const [output, setOutput] = useState([]);
  const [completion, setCompletion] = useState({});
  const [tat, setTat] = useState({});
  const [wt, setWt] = useState({});
  const [stats, setStats] = useState({});

  const handleChange = (index, field, value) => {
    const updated = [...processes];
    updated[index][field] = Number(value);
    setProcesses(updated);
  };

  const handleAddProcess = () => {
    const nextPid = `P${processes.length + 1}`;
    setProcesses([...processes, { pid: nextPid, burst_time: 0, priority: 1 }]);
  };

  const handleRemoveProcess = (index) => {
    const updated = [...processes];
    updated.splice(index, 1);
    setProcesses(updated);
  };

  const sendToBackend = () => {
    const url =
      algorithm === "priority"
        ? "http://localhost:5000/api/priority"
        : "http://localhost:5000/api/round_robin";

    const payload = {
      processes,
      ...(algorithm === "round_robin" && { quantum }),
    };

    axios
      .post(url, payload)
      .then((res) => {
        const { schedule, completion, tat, wt, avgTAT, avgWT } = res.data;
        setOutput(schedule);
        setCompletion(completion);
        setTat(tat);
        setWt(wt);
        setStats({ avgTAT, avgWT });
      })
      .catch((err) => {
        console.error("❌ Backend Error:", err.message);
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>OS Scheduling Visualizer</h2>

      {/* Algorithm selection */}
      <label>Select Algorithm: </label>
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        style={{ marginBottom: 20 }}
      >
        <option value="round_robin">Round Robin</option>
        <option value="priority">Priority Scheduling</option>
      </select>

      {/* Quantum input (only for Round Robin) */}
      {algorithm === "round_robin" && (
        <div style={{ marginBottom: 20 }}>
          Time Quantum:{" "}
          <input
            type="number"
            value={quantum}
            onChange={(e) => setQuantum(Number(e.target.value))}
          />
        </div>
      )}

      {/* Process inputs */}
      <h4>Processes:</h4>
      {processes.map((p, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          {p.pid} – Burst Time:{" "}
          <input
            type="number"
            value={p.burst_time}
            onChange={(e) => handleChange(i, "burst_time", e.target.value)}
          />
          {algorithm === "priority" && (
            <>
              &nbsp; Priority:{" "}
              <input
                type="number"
                value={p.priority}
                onChange={(e) => handleChange(i, "priority", e.target.value)}
              />
            </>
          )}
          &nbsp;
          <button onClick={() => handleRemoveProcess(i)}>Remove</button>
        </div>
        
      ))}

      <button onClick={handleAddProcess}>Add Process</button>
      <button onClick={sendToBackend} style={{ marginLeft: 10 }}>
        Run
      </button>

      {/* Gantt Chart */}
      <h3 style={{ marginTop: 30 }}>Gantt Chart:</h3>
      <div style={{ display: "flex", marginTop: 10 }}>
        {output.map((slot, index) => (
          <div
            key={index}
            style={{
              width: `${(slot.end - slot.start) * 40}px`,
              backgroundColor: "#4caf50",
              color: "#fff",
              textAlign: "center",
              padding: "10px 5px",
              marginRight: 2,
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            {slot.pid}
            <br />
            {slot.start} - {slot.end}
          </div>
        ))}
      </div>

      {/* Table with stats */}
      {Object.keys(completion).length > 0 && (
        <>
          <h3 style={{ marginTop: 30 }}>Process Table:</h3>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>PID</th>
                <th>Completion Time</th>
                <th>Turnaround Time (TAT)</th>
                <th>Waiting Time (WT)</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((p) => (
                <tr key={p.pid}>
                  <td>{p.pid}</td>
                  <td>{completion[p.pid]}</td>
                  <td>{tat[p.pid]}</td>
                  <td>{wt[p.pid]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 style={{ marginTop: 20 }}>
            Average TAT: {stats.avgTAT} | Average WT: {stats.avgWT}
          </h4>
        </>
      )}
      <hr style={{ margin: "40px 0" }} />
    <PageReplacement />
    <hr style={{ margin: "40px 0" }} />
    <DiskScheduling />
    <hr style={{ margin: "40px 0" }} />
    <Petersons />
    </div>
  );
}

export default CPUScheduler;
