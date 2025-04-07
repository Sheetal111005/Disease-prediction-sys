import joblib
import numpy as np
import re

# Load trained model
model = joblib.load("random_forest_model.pkl")

def load_symptoms():
    """Load the list of symptoms from the trained model."""
    return list(model.feature_names_in_)

# Load the expected symptoms
expected_symptoms = load_symptoms()
print(f"✅ Loaded {len(expected_symptoms)} symptoms.")
print("✅ Model loaded successfully!")

def extract_symptoms(user_input):
    """Extract symptoms from user input."""
    words = re.findall(r'\b\w+\b', user_input.lower())
    return [word for word in words if word in expected_symptoms]

def encode_symptoms(extracted_symptoms):
    """Create a feature vector matching the model's expected input format."""
    num_features = len(expected_symptoms)
    symptom_vector = np.zeros((1, num_features))

    for symptom in extracted_symptoms:
        index = expected_symptoms.index(symptom)
        symptom_vector[0, index] = 1  # Activate the corresponding symptom

    return symptom_vector

while True:
    user_input = input("\n🩺 Describe your symptoms: ").strip()
    if user_input.lower() in ["exit", "quit"]:
        print("👋 Exiting...")
        break

    extracted_symptoms = extract_symptoms(user_input)
    print("🔎 Extracted Symptoms:", extracted_symptoms)

    if not extracted_symptoms:
        print("⚠️ No recognizable symptoms found. Please describe in more detail.")
        continue

    try:
        symptom_vector = encode_symptoms(extracted_symptoms)
        prediction = model.predict(symptom_vector)

        print("\n Predicted Disease:", prediction[0])

    except Exception as e:
        print(f" Error in prediction: {e}")
