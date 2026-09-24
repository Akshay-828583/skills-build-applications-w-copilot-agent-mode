import ResourcePage from './ResourcePage.jsx'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

export default function Workouts() {
  return (
    <ResourcePage
      columns={[
        { key: 'title', label: 'Workout' },
        { key: 'type', label: 'Type' },
        { key: 'difficulty', label: 'Level' },
        { key: 'duration', label: 'Duration' },
      ]}
      description="A short list of focused sessions for your next block."
      eyebrow="THE LIBRARY"
      renderRow={(workout, index, display) => (
        <tr key={workout._id ?? `${workout.title}-${index}`}>
          <td><strong>{display(workout.title)}</strong><small>{display(workout.description)}</small></td>
          <td>{display(workout.activityType)}</td>
          <td><span className={`difficulty difficulty-${workout.difficulty}`}>{display(workout.difficulty)}</span></td>
          <td>{display(workout.durationMinutes)} min</td>
        </tr>
      )}
      endpoint={workoutsEndpoint}
      resource="workouts"
      title="Workouts"
    />
  )
}