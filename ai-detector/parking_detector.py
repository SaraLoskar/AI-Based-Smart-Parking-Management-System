"""
Smart Parking System - YOLOv8 Real-Time Parking Slot Occupancy Detector
========================================================================
Uses YOLOv8 object detection model (Ultralytics) and OpenCV to monitor
parking lot camera feeds, identify parked vehicles, and automatically
update slot statuses in the Smart Parking System Node.js backend.
"""

import sys
import time
import requests
import numpy as np

# Vehicle classes recognized by YOLO COCO dataset:
# 2: car, 3: motorcycle, 5: bus, 7: truck
VEHICLE_CLASS_IDS = [2, 3, 5, 7]
CLASS_NAMES = {2: "Car", 3: "Bike", 5: "Bus", 7: "Truck"}

BACKEND_API_URL = "http://localhost:8080/api/yolo/occupancy-sync"

def calculate_iou_or_intersection(box_slot, box_vehicle):
    """
    Calculate the intersection area between a parking slot box and a detected vehicle box.
    Returns the percentage of the slot covered by the vehicle.
    """
    sx1, sy1, sx2, sy2 = box_slot
    vx1, vy1, vx2, vy2 = box_vehicle

    # Intersection rectangle coordinates
    ix1 = max(sx1, vx1)
    iy1 = max(sy1, vy1)
    ix2 = min(sx2, vx2)
    iy2 = min(sy2, vy2)

    if ix2 <= ix1 or iy2 <= iy1:
        return 0.0

    intersection_area = (ix2 - ix1) * (iy2 - iy1)
    slot_area = (sx2 - sx1) * (sy2 - sy1)

    if slot_area <= 0:
        return 0.0

    return intersection_area / slot_area


class YOLOParkingDetector:
    def __init__(self, parking_area_id="parking001", model_name="yolov8n.pt", backend_url=BACKEND_API_URL):
        self.parking_area_id = parking_area_id
        self.backend_url = backend_url
        self.model = None

        print(f"[YOLO AI] Initializing YOLOv8 Parking Detector for {parking_area_id}...")
        try:
            from ultralytics import YOLO
            self.model = YOLO(model_name)
            print(f"[YOLO AI] Successfully loaded model '{model_name}'.")
        except ImportError:
            print("[YOLO AI] 'ultralytics' package not installed. Run: pip install -r requirements.txt")
        except Exception as e:
            print(f"[YOLO AI] Warning loading weights: {e}")

    def detect_and_sync(self, frame_or_image_path, slot_boxes):
        """
        Processes an image/frame, detects vehicles with YOLO, and updates backend.
        
        :param frame_or_image_path: numpy image array or path to image/video frame
        :param slot_boxes: Dict of slot bounding boxes:
               { "A1": (x1, y1, x2, y2), "A2": (x1, y1, x2, y2), ... }
        :return: (annotated_frame, detections_list)
        """
        if self.model is None:
            print("[YOLO AI] Model not loaded. Please install dependencies.")
            return None, []

        results = self.model(frame_or_image_path, verbose=False)
        detected_vehicles = []

        # Extract vehicle bounding boxes from YOLO results
        for r in results:
            boxes = r.boxes
            for box in boxes:
                cls_id = int(box.cls[0].item())
                if cls_id in VEHICLE_CLASS_IDS:
                    conf = float(box.conf[0].item())
                    x1, y1, x2, y2 = box.xyxy[0].tolist()
                    detected_vehicles.append({
                        "box": (int(x1), int(y1), int(x2), int(y2)),
                        "confidence": conf,
                        "class_id": cls_id,
                        "type": CLASS_NAMES.get(cls_id, "Car"),
                    })

        detections_payload = []

        # Evaluate each parking slot
        for slot_num, s_box in slot_boxes.items():
            is_occupied = False
            best_conf = 0.0
            v_type = "Car"

            for veh in detected_vehicles:
                coverage = calculate_iou_or_intersection(s_box, veh["box"])
                # If vehicle covers at least 30% of slot area -> marked Occupied
                if coverage > 0.30:
                    is_occupied = True
                    best_conf = veh["confidence"]
                    v_type = veh["type"]
                    break

            detections_payload.append({
                "slotNumber": slot_num,
                "status": "Occupied" if is_occupied else "Available",
                "confidence": round(best_conf, 2) if is_occupied else 0.0,
                "vehicleType": v_type,
            })

        # Sync with Node.js Backend API
        self.sync_to_backend(detections_payload)

        return detections_payload

    def sync_to_backend(self, detections):
        """Sends detected slot statuses via HTTP POST to the backend API"""
        payload = {
            "parkingAreaId": self.parking_area_id,
            "detections": detections,
        }

        try:
            res = requests.post(self.backend_url, json=payload, timeout=5)
            if res.status_code == 200:
                data = res.json()
                print(f"[YOLO Sync ✅] {data.get('message')} (Available: {data.get('availableSlots')}/{data.get('totalSlots')})")
            else:
                print(f"[YOLO Sync ❌] HTTP {res.status_code}: {res.text}")
        except Exception as e:
            print(f"[YOLO Sync ⚠️] Failed to reach backend: {e}")


if __name__ == "__main__":
    print("=" * 65)
    print("  Smart Parking System - YOLOv8 Camera AI Detector")
    print("=" * 65)
    print("Connecting to backend at:", BACKEND_API_URL)
    print("Run `python run_simulation.py` for live demo simulation.")
