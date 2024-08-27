function randomValue(max) {
    return Math.floor(Math.random() * max);
}

function drawGauge(canvas, value, maxValue, color) {
    const ctx = canvas.getContext('2d');
    const radius = canvas.width / 2;
    const angle = Math.PI * (value / maxValue);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 10, Math.PI, 0);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#e0e0e0';
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 10, Math.PI, Math.PI + angle, false);
    ctx.strokeStyle = color;
    ctx.stroke();
}

const temperatureCanvas = document.querySelector('#temperatureGauge canvas');
const humidityCanvas = document.querySelector('#humidityGauge canvas');
const lightCanvas = document.querySelector('#lightGauge canvas');

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: hours,
        datasets: [{
            label: 'Temperature (°C)',
            data: Array(24).fill().map(() => randomValue(101)),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }, {
            label: 'Humidity (%)',
            data: Array(24).fill().map(() => randomValue(101)),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }, {
            label: 'Light (Lux)',
            data: Array(24).fill().map(() => randomValue(1001)),
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 1000,
                ticks: {
                    stepSize: 100
                }
            }
        }
    }
});

function updateGaugeColors() {
    const temperature = (Math.random() * 10 + 20).toFixed(1);
    const humidity = (Math.random() * 20 + 40).toFixed(1);
    const light = (Math.random() * 300 + 100).toFixed(0);

    document.getElementById('temperature').innerText = temperature;
    document.getElementById('humidity').innerText = humidity;
    document.getElementById('light').innerText = light;

    drawGauge(temperatureCanvas, temperature, 100, '#ff0000'); // Red for temperature
    drawGauge(humidityCanvas, humidity, 100, '#0000ff'); // Blue for humidity
    drawGauge(lightCanvas, light, 1000, '#ffff00'); // Yellow for light
}

function toggleDevice2(device) {
    const button = document.getElementById(`${device}-button`);
    const isActive = button.classList.contains('active');

    const status = isActive ? 'Off' : 'On'; // Correct the status logic
    button.innerText = status;
    button.classList.toggle('active'); // Toggle the class after setting the status

    // Store device state in local storage
    const deviceStates = JSON.parse(localStorage.getItem('deviceStates')) || {};
    deviceStates[device] = status;
    localStorage.setItem('deviceStates', JSON.stringify(deviceStates));

    // Store history in local storage
    const history = JSON.parse(localStorage.getItem('deviceHistory')) || [];
    history.push({
        device,
        status,
        timestamp: Date.now()
    });
    localStorage.setItem('deviceHistory', JSON.stringify(history));
}

setInterval(updateGaugeColors, 2000);

document.addEventListener('DOMContentLoaded', () => {
    updateGaugeColors();
});