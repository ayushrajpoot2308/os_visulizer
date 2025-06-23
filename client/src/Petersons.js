import React, { useState } from "react";
import "./Petersons.css";

function Petersons() {
  const [flag, setFlag] = useState([false, false]);
  const [turn, setTurn] = useState(0);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState(["Idle", "Idle"]);
  const [useLock, setUseLock] = useState(true);
  const [progress, setProgress] = useState([0, 0]);
  const [race, setRace] = useState(false); // 👈 Race condition flag

  const resetAll = () => {
    setFlag([false, false]);
    setTurn(0);
    setLogs([]);
    setStatus(["Idle", "Idle"]);
    setProgress([0, 0]);
    setRace(false);
  };

  const log = (msg) => {
    setLogs((prev) => [...prev, msg]);
  };

  const enterCriticalSection = (proc) => {
    const other = 1 - proc;
    const newFlag = [...flag];
    newFlag[proc] = true;
    setFlag(newFlag);
    setTurn(other);
    log(`🟡 P${proc} wants to enter CS`);
    setStatus((prev) => {
      const copy = [...prev];
      copy[proc] = "Requesting";
      return copy;
    });

    const tryEnter = setInterval(() => {
      if (!useLock || (!flag[other] || turn !== other)) {
        clearInterval(tryEnter);
        log(`✅ P${proc} entered Critical Section`);
        setStatus((prev) => {
          const copy = [...prev];
          copy[proc] = "In CS";
          return copy;
        });

        // ⚠️ Check race condition
        setTimeout(() => {
          const currentStatuses = [...status];
          currentStatuses[proc] = "In CS";

          const bothInCS =
            currentStatuses.filter((s) => s === "In CS").length === 2;

          if (!useLock && bothInCS) {
            setRace(true);
            log("❌ Race Condition! Both in CS!");
          }
        }, 200);

        // Animate timeline
        let progressValue = 0;
        const animate = setInterval(() => {
          progressValue += 10;
          setProgress((prev) => {
            const copy = [...prev];
            copy[proc] = progressValue;
            return copy;
          });
          if (progressValue >= 100) {
            clearInterval(animate);
            newFlag[proc] = false;
            setFlag([...newFlag]);
            log(`🔓 P${proc} exited Critical Section`);
            setStatus((prev) => {
              const copy = [...prev];
              copy[proc] = "Exited";
              return copy;
            });
            setRace(false); // reset race flag
            setTimeout(() => {
              setProgress((prev) => {
                const copy = [...prev];
                copy[proc] = 0;
                return copy;
              });
            }, 500);
          }
        }, 200);
      } else {
        log(`⏳ P${proc} waiting...`);
        setStatus((prev) => {
          const copy = [...prev];
          copy[proc] = "Waiting";
          return copy;
        });
      }
    }, 400);
  };

  return (
    <div className="peterson-container">
      <h2>🔐 Peterson's Solution Simulation</h2>

      {race && (
        <div className="race-alert">
          ⚠️ Race Condition! Both processes are in Critical Section!
        </div>
      )}

      <div className="toggle-lock">
        <label>
          <input
            type="checkbox"
            checked={useLock}
            onChange={() => setUseLock(!useLock)}
          />
          Use Peterson's Lock
        </label>
        <button onClick={resetAll} style={{ marginLeft: 20 }}>
          🔄 Reset
        </button>
      </div>

      <div className="process-row">
        {[0, 1].map((proc) => (
          <div
            key={proc}
            className={`process-box ${status[proc]
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            <h3>Process P{proc}</h3>
            <p>Status: <strong>{status[proc]}</strong></p>
            <div className="timeline">
              <div
                className="bar"
                style={{ width: `${progress[proc]}%` }}
              ></div>
            </div>
            <button onClick={() => enterCriticalSection(proc)}>
              Start P{proc}
            </button>
          </div>
        ))}
      </div>

      <div className="log-panel">
        <h4>Execution Log:</h4>
        <ul>
          {logs.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Petersons;
