import pandas as pd
from sklearn.model_selection import train_test_split

# Load datasets
train_df = pd.read_csv("../dataset/Training.csv")
test_df = pd.read_csv("../dataset/Testing.csv")

# Drop "prognosis" column //
# train_df = train_df.drop(columns=["prognosis"], errors="ignore")
# test_df = test_df.drop(columns=["prognosis"], errors="ignore")

print(f"Original Train Size: {len(train_df)}, Test Size: {len(test_df)}")

# Count duplicate rows within train and test
train_duplicates = train_df.duplicated().sum()
test_duplicates = test_df.duplicated().sum()

print(f"Duplicate Rows in Train: {train_duplicates}")
print(f"Duplicate Rows in Test: {test_duplicates}")

# Remove duplicates **within** train and test
train_df = train_df.drop_duplicates(keep="first")
test_df = test_df.drop_duplicates(keep="first")

print(f"After Removing Internal Duplicates - Train: {len(train_df)}, Test: {len(test_df)}")

# Find duplicates in test that are **also in train**
duplicate_test_rows = test_df.apply(tuple, 1).isin(train_df.apply(tuple, 1))
duplicate_count_in_test = duplicate_test_rows.sum()

print(f"Duplicate Rows in Test that Exist in Train: {duplicate_count_in_test}")

# Remove test rows that exist in train
clean_test_df = test_df[~duplicate_test_rows]

print(f"After Removing Duplicates From Test: Test Size = {len(clean_test_df)}")

# Ensure train set is not reduced too much
train_data = train_df

# If test set is empty, create a fresh split
if len(clean_test_df) == 0:
    print("All test rows were duplicates! Creating a new test split from train data.")
    
    train_data, test_data = train_test_split(train_data, test_size=0.2, random_state=42, shuffle=True)
else:
    test_data = clean_test_df

# Save new train & test datasets
train_data.to_csv("clean_train.csv", index=False)
test_data.to_csv("clean_test.csv", index=False)

print(f"✅ Final Train Size: {len(train_data)}, Test Size: {len(test_data)}")
