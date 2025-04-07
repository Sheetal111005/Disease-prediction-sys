import joblib
import numpy as np
import pandas as pd

nrf = joblib.load("model.pkl")

feature_names = joblib.load("feature_columns.pkl")  # Ensure this file exists

custom_features = np.zeros((1, 65))
custom_features[0, 0] = 1 
custom_features[0, 1] = 1 

custom_features_df = pd.DataFrame(custom_features, columns=feature_names)

prediction = nrf.predict(custom_features_df)

# Print the generated features and prediction
print("Generated Features:\n", custom_features_df)
print("\nPredicted Output:", prediction[0])
