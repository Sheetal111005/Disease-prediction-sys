from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder

app = FastAPI()

# Add CORS middleware (dev-safe)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten for prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load both models
model_30 = joblib.load("model30.pkl")  # 30 feature model
model_132 = joblib.load("model1.pkl")  # 132 feature model

# Load dataset and fit label encoder
df = pd.read_csv("Training.csv")
le = LabelEncoder()
le.fit(df["prognosis"])

# Define feature lists for both models
symptoms_list_30 = [
    "muscle_pain", "high_fever", "vomiting", "joint_pain", "fatigue", "nausea",
    "itching", "dark_urine", "mild_fever", "yellowing_of_eyes", "diarrhoea", "headache",
    "abdominal_pain", "chills", "sweating", "malaise", "weight_loss", "loss_of_appetite",
    "chest_pain", "family_history", "abnormal_menstruation", "yellowish_skin",
    "breathlessness", "red_spots_over_body", "blood_in_sputum", "rusty_sputum",
    "cough", "receiving_blood_transfusion", "stomach_bleeding", "indigestion"
]

symptoms_list_132 = list(pd.read_csv("Testing.csv").columns[:-1])  # assuming full list is in Testing.csv

# Input model for both
class SymptomsInput(BaseModel):
    symptoms: list[str]

# Endpoint for 30-feature model
@app.post("/predict_30")
def predict_disease_30(data: SymptomsInput):
    input_vector = [1 if symptom in data.symptoms else 0 for symptom in symptoms_list_30]
    prediction = model_30.predict([input_vector])[0]
    predicted_disease = le.inverse_transform([prediction])[0]
    return {
        "model": "30-feature",
        "input_symptoms": data.symptoms,
        "predicted_disease": predicted_disease
    }

# Endpoint for 132-feature model
@app.post("/predict_132")
def predict_disease_132(data: SymptomsInput):
    input_vector = [1 if symptom in data.symptoms else 0 for symptom in symptoms_list_132]
    prediction = model_132.predict([input_vector])[0]
    predicted_disease = le.inverse_transform([prediction])[0]
    return {
        "model": "132-feature",
        "input_symptoms": data.symptoms,
        "predicted_disease": predicted_disease
    }
