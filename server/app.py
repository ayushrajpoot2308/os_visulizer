from flask import Flask, request, jsonify
from flask_cors import CORS
from round_robin import round_robin  # ✅ make sure this is present
from priority import priority_scheduling
from page_replacement import fifo, lru
from disk_scheduling import fcfs_disk
from disk_scheduling import sstf_disk


app = Flask(__name__)
CORS(app)

@app.route("/api/round_robin", methods=["POST"])
def handle_rr():
    data = request.json
    processes = data["processes"]
    quantum = data["quantum"]
    result = round_robin(processes, quantum)
    return jsonify(result)

@app.route("/api/priority", methods=["POST"])
def handle_priority():
    data = request.json
    processes = data["processes"]
    result = priority_scheduling(processes)
    return jsonify(result)

@app.route("/api/page/fifo", methods=["POST"])
def handle_fifo():
    data = request.json
    return jsonify(fifo(data["pages"], data["capacity"]))

@app.route("/api/page/lru", methods=["POST"])
def handle_lru():
    data = request.json
    return jsonify(lru(data["pages"], data["capacity"]))

@app.route("/api/disk/fcfs", methods=["POST"])
def handle_fcfs_disk():
    data = request.json
    return jsonify(fcfs_disk(data["requests"], data["head"]))

@app.route("/api/disk/sstf", methods=["POST"])
def handle_sstf_disk():
    data = request.json
    return jsonify(sstf_disk(data["requests"], data["head"]))


@app.route("/api/test")
def test():
    return jsonify({"message": "Hello from Flask!"})

@app.route("/api/page-replacement", methods=["POST"])
def handle_page_replacement():
    data = request.json
    pages = data["pages"]
    capacity = data["frames"]

    fifo_result = fifo(pages, capacity)
    lru_result = lru(pages, capacity)

    return jsonify({
        "step_by_step": fifo_result["step_by_step"],  # default table shows FIFO
        "comparison": [
            {"algorithm": "FIFO", "page_faults": fifo_result["page_faults"]},
            {"algorithm": "LRU", "page_faults": lru_result["page_faults"]}
        ]
    })

if __name__ == "__main__":
    app.run(debug=True)
