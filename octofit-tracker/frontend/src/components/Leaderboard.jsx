import ResourcePage from './ResourcePage.jsx'

export default function Leaderboard() {
  return (
    <ResourcePage
      columns={[
        { key: 'rank', label: 'Rank' },
        { key: 'member', label: 'Member' },
        { key: 'activities', label: 'Activities' },
        { key: 'points', label: 'Points' },
      ]}
      description="Small wins become a shared scoreboard."
      eyebrow="THE RACE"
      renderRow={(entry, index, display) => (
        <tr key={entry._id ?? entry.userId ?? index}>
          <td><span className={`rank rank-${entry.rank ?? index + 1}`}>{display(entry.rank ?? index + 1)}</span></td>
          <td><strong>{display(entry.name ?? entry.username ?? entry.user?.name)}</strong></td>
          <td>{display(entry.activities)}</td>
          <td><strong className="accent-number">{display(entry.points)}</strong></td>
        </tr>
      )}
      resource="leaderboard"
      title="Leaderboard"
    />
  )
}