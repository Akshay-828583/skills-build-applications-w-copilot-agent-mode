import ResourcePage from './ResourcePage.jsx'

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
      endpoint="/api/teams/"
      resource="teams"
      title="Teams"
    />
  )
}