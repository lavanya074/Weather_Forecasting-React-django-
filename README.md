# Weather Forecasting using React, Django and Machine Learning

A full-stack weather forecasting web application built with **React**, **Django**, and **Machine Learning**.  
The application fetches real-time weather data using the **OpenWeatherMap API** and predicts rain, temperature, and humidity trends using Random Forest models.

## Features

- Search weather details by city name
- Display real-time weather information
- Show temperature, humidity, pressure, wind speed, visibility, clouds, and weather description
- Predict whether it may rain or not
- Forecast upcoming temperature values
- Forecast upcoming humidity values
- React frontend with reusable components
- Django backend with REST API support
- Machine Learning-based weather prediction using historical weather data

## Tech Stack

### Frontend
- React
- Vite
- Axios
- Recharts
- JavaScript
- CSS

### Backend
- Python
- Django
- Django REST Framework
- Django CORS Headers
- Requests

### Machine Learning
- Pandas
- NumPy
- Scikit-learn
- RandomForestClassifier
- RandomForestRegressor

### API
- OpenWeatherMap API

## Project Structure

```text
WeatherProject/
│
├── ML Model/
│   └── weatherProject/
│       ├── forecast/
│       │   ├── Templates/
│       │   ├── static/
│       │   ├── views.py
│       │   ├── urls.py
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
├── weather-react/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── HOW_TO_RUN.md
├── weather.csv
├── rain.jpeg
└── README.md


```

Author

Lavanya

License

This project is open-source and available for learning and development purposes.
