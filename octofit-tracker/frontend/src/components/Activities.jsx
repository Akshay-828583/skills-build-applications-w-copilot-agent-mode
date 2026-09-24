import ResourcePage from './ResourcePage.jsx'

export default function Activities() {
  return (
    <ResourcePage
      columns={[
        { key: 'type', label: 'Activity' },
        { key: 'duration', label: 'Duration' },
        { key: 'distance', label: 'Distance' },
        { key: 'points', label: 'Points' },
        { key: 'date', label: 'Completed' },
      ]}
      description="A live record of the movement your crew is putting in."
      eyebrow="TRAINING LOG"
      renderRow={(activity, index, display) => (
        <tr key={activity._id ?? `${activity.type}-${index}`}>
          <td><span className="activity-dot" />{display(activity.type)}</td>
          <td>{display(activity.durationMinutes)} min</td>
          <td>{activity.distanceKm ? `${activity.distanceKm} km` : '—'}</td>
          <td><strong className="accent-number">+{display(activity.points)}</strong></td>
          <td>{activity.performedAt ? new Date(activity.performedAt).toLocaleDateString() : '—'}</td>
        </tr>
      )}
      resource="activities"
      title="Activity feed"
    />
  )
}