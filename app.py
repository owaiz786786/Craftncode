from flask import Flask, render_template, jsonify
import random  # To simulate real-time data changes

app = Flask(__name__)

# Sample data to simulate real-time backend responses
microbial_growth_data = {
    'temperature': [25.6, 34.2, 31.0, 29.0, 22.3],
    'humidity': [51.2, 75.4, 62.6, 70.3, 86.3],
    'growth': [21.1, 7.1, 9.0, 27.5, 20.2],
    'mse': 137.7,
    'risk_level': 'Medium',  # Example risk level
    'recommended_actions': 'Increase temperature monitoring and reduce humidity.'  # Example action
}

# Function to simulate dynamic data updates
def get_dynamic_data():
    microbial_growth_data['temperature'] = [round(random.uniform(20, 35), 2) for _ in range(5)]
    microbial_growth_data['humidity'] = [round(random.uniform(50, 90), 2) for _ in range(5)]
    microbial_growth_data['growth'] = [round(random.uniform(5, 30), 2) for _ in range(5)]
    microbial_growth_data['mse'] = round(random.uniform(100, 200), 2)
    
    # Simulate dynamic risk level and actions
    microbial_growth_data['risk_level'] = random.choice(['Low', 'Medium', 'High'])
    microbial_growth_data['recommended_actions'] = random.choice([
        'Monitor the situation closely.',
        'Increase temperature monitoring and reduce humidity.',
        'Alert authorities about potential hazards.'
    ])
    
    return microbial_growth_data

# Route to serve the HTML page
@app.route('/')
def index():
    return render_template('index.html')  # Renders the HTML page

# API route to simulate real-time data fetching

@app.route('/api/data')
def get_data():
    return jsonify(get_dynamic_data())

if __name__ == '__main__':
    app.run(debug=True)
