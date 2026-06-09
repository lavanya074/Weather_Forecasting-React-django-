from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import mean_squared_error
from datetime import datetime, timedelta
import pytz
import os
from django.conf import settings

csv_path = os.path.join(settings.BASE_DIR, 'weather.csv')


API_KEY = '415ba43b4637399eac790b9d19432b8b'
BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'


def get_current_weather(city):
    url = f"{BASE_URL}?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()

    if response.status_code != 200 or 'main' not in data:
        return None

    return {
    'city': data['name'],
    'current_temp': round(data['main']['temp']),
    'feels_like': round(data['main']['feels_like']),
    'temp_min': round(data['main']['temp_min']),
    'temp_max': round(data['main']['temp_max']),
    'humidity': round(data['main']['humidity']),
    'description': data['weather'][0]['description'],
    'country': data['sys']['country'],
    'wind_gust_dir': data['wind']['deg'],
    'pressure': data['main']['pressure'],
    'wind_gust_speed': data['wind']['speed'],
    'clouds': data['clouds']['all'],
    'Visibility': data['visibility']
}



def read_historical_data(filename):
    df = pd.read_csv(filename)
    df = df.dropna().drop_duplicates()
    return df


def prepare_data(data):
    le = LabelEncoder()
    data = data.copy()
    data['WindGustDir'] = le.fit_transform(data['WindGustDir'])
    data['RainTomorrow'] = le.fit_transform(data['RainTomorrow'])

    X = data[['MinTemp', 'MaxTemp', 'WindGustDir', 'WindGustSpeed', 'Humidity', 'Pressure', 'Temp']]
    y = data['RainTomorrow']

    return X, y, le


def train_rain_model(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    return model


def prepare_regression_data(data, feature):
    x, y = [], []
    for i in range(len(data) - 1):
        x.append(data[feature].iloc[i])
        y.append(data[feature].iloc[i + 1])
    return np.array(x).reshape(-1, 1), np.array(y)


def train_regression_model(x, y):
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(x, y)
    return model


def predict_future(model, current_value):
    predictions = [current_value]
    for _ in range(5):
        next_value = model.predict(np.array([[predictions[-1]]]))
        predictions.append(next_value[0])
    return predictions[1:]


# ✅ Final Weather View Function
def weather_view(request):
    if request.method == 'POST':
        city = request.POST.get('city')
        current_weather = get_current_weather(city)

        if current_weather is None:
            return render(request, 'weather.html', {'error': 'Could not fetch weather data. Please try again.'})

        csv_path = os.path.join(settings.BASE_DIR, 'forecast', 'weather.csv')
        historical_data = read_historical_data(csv_path)

        X, y, le = prepare_data(historical_data)
        rain_model = train_rain_model(X, y)

        wind_deg = current_weather['wind_gust_dir'] % 360
        compass_points = [
            ("N", 348.75, 360), ("N", 0, 11.25), ("NNE", 11.25, 33.75), ("NE", 33.75, 56.25),
            ("ENE", 56.25, 78.75), ("E", 78.75, 101.25), ("ESE", 101.25, 123.75),
            ("SE", 123.75, 146.25), ("SSE", 146.25, 168.75), ("S", 168.75, 191.25),
            ("SSW", 191.25, 213.75), ("SW", 213.75, 236.25), ("WSW", 236.25, 258.75),
            ("W", 258.75, 281.25), ("WNW", 281.25, 303.75), ("NW", 303.75, 326.25),
            ("NNW", 326.25, 348.75)
        ]

        compass_direction = next(point for point, start, end in compass_points if start <= wind_deg < end)
        compass_direction_encoded = le.transform([compass_direction])[0] if compass_direction in le.classes_ else -1

        current_df = pd.DataFrame([{
    'MinTemp': current_weather['temp_min'],
    'MaxTemp': current_weather['temp_max'],
    'WindGustDir': compass_direction_encoded,
    'WindGustSpeed': current_weather['wind_gust_speed'],
    'Humidity': current_weather['humidity'],
    'Pressure': current_weather['pressure'],
    'Temp': current_weather['current_temp'],
}])


        rain_prediction = rain_model.predict(current_df)[0]

        X_temp, y_temp = prepare_regression_data(historical_data, 'Temp')
        X_hum, y_hum = prepare_regression_data(historical_data, 'Humidity')
        temp_model = train_regression_model(X_temp, y_temp)
        hum_model = train_regression_model(X_hum, y_hum)

        future_temp = predict_future(temp_model, current_weather['temp_min'])
        future_humidity = predict_future(hum_model, current_weather['humidity'])

        timezone = pytz.timezone('Asia/Karachi')
        now = datetime.now(timezone)
        next_hour = now + timedelta(hours=1)
        next_hour = next_hour.replace(minute=0, second=0, microsecond=0)
        future_times = [(next_hour + timedelta(hours=i)).strftime("%H:%M") for i in range(5)]

        time1, time2, time3, time4, time5 = future_times
        temp1, temp2, temp3, temp4, temp5 = future_temp
        hum1, hum2, hum3, hum4, hum5 = future_humidity

        context = {
            'location': city,
            'current_temp': current_weather['current_temp'],
            'MinTemp': current_weather['temp_min'],
            'MaxTemp': current_weather['temp_max'],
            'feels_like': current_weather['feels_like'],
            'humidity': current_weather['humidity'],
            'description': current_weather['description'],
            'city': current_weather['city'],
            'country': current_weather['country'],
            'time': datetime.now(),
            'date': datetime.now().strftime("%B %d, %Y"),
            'wind': current_weather['wind_gust_speed'],
            'pressure': current_weather['pressure'],
            'visibility': current_weather['Visibility'],

            'clouds': current_weather['clouds'],


            'rain_prediction': 'Yes' if rain_prediction == 1 else 'No',
            'time1': time1, 'time2': time2, 'time3': time3, 'time4': time4, 'time5': time5,
            'temp1': f"{round(temp1, 1)}", 'temp2': f"{round(temp2, 1)}", 'temp3': f"{round(temp3, 1)}",
            'temp4': f"{round(temp4, 1)}", 'temp5': f"{round(temp5, 1)}",
            'hum1': f"{round(hum1, 1)}", 'hum2': f"{round(hum2, 1)}", 'hum3': f"{round(hum3, 1)}",
            'hum4': f"{round(hum4, 1)}", 'hum5': f"{round(hum5, 1)}",
        }

        return render(request, 'weather.html', context)

    return render(request, 'weather.html')


# =====================================================
# NEW: JSON API endpoint for React frontend
# GET /api/weather/?city=Delhi
# =====================================================
@csrf_exempt
def weather_api(request):
    city = request.GET.get('city', 'Delhi')
    current_weather = get_current_weather(city)

    if current_weather is None:
        return JsonResponse({'error': 'City not found. Please check the spelling.'}, status=404)

    try:
        csv_path = os.path.join(settings.BASE_DIR, 'forecast', 'weather.csv')
        historical_data = read_historical_data(csv_path)

        X, y, le = prepare_data(historical_data)
        rain_model = train_rain_model(X, y)

        wind_deg = current_weather['wind_gust_dir'] % 360
        compass_points = [
            ("N", 348.75, 360), ("N", 0, 11.25), ("NNE", 11.25, 33.75),
            ("NE", 33.75, 56.25), ("ENE", 56.25, 78.75), ("E", 78.75, 101.25),
            ("ESE", 101.25, 123.75), ("SE", 123.75, 146.25), ("SSE", 146.25, 168.75),
            ("S", 168.75, 191.25), ("SSW", 191.25, 213.75), ("SW", 213.75, 236.25),
            ("WSW", 236.25, 258.75), ("W", 258.75, 281.25), ("WNW", 281.25, 303.75),
            ("NW", 303.75, 326.25), ("NNW", 326.25, 348.75)
        ]
        compass_direction = next(p for p, s, e in compass_points if s <= wind_deg < e)
        encoded = le.transform([compass_direction])[0] if compass_direction in le.classes_ else -1

        current_df = pd.DataFrame([{
            'MinTemp': current_weather['temp_min'],
            'MaxTemp': current_weather['temp_max'],
            'WindGustDir': encoded,
            'WindGustSpeed': current_weather['wind_gust_speed'],
            'Humidity': current_weather['humidity'],
            'Pressure': current_weather['pressure'],
            'Temp': current_weather['current_temp'],
        }])

        rain_prediction = bool(rain_model.predict(current_df)[0] == 1)

        X_temp, y_temp = prepare_regression_data(historical_data, 'Temp')
        X_hum, y_hum = prepare_regression_data(historical_data, 'Humidity')
        temp_model = train_regression_model(X_temp, y_temp)
        hum_model = train_regression_model(X_hum, y_hum)

        future_temp = predict_future(temp_model, current_weather['temp_min'])
        future_humidity = predict_future(hum_model, current_weather['humidity'])

        return JsonResponse({
            'city': current_weather['city'],
            'temperature': current_weather['current_temp'],
            'feels_like': current_weather['feels_like'],
            'temp_min': current_weather['temp_min'],
            'temp_max': current_weather['temp_max'],
            'humidity': current_weather['humidity'],
            'pressure': current_weather['pressure'],
            'wind_speed': current_weather['wind_gust_speed'],
            'visibility': current_weather['Visibility'],
            'clouds': current_weather['clouds'],
            'description': current_weather['description'],
            'country': current_weather['country'],
            'rain_prediction': rain_prediction,
            'temp_forecast': [round(t, 1) for t in future_temp],
            'humidity_forecast': [round(h, 1) for h in future_humidity],
        })

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


