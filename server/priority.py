def priority_scheduling(processes):
    # Sort by priority (lower number = higher priority)
    processes.sort(key=lambda x: x['priority'])

    current_time = 0
    schedule = []
    completion = {}
    tat = {}
    wt = {}

    for p in processes:
        start = current_time
        end = start + p['burst_time']
        schedule.append({"pid": p['pid'], "start": start, "end": end})
        completion[p['pid']] = end
        tat[p['pid']] = end  # Arrival time is assumed to be 0
        wt[p['pid']] = end - p['burst_time']
        current_time = end

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
