import base64
import cv2
import numpy as np

def img_base64_to_matlike(img_base64: str) -> cv2.typing.MatLike:
    base64_data = img_base64.split(',')[1]
    img_bytes = base64.b64decode(base64_data)
    np_img = np.frombuffer(img_bytes, np.uint8)
    matlike_img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    return matlike_img