import SearchBar from '../components/SearchBar'
import CurrentWeather from '../components/CurrentWeather'
import RainPrediction from '../components/RainPrediction'
import ForecastChart from '../components/ForecastChart'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import { useWeather } from '../hooks/useWeather'

const Home = () => {
  const { data, loading, error, search } = useWeather()

  return (
    <div style={styles.page}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.logo}>
            <span style={{ fontSize: '22px' }}>⛅</span>
            <span style={styles.logoText}>WeatherML</span>
          </div>
          <p style={styles.tagline}>Django + React · Powered by your RandomForest model</p>
        </header>

        <div style={{ marginBottom: '32px' }}>
          <SearchBar onSearch={search} loading={loading} />
        </div>

        {error && <ErrorMessage message={error} />}
        {loading && <Loader />}

        {!loading && data && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <CurrentWeather data={data} />
            <RainPrediction rainPrediction={data.rain_prediction} />
            {data.temp_forecast?.length > 0 && (
              <ForecastChart
                tempForecast={data.temp_forecast}
                humidityForecast={data.humidity_forecast}
              />
            )}
          </div>
        )}

        {!loading && !data && !error && (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.2 }}>⛅</div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'rgba(255,255,255,0.3)', fontWeight: '600' }}>
              Search any city to get started
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.15)', marginTop: '8px' }}>
              Real-time data + ML-powered predictions
            </p>
          </div>
        )}

        <footer style={styles.footer}>
          Built by Lavanya · IGDTUW · Django + React + OpenWeatherMap + RandomForest
        </footer>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', position: 'relative', overflow: 'hidden', padding: '0 16px' },
  blob1: { position: 'fixed', top: '-200px', left: '-200px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,195,247,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 },
  blob2: { position: 'fixed', bottom: '-200px', right: '-200px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,179,71,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 },
  container: { maxWidth: '720px', margin: '0 auto', paddingTop: '48px', paddingBottom: '48px', position: 'relative', zIndex: 1 },
  header: { textAlign: 'center', marginBottom: '40px' },
  logo: { display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '8px' },
  logoText: { fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800', letterSpacing: '-0.03em' },
  tagline: { color: 'var(--text-secondary)', fontSize: '13px' },
  footer: { textAlign: 'center', marginTop: '48px', fontSize: '12px', color: 'rgba(255,255,255,0.15)' },
}

export default Home
