import ResourcePage from './ResourcePage.jsx'

export default function Users() {
  return (
    <ResourcePage
      columns={[
        { key: 'name', label: 'Member' },
        { key: 'username', label: 'Handle' },
        { key: 'team', label: 'Team' },
        { key: 'points', label: 'Points' },
      ]}
      description="The people powering this week’s momentum."
      eyebrow="MEMBERS"
      renderRow={(user, index, display) => (
        <tr key={user._id ?? `${user.username}-${index}`}>
          <td><span className="avatar">{user.name?.slice(0, 1) ?? '?'}</span><strong>{display(user.name)}</strong></td>
          <td className="muted">@{display(user.username)}</td>
          <td>{display(user.teamId?.name ?? user.team?.name)}</td>
          <td><strong className="accent-number">{display(user.points)}</strong></td>
        </tr>
      )}
      resource="users"
      title="Members"
    />
  )
}