import pandas as pd

df = pd.read_csv("dataset/Features.csv")

df = df.drop_duplicates(subset=["Symptom"])  

df.to_csv("dataset/Features.csv", index=False)
print("✅ Successfully removed duplicate symptoms!")
