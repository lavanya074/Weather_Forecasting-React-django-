import { useState } from 'react'

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) onSearch(city)
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.wrapper}>
        <span style={styles.icon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Search city... (e.g. Delhi, Mumbai, London)"
          style={styles.input}
          disabled={loading}
          autoFocus
        />
        <button
          type="submit"
          disabled={loading || !city.trim()}
          style={{ ...styles.btn, opacity: loading || !city.trim() ? 0.5 : 1, cursor: loading || !city.trim() ? 'not-allowed' : 'pointer' }}
        >
          {loading
            ? <span style={styles.spinner} />
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          }
        </button>
      </div>
    </form>
  )
}

const styles = {
  form: { width: '100%', maxWidth: '540px', margin: '0 auto' },
  wrapper: {
    display: 'flex', alignItems: 'center',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '50px', padding: '6px 6px 6px 20px', gap: '12px',
    backdropFilter: 'blur(12px)',
  },
  icon: { color: 'var(--text-secondary)', display: 'flex', flexShrink: 0 },
  input: {
    flex: 1, background: 'none', border: 'none', outline: 'none',
    color: 'var(--text-primary)', fontFamily: 'var(--font-body)',
    fontSize: '15px',
  },
  btn: {
    width: '42px', height: '42px', borderRadius: '50%',
    background: 'var(--accent)', border: 'none',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#0a0e1a', flexShrink: 0, transition: 'transform 0.15s',
  },
  spinner: {
    width: '16px', height: '16px',
    border: '2px solid rgba(10,14,26,0.3)', borderTopColor: '#0a0e1a',
    borderRadius: '50%', display: 'block', animation: 'spin 0.7s linear infinite',
  },
}

export default SearchBar
