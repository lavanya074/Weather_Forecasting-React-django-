# Weather Forecasting

A Django-based Weather Forecasting web application that displays current weather information and predicts future weather conditions using Machine Learning.

The application fetches real-time weather data from the OpenWeatherMap API and uses historical weather data to predict rain, temperature, and humidity trends.

## Features

- Search weather by city name
- Display current temperature, humidity, pressure, wind speed, visibility, clouds, and weather description
- Predict whether it may rain or not
- Predict future temperature values
- Predict future humidity values
- Uses Machine Learning models for weather prediction
- Clean web interface using HTML, CSS, and JavaScript
- Django backend for handling requests and rendering results

## Tech Stack

- Python
- Django
- HTML
- CSS
- JavaScript
- Pandas
- NumPy
- Scikit-learn
- Requests
- OpenWeatherMap API
- SQLite

## Machine Learning Approach

This project uses historical weather data from `weather.csv`.

Machine Learning models used:

- `RandomForestClassifier` for rain prediction
- `RandomForestRegressor` for temperature and humidity forecasting

The model is trained using weather features such as:

- Minimum Temperature
- Maximum Temperature
- Wind Gust Direction
- Wind Gust Speed
- Humidity
- Pressure
- Temperature

## Project Structure

```text
Weather_Forecasting/
│
├── ML Model/
│   └── weatherProject/
│       ├── forecast/
│       │   ├── Templates/
│       │   │   └── weather.html
│       │   ├── static/
│       │   │   ├── css/
│       │   │   ├── img/
│       │   │   └── js/
│       │   ├── views.py
│       │   ├── urls.py
│       │   ├── models.py
│       │   └── weather.csv
│       │
│       ├── weatherProject/
│       │   ├── settings.py
│       │   ├── urls.py
│       │   ├── asgi.py
│       │   └── wsgi.py
│       │
│       ├── manage.py
│       └── db.sqlite3
│    
├── weather.csv
├── rain.jpeg
└── README.md

```
# Installation
  1. Clone the repository
  2. git clone https://github.com/lavanya074/Weather_Forecasting.git
  3. Navigate to the project directory
  4. cd "Weather_Forecasting/ML Model/weatherProject"
  5. Create a virtual environment
  6. python -m venv venv
  7. Activate the virtual environment

This project uses the OpenWeatherMap API to fetch real-time weather data.

To use the API:

Create an account at OpenWeatherMap.
Generate an API key.
Add your API key in the project.

Example:

API_KEY = "YOUR_API_KEY"

For better security, store the API key in an environment variable instead of writing it directly in the code.

<img width="1280" height="745" alt="WhatsApp Image 2026-06-01 at 3 35 16 PM" src="https://github.com/user-attachments/assets/773ec9ef-f81c-4597-bcfa-369266d7d4ea" />


Author
Lavanya

**License**
This project is open-source and available for learning and development purposes.
