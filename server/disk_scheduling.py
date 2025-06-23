def fcfs_disk(requests, head):
    seek_sequence = []
    total_head_movement = 0
    current = head

    for req in requests:
        seek_sequence.append({
            "from": current,
            "to": req,
            "move": abs(current - req)
        })
        total_head_movement += abs(current - req)
        current = req

    return {
        "algorithm": "FCFS Disk Scheduling",
        "seek_sequence": seek_sequence,
        "total_head_movement": total_head_movement
    }

def sstf_disk(requests, head):
    requests = requests.copy()
    seek_sequence = []
    total_head_movement = 0
    current = head

    while requests:
        # Find request with the shortest seek time from current head
        nearest = min(requests, key=lambda r: abs(current - r))
        movement = abs(current - nearest)
        seek_sequence.append({
            "from": current,
            "to": nearest,
            "move": movement
        })
        total_head_movement += movement
        current = nearest
        requests.remove(nearest)

    return {
        "algorithm": "SSTF Disk Scheduling",
        "seek_sequence": seek_sequence,
        "total_head_movement": total_head_movement
    }
