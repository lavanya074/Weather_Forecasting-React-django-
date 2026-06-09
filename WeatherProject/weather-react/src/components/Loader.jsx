const Skel = ({ w = '100%', h = '20px', r = '8px', mt = '0' }) => (
  <div style={{
    width: w, height: h, borderRadius: r, marginTop: mt,
    background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
    backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite',
  }} />
)

const Loader = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    {/* Weather card skeleton */}
    <div style={styles.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div><Skel w="160px" h="28px" r="8px" /><Skel w="110px" h="13px" r="6px" mt="10px" /></div>
        <Skel w="90px" h="72px" r="12px" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px,1fr))', gap: '12px' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '14px 12px' }}>
            <Skel w="24px" h="24px" r="6px" />
            <Skel w="60px" h="16px" r="6px" mt="8px" />
            <Skel w="50px" h="11px" r="4px" mt="6px" />
          </div>
        ))}
      </div>
    </div>
    {/* Rain card skeleton */}
    <div style={styles.card}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Skel w="60px" h="60px" r="50%" />
        <div style={{ flex: 1 }}><Skel w="120px" h="12px" r="4px" /><Skel w="200px" h="22px" r="6px" mt="8px" /><Skel w="240px" h="13px" r="4px" mt="8px" /></div>
      </div>
    </div>
    {/* Chart skeleton */}
    <div style={styles.card}>
      <Skel w="180px" h="20px" r="6px" /><Skel w="280px" h="13px" r="4px" mt="8px" /><Skel w="100%" h="240px" r="12px" mt="24px" />
    </div>
  </div>
)

const styles = {
  card: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '28px' },
}

export default Loader
