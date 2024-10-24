document.addEventListener('DOMContentLoaded', () => {
    // Fetch real-time data every 5 seconds
    setInterval(fetchRealTimeData, 5000);

    // Initial Load of Charts and Data
    loadInitialDashboard();
    renderMap();
    createGrowthChart(); // Initialize the growth chart
    displayMSE(); // Display MSE on load
});

// Fetch real-time data (Simulated)
function fetchRealTimeData() {
    fetch('/api/realtime') // Simulating with local data
        .then(response => response.json())
        .then(data => {
            document.getElementById('genomic-stream').textContent = data.genomic;
            document.getElementById('sensor-stream').textContent = data.sensor;
            document.getElementById('prediction').textContent = data.prediction;
        });
}

// Simulate initial dashboard load
function loadInitialDashboard() {
    const sampleData = {
        time: ['10:00', '10:05', '10:10'],
        growth: [10, 12, 15],
        prediction: 'Moderate',
        genomicData: 'Sample Genomic Sequence',
        envStatus: 'Temperature: 25°C, Humidity: 70%'
    };

    Plotly.newPlot('growth-chart', [{
        x: sampleData.time,
        y: sampleData.growth,
        type: 'scatter'
    }]);

    document.getElementById('prediction').textContent = sampleData.prediction;
    document.getElementById('genomic-data').textContent = sampleData.genomicData;
    document.getElementById('env-status').textContent = sampleData.envStatus;
}

// Render Map using Leaflet
function renderMap() {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('<b>Sample Location</b><br>Pathogen Growth: 12%')
        .openPopup();
}

// Data for the microbial growth chart
const temperature = [25.618102, 34.260715, 30.979909, 28.979877, 22.340280];
const humidity = [51.257167, 75.456416, 62.574239, 70.342828, 86.302659];
const growth = [21.050791, 7.103499, 9.040718, 27.463855, 20.160726];
const mseValue = 137.7228108403528; // Example MSE value

// Function to create the growth chart
function createGrowthChart() {
    const trace1 = {
        x: temperature,
        y: growth,
        mode: 'markers+lines',
        type: 'scatter',
        name: 'Pathogen Growth',
        marker: { size: 10, color: 'blue' },
        line: { color: 'blue' }
    };
    const trace2 = {
        x: temperature,
        y: humidity,
        mode: 'markers+lines',
        type: 'scatter',
        name: 'Humidity',
        marker: { size: 10, color: 'green' },
        line: { color: 'green' }
    };
    const data = [trace1, trace2];

    const layout = {
        title: 'Temperature vs. Pathogen Growth and Humidity',
        xaxis: { title: 'Temperature (°C)' },
        yaxis: { title: 'Growth (%) / Humidity (%)' },
        showlegend: true
    };

    Plotly.newPlot('growth-chart', data, layout);
}

// Function to display MSE
function displayMSE() {
    document.getElementById('mse').textContent = mseValue.toFixed(2);
}
