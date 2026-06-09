import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'rgba(10,14,26,0.95)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px' }}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '6px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
      {payload.map((e, i) => (
        <p key={i} style={{ color: e.color, fontWeight: '600', fontFamily: 'var(--font-display)' }}>
          {e.name}: {e.value}{e.name === 'Temp' ? '°C' : '%'}
        </p>
      ))}
    </div>
  )
}

const ForecastChart = ({ tempForecast, humidityForecast }) => {
  const data = tempForecast.map((temp, i) => ({
    day: `+${i + 1}h`,
    Temp: Math.round(temp * 10) / 10,
    Humidity: Math.round((humidityForecast?.[i] ?? 0) * 10) / 10,
  }))

  return (
    <div style={styles.card} className="fade-up">
      <h3 style={styles.title}>Forecast — Next 5 Hours</h3>
      <p style={styles.sub}>Temperature & humidity predicted by your RandomForest model</p>
      <div style={{ marginTop: '24px' }}>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffb347" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ffb347" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4fc3f7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4fc3f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="day" tick={{ fill: '#8b95b0', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} tickLine={false} />
            <YAxis tick={{ fill: '#8b95b0', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px', color: '#8b95b0', paddingTop: '16px' }} />
            <Area type="monotone" dataKey="Temp" stroke="#ffb347" strokeWidth={2} fill="url(#tempGrad)" dot={{ fill: '#ffb347', r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
            <Area type="monotone" dataKey="Humidity" stroke="#4fc3f7" strokeWidth={2} fill="url(#humGrad)" dot={{ fill: '#4fc3f7', r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', padding: '28px', backdropFilter: 'blur(20px)',
  },
  title: { fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '700', letterSpacing: '-0.02em' },
  sub: { fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' },
}

export default ForecastChart
