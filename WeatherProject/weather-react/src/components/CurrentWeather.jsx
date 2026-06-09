const STATS = [
  { key: 'humidity', label: 'Humidity', unit: '%', icon: '💧' },
  { key: 'pressure', label: 'Pressure', unit: ' hPa', icon: '🔵' },
  { key: 'wind_speed', label: 'Wind', unit: ' m/s', icon: '💨' },
  { key: 'visibility', label: 'Visibility', unit: ' km', format: v => (v / 1000).toFixed(1), icon: '👁' },
  { key: 'clouds', label: 'Clouds', unit: '%', icon: '☁️' },
  { key: 'feels_like', label: 'Feels Like', unit: '°C', icon: '🌡' },
]

const CurrentWeather = ({ data }) => (
  <div style={styles.card} className="fade-up">
    <div style={styles.header}>
      <div>
        <h2 style={styles.city}>{data.city}, {data.country}</h2>
        <p style={styles.desc}>{data.description}</p>
        <p style={styles.minmax}>↓ {data.temp_min}°C &nbsp; ↑ {data.temp_max}°C</p>
      </div>
      <div style={styles.tempBlock}>
        <span style={styles.temp}>{Math.round(data.temperature)}</span>
        <span style={styles.unit}>°C</span>
      </div>
    </div>

    <div style={styles.grid}>
      {STATS.map(s => (
        <div key={s.key} style={styles.statCard}>
          <span style={styles.statIcon}>{s.icon}</span>
          <span style={styles.statVal}>
            {s.format ? s.format(data[s.key]) : data[s.key]}{s.unit}
          </span>
          <span style={styles.statLabel}>{s.label}</span>
        </div>
      ))}
    </div>
  </div>
)

const styles = {
  card: {
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', padding: '32px',
    backdropFilter: 'blur(20px)', boxShadow: 'var(--shadow)',
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' },
  city: { fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: '700', letterSpacing: '-0.02em' },
  desc: { color: 'var(--text-secondary)', fontSize: '14px', textTransform: 'capitalize', marginTop: '4px' },
  minmax: { color: 'var(--text-secondary)', fontSize: '13px', marginTop: '6px' },
  tempBlock: { display: 'flex', alignItems: 'flex-start', gap: '2px' },
  temp: { fontFamily: 'var(--font-display)', fontSize: '72px', fontWeight: '800', lineHeight: 1, letterSpacing: '-0.04em' },
  unit: { fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: '600', color: 'var(--text-secondary)', marginTop: '8px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '12px' },
  statCard: {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 'var(--radius-sm)', padding: '14px 12px',
    display: 'flex', flexDirection: 'column', gap: '5px',
  },
  statIcon: { fontSize: '18px' },
  statVal: { fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: '600' },
  statLabel: { fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' },
}

export default CurrentWeather
