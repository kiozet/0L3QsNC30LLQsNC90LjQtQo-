from PIL import Image
import torch
import os
from django.conf import settings


class ImageProcessor:
    def __init__(self):
        # Укажите правильные пути к модели YOLOv5
        self.model_path = os.path.join(settings.BASE_DIR, 'ai_models', 'best.pt')
        self.yolo_path = os.path.join(settings.BASE_DIR, 'ai_models', 'yolov5')

        # Загрузка модели
        self.model = torch.hub.load(
            self.yolo_path,
            'custom',
            path=self.model_path,
            source='local',
            force_reload=True
        )

    def get_bounding_box_corners(self, img_path, conf_threshold=0.5):
        """Получает информацию о bounding boxes на изображении"""
        img = Image.open(img_path)
        results = self.model(img)
        detections = results.pandas().xyxy[0]  # формат: xmin, ymin, xmax, ymax, confidence, class, name

        boxes_info = []
        for _, row in detections.iterrows():
            if row["confidence"] >= conf_threshold:
                boxes_info.append({
                    "class": row["name"],
                    "confidence": float(row["confidence"]),
                    "corners": [
                        (float(row["xmin"]), float(row["ymin"])),
                        (float(row["xmax"]), float(row["ymax"]))
                    ]
                })

        return boxes_info
