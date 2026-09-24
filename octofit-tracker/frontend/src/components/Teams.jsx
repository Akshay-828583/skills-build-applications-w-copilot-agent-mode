import ResourcePage from './ResourcePage.jsx'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

export default function Teams() {
  return (
    <ResourcePage
      columns={[
        { key: 'name', label: 'Team' },
        { key: 'description', label: 'Mission' },
        { key: 'members', label: 'Members' },
      ]}
      description="Find the people who make showing up easier."
      eyebrow="YOUR CREW"
      renderRow={(team, index, display) => (
        <tr key={team._id ?? `${team.name}-${index}`}>
          <td><strong>{display(team.name)}</strong></td>
          <td>{display(team.description)}</td>
          <td><span className="member-count">{team.members?.length ?? 0}</span></td>
        </tr>
      )}
      endpoint={teamsEndpoint}
      resource="teams"
      title="Teams"
    />
  )
}