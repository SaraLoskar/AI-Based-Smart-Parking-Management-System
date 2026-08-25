"""
Live YOLO AI Parking Lot Simulation Script
===========================================
Simulates realistic vehicle entry and exit events detected by the AI camera
and continuously updates the Smart Parking System database in real time.
"""

import time
import random
import requests

API_SIMULATE_URL = "http://localhost:8080/api/yolo/simulate-detection"
PARKING_AREA_ID = "parking001"

ALL_SLOTS = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"]

def run_simulation(iterations=10, interval_seconds=3):
    print("=" * 65)
    print("  🚗 Starting Real-Time YOLO AI Parking Detection Simulation")
    print("=" * 65)
    print(f"  Target Facility : BKC Multi-Level Parking ({PARKING_AREA_ID})")
    print(f"  Monitored Slots : {', '.join(ALL_SLOTS)}")
    print(f"  Backend API URL : {API_SIMULATE_URL}")
    print("=" * 65)

    current_occupied = set(["A1", "A4"])

    for i in range(1, iterations + 1):
        # Simulate realistic event (Car arrives or car leaves)
        action = random.choice(["arrive", "leave", "stay"])
        
        if action == "arrive":
            available = list(set(ALL_SLOTS) - current_occupied)
            if available:
                new_slot = random.choice(available)
                current_occupied.add(new_slot)
                event_desc = f"🚗 Vehicle ARRIVED and parked in Slot {new_slot}"
            else:
                event_desc = "🅿️ Parking Lot is FULL"
        elif action == "leave":
            if current_occupied:
                freed_slot = random.choice(list(current_occupied))
                current_occupied.remove(freed_slot)
                event_desc = f"💨 Vehicle DEPARTED from Slot {freed_slot}"
            else:
                event_desc = "🅿️ Parking Lot is EMPTY"
        else:
            event_desc = "👀 No change in slot occupancy"

        payload = {
            "parkingAreaId": PARKING_AREA_ID,
            "occupiedSlotNumbers": list(current_occupied),
        }

        try:
            res = requests.post(API_SIMULATE_URL, json=payload, timeout=5)
            if res.status_code == 200:
                data = res.json()
                avail = data.get("availableSlots")
                total = data.get("totalSlots")
                print(f"[Frame {i:02d}] {event_desc}")
                print(f"          └── 📊 Live Status: {avail}/{total} Slots Available | Occupied: {sorted(list(current_occupied))}")
            else:
                print(f"[Frame {i:02d}] HTTP Error {res.status_code}: {res.text}")
        except Exception as e:
            print(f"[Frame {i:02d}] ⚠️ Connection Error: {e}")

        if i < iterations:
            time.sleep(interval_seconds)

    print("\n✅ Simulation cycle completed! Check your mobile/web app at http://localhost:8080 to see the live updated slots.")


if __name__ == "__main__":
    run_simulation(iterations=8, interval_seconds=2)
