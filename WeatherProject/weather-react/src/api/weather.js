import axios from 'axios'

// Proxied to http://localhost:8000 via vite.config.js
const BASE_URL = '/api'

export const fetchWeather = async (city) => {
  const response = await axios.get(`${BASE_URL}/weather/`, {
    params: { city },
    timeout: 15000,
  })
  return response.data
}
