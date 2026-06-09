import { useState, useCallback } from 'react'
import { fetchWeather } from '../api/weather'

export const useWeather = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = useCallback(async (city) => {
    if (!city.trim()) return
    setLoading(true)
    setError(null)
    try {
      const result = await fetchWeather(city.trim())
      setData(result)
    } catch (err) {
      if (err.response?.status === 404) {
        setError('City not found. Please check the spelling.')
      } else if (err.code === 'ECONNABORTED') {
        setError('Request timed out. Make sure Django is running on port 8000.')
      } else {
        setError(err.response?.data?.error || 'Something went wrong. Please try again.')
      }
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, search }
}
