# 🤖 YOLO AI Vision Parking Slot Detection

This module uses **YOLOv8** (Computer Vision Deep Learning) and **OpenCV** to automatically monitor parking lots, detect occupied and free slots from CCTV camera video streams, and synchronize real-time availability with the Smart Parking System backend.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd ai-detector
pip install -r requirements.txt
```

### 2. Run the Live AI Simulation (Demo Mode)
To simulate live vehicle arrivals and departures with real-time database updates:
```bash
python run_simulation.py
```

### 3. Connect Real Camera / Video Stream
```python
from parking_detector import YOLOParkingDetector

detector = YOLOParkingDetector(parking_area_id="parking001")

# Define camera coordinates for your slots: (x1, y1, x2, y2)
slot_boxes = {
    "A1": (50, 100, 250, 450),
    "A2": (270, 100, 470, 450),
    "A3": (490, 100, 690, 450),
    "A4": (710, 100, 910, 450),
}

# Run detection on a camera frame or image file:
detections = detector.detect_and_sync("parking_lot_snapshot.jpg", slot_boxes)
print(detections)
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/yolo/occupancy-sync` | Bulk sync slot occupancy from AI camera |
| `GET` | `/api/yolo/slots/:parkingAreaId` | Retrieve slot coordinates and statuses |
| `POST` | `/api/yolo/simulate-detection` | Trigger simulated AI detection cycle |
