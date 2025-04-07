from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from fastapi.middleware.cors import CORSMiddleware
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import difflib
import os

# --- NLTK Setup ---
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# --- Load ML Model & Label Encoder ---
model = joblib.load("model30.pkl")
df = pd.read_csv("Testing.csv")
le = LabelEncoder()
le.fit(df["prognosis"])

# --- Symptom List ---
symptoms_list = [
    "muscle_pain", "high_fever", "vomiting", "joint_pain", "fatigue", "nausea",
    "itching", "dark_urine", "mild_fever", "yellowing_of_eyes", "diarrhoea", "headache",
    "abdominal_pain", "chills", "sweating", "malaise", "weight_loss", "loss_of_appetite",
    "chest_pain", "family_history", "abnormal_menstruation", "yellowish_skin",
    "breathlessness", "red_spots_over_body", "blood_in_sputum", "rusty_sputum",
    "cough", "receiving_blood_transfusion", "stomach_bleeding", "indigestion"
]

# Clean readable version for fuzzy matching
symptom_keywords = [s.replace("_", " ") for s in symptoms_list]

# --- FastAPI Setup ---
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific frontend URL in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Input Models ---
class SymptomsInput(BaseModel):
    symptoms: list[str]

class TextInput(BaseModel):
    text: str

class ModelPredictionInput(BaseModel):
    model_index: int
    symptoms: list[str]

# --- Symptom Extractor with Fuzzy Matching ---
def extract_symptoms_from_text(text):
    tokens = word_tokenize(text.lower())
    filtered = [lemmatizer.lemmatize(w) for w in tokens if w.isalpha() and w not in stop_words]

    matched = []
    for keyword, original_symptom in zip(symptom_keywords, symptoms_list):
        if keyword in " ".join(filtered):
            matched.append(original_symptom)
        else:
            for word in filtered:
                close = difflib.get_close_matches(word, keyword.split(), n=1, cutoff=0.8)
                if close:
                    matched.append(original_symptom)
                    break
    return list(set(matched))

# --- Routes ---

@app.get("/")
def home():
    return {"message": "Disease Prediction API is Live 🔥"}

@app.post("/predict")
def predict_disease(data: SymptomsInput):
    input_vector = [1 if symptom in data.symptoms else 0 for symptom in symptoms_list]
    prediction = model.predict([input_vector])[0]
    predicted_disease = le.inverse_transform([prediction])[0]
    return {
        "input_symptoms": data.symptoms,
        "predicted_disease": predicted_disease
    }

@app.post("/extract_symptoms")
def extract_and_predict(data: TextInput):
    extracted = extract_symptoms_from_text(data.text)
    input_vector = [1 if symptom in extracted else 0 for symptom in symptoms_list]
    prediction = model.predict([input_vector])[0]
    predicted_disease = le.inverse_transform([prediction])[0]
    return {
        "raw_input": data.text,
        "extracted_symptoms": extracted,
        "predicted_disease": predicted_disease
    }

@app.post("/predict_by_model")
def predict_by_model(data: ModelPredictionInput):
    try:
        # Construct path to model file
        model_path = f"rf_model.pkl"
        # if not os.path.exists(model_path):
        #     return {"error": f"Model for index {data.model_index} not found."}

        # Load the selected model
        custom_model = joblib.load(model_path)
        symptoms_list = list(pd.read_csv("Testing.csv").columns[:-1])
        # print(symptoms_list)
        # Create input vector
        input_vector = [1 if symptom in data.symptoms else 0 for symptom in symptoms_list]
        prediction = custom_model.predict([input_vector])[0]
        predicted_disease = le.inverse_transform([prediction])[0]

        return {
            "model_index": data.model_index,
            "input_symptoms": data.symptoms,
            "predicted_disease": predicted_disease
        }

    except Exception as e:
        return {"error": str(e)}
# Optional: quick test
if __name__ == "__main__":
    print(extract_symptoms_from_text("Hello i am having cold & fever also urine is dark"))
