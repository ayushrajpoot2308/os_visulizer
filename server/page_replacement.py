def fifo(pages, capacity):
    memory = []
    steps = []
    faults = 0

    for page in pages:
        hit = page in memory
        if not hit:
            faults += 1
            if len(memory) < capacity:
                memory.append(page)
            else:
                memory.pop(0)
                memory.append(page)

        frame_snapshot = memory + [None] * (capacity - len(memory))
        steps.append({
            "page": page,
            "frames": frame_snapshot,
            "hit": hit
        })

    return {
        "step_by_step": steps,
        "page_faults": faults
    }

def lru(pages, capacity):
    memory = []
    recent = {}
    steps = []
    faults = 0

    for i, page in enumerate(pages):
        hit = page in memory
        if not hit:
            faults += 1
            if len(memory) < capacity:
                memory.append(page)
            else:
                lru_page = min(memory, key=lambda p: recent.get(p, -1))
                memory[memory.index(lru_page)] = page

        recent[page] = i
        frame_snapshot = memory + [None] * (capacity - len(memory))
        steps.append({
            "page": page,
            "frames": frame_snapshot,
            "hit": hit
        })

    return {
        "step_by_step": steps,
        "page_faults": faults
    }
