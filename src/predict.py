import joblib
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Load training data and recreate LabelEncoder
df = pd.read_csv('Training.csv')
le = LabelEncoder()
le.fit(df['prognosis'])

model = joblib.load('model1.pkl')

symptoms_list = list(pd.read_csv('Testing.csv').columns[:-1])

input_symptoms = ['irritation_in_anus' ]

input_vector = [1 if symptom in input_symptoms else 0 for symptom in symptoms_list]

prediction = model.predict([input_vector])[0]

predicted_disease = le.inverse_transform([prediction])[0]
print("Predicted Disease:", predicted_disease)
