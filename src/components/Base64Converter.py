import base64
import os
print("Current Working Directory:", os.getcwd())

# with open("../RubikRegular.ttf", "rb") as font_file:
with open("C:/Users/musad/OneDrive/Desktop/HelthAi/health-ai-v2/src/RubikRegular.ttf", "rb") as font_file:
    base64_data = base64.b64encode(font_file.read()).decode()
    print(base64_data)
