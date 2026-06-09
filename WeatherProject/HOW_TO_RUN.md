# How to Run — WeatherML (Django + React)

## Step 1 — Install Python dependencies
```bash
cd "ML Model/weatherProject"
pip install django djangorestframework django-cors-headers requests pandas numpy scikit-learn pytz
```

## Step 2 — Run Django backend
```bash
cd "ML Model/weatherProject"
python manage.py runserver
```
Test it: open http://localhost:8000/api/weather/?city=Delhi
You should see JSON with weather + ML predictions.

## Step 3 — Run React frontend (separate terminal)
```bash
cd weather-react
npm install
npm run dev
```
Open http://localhost:5173

## What was changed in your Django files

### forecast/views.py
- Added `JsonResponse` and `csrf_exempt` imports
- Fixed hardcoded CSV path (was C:\Users\LAVANYA\...)
- Added new `weather_api()` function at the bottom (existing code unchanged)

### forecast/urls.py  
- Fixed bug: urlpatterns was a set {} (should be list [])
- Added route: `path('api/weather/', views.weather_api)`

### weatherProject/settings.py
- Added 'corsheaders' to INSTALLED_APPS
- Added CorsMiddleware as first middleware
- Added CORS_ALLOW_ALL_ORIGINS = True

## Project Structure
```
WeatherProject/
├── ML Model/weatherProject/        ← your existing Django project (modified)
│   ├── forecast/
│   │   ├── views.py               ← MODIFIED: added weather_api()
│   │   ├── urls.py                ← MODIFIED: fixed bug + new route
│   │   └── ...
│   └── weatherProject/
│       └── settings.py            ← MODIFIED: cors added
└── weather-react/                  ← NEW: React frontend
    ├── src/
    │   ├── api/weather.js
    │   ├── hooks/useWeather.js
    │   ├── components/
    │   │   ├── SearchBar.jsx
    │   │   ├── CurrentWeather.jsx
    │   │   ├── RainPrediction.jsx
    │   │   ├── ForecastChart.jsx
    │   │   ├── Loader.jsx
    │   │   └── ErrorMessage.jsx
    │   └── pages/Home.jsx
    ├── package.json
    └── vite.config.js              ← proxies /api → localhost:8000
```
