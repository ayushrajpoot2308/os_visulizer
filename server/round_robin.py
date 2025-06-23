def round_robin(processes, quantum):
    queue = processes.copy()
    time = 0
    schedule = []
    remaining = {p['pid']: p['burst_time'] for p in queue}
    completion = {}
    tat = {}
    wt = {}

    while any(remaining.values()):
        for p in queue:
            if remaining[p['pid']] > 0:
                start = time
                run_time = min(quantum, remaining[p['pid']])
                time += run_time
                end = time
                schedule.append({"pid": p['pid'], "start": start, "end": end})
                remaining[p['pid']] -= run_time
                if remaining[p['pid']] == 0:
                    completion[p['pid']] = end

    for p in processes:
        tat[p['pid']] = completion[p['pid']] 
        wt[p['pid']] = tat[p['pid']] - p['burst_time']

    avg_tat = sum(tat.values()) / len(tat)
    avg_wt = sum(wt.values()) / len(wt)

    return {
        "schedule": schedule,
        "completion": completion,
        "tat": tat,
        "wt": wt,
        "avgTAT": round(avg_tat, 2),
        "avgWT": round(avg_wt, 2)
    }
