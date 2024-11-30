from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

API_KEY = 'bcf025ec10f9b9d3a672df14f0898f4f'  # OpenWeatherMap API açarını buraya əlavə edin
BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

# Ana səhifəni təqdim edən route
@app.route('/')
def index():
    return render_template('index.html')

# Hava məlumatlarını almaq üçün route
@app.route('/get_weather')
def get_weather():
    city = request.args.get('city')  # City parametresi alırıq
    if not city:
        return jsonify({'success': False, 'message': 'City is required'})

    # OpenWeatherMap API-sinə sorğu göndəririk
    response = requests.get(f'{BASE_URL}?q={city}&appid={API_KEY}&units=metric')
    data = response.json()

    # Əgər şəhər tapıldısa
    if data['cod'] == 200:
        weather_data = {
            'success': True,
            'city': data['name'],
            'description': data['weather'][0]['description'],
            'temperature': data['main']['temp'],
            'humidity': data['main']['humidity']
        }
    else:
        weather_data = {
            'success': False,
            'message': 'City not found'
        }

    return jsonify(weather_data)

if __name__ == '__main__':
    app.run(debug=True)
