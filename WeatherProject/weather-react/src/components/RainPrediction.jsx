const RainPrediction = ({ rainPrediction }) => {
  const willRain = rainPrediction === true || rainPrediction === 1

  return (
    <div style={{ ...styles.card, borderColor: willRain ? 'rgba(126,200,227,0.35)' : 'rgba(255,209,102,0.35)' }} className="fade-up">
      <div style={styles.iconCircle}>
        <span style={{ fontSize: '32px' }}>{willRain ? '🌧️' : '☀️'}</span>
      </div>
      <div style={{ flex: 1 }}>
        <p style={styles.label}>ML Rain Prediction (RandomForest)</p>
        <p style={{ ...styles.result, color: willRain ? 'var(--accent-rain)' : 'var(--accent-sun)' }}>
          {willRain ? 'Rain Expected Tomorrow' : 'No Rain Tomorrow'}
        </p>
        <p style={styles.sub}>
          {willRain
            ? 'Your model predicts rainfall. Carry an umbrella!'
            : 'Your model predicts clear skies. Enjoy the day!'}
        </p>
      </div>
      <div style={{ ...styles.badge, background: willRain ? 'rgba(126,200,227,0.12)' : 'rgba(255,209,102,0.12)', color: willRain ? 'var(--accent-rain)' : 'var(--accent-sun)' }}>
        {willRain ? 'Rain' : 'Clear'}
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: 'var(--bg-card)', border: '1px solid',
    borderRadius: 'var(--radius)', padding: '28px',
    backdropFilter: 'blur(20px)', display: 'flex',
    alignItems: 'flex-start', gap: '20px', position: 'relative',
  },
  iconCircle: {
    width: '60px', height: '60px', borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  label: { fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' },
  result: { fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '6px' },
  sub: { fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 },
  badge: {
    position: 'absolute', top: '20px', right: '20px',
    padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
  },
}

export default RainPrediction
