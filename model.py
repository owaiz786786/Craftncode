# train_model.py

import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib

# Load the dataset
data = pd.read_csv('pathogen_growth.csv')

# Print the first few rows and the columns to verify
print(data.head())
print(data.columns)

# Clean column names (remove any leading/trailing whitespace)
data.columns = data.columns.str.strip()

# Ensure the correct data types for features
data['Temperature (°C)'] = pd.to_numeric(data['Temperature (°C)'], errors='coerce')
data['Humidity (%)'] = pd.to_numeric(data['Humidity (%)'], errors='coerce')

# Split features and labels using the correct column names
X = data[['Temperature (°C)', 'Humidity (%)']]  # Environmental features
y = data['Pathogen Growth (%)']                   # Growth prediction label

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the Random Forest model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse}")

# Save the trained model to a file
joblib.dump(model, 'pathogen_growth_model.pkl')
