const ErrorMessage = ({ message }) => (
  <div style={styles.card} className="fade-in">
    <span style={{ fontSize: '20px' }}>⚠️</span>
    <div>
      <p style={styles.title}>Error</p>
      <p style={styles.msg}>{message}</p>
    </div>
  </div>
)

const styles = {
  card: {
    background: 'rgba(239,71,111,0.08)', border: '1px solid rgba(239,71,111,0.25)',
    borderRadius: 'var(--radius)', padding: '20px 24px',
    display: 'flex', alignItems: 'center', gap: '16px',
  },
  title: { fontFamily: 'var(--font-display)', fontWeight: '700', color: 'var(--red)', marginBottom: '4px', fontSize: '15px' },
  msg: { color: 'var(--text-secondary)', fontSize: '14px' },
}

export default ErrorMessage
