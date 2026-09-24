import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/', label: 'Overview', icon: '◎' },
  { to: '/activities', label: 'Activities', icon: '↗' },
  { to: '/leaderboard', label: 'Leaderboard', icon: '✦' },
  { to: '/teams', label: 'Teams', icon: '◌' },
  { to: '/users', label: 'Members', icon: '◉' },
  { to: '/workouts', label: 'Workouts', icon: '▦' },
]

function Overview() {
  return (
    <div className="overview-grid">
      <section className="welcome-panel">
        <p className="eyebrow">OCTOFIT / WEEKLY PULSE</p>
        <h1>Move with your people.</h1>
        <p className="lede">
          Track the work, celebrate the streaks, and keep your team moving in
          the same direction.
        </p>
        <NavLink className="primary-action" to="/activities">
          Log an activity <span aria-hidden="true">↗</span>
        </NavLink>
      </section>
      <section className="stat-stack" aria-label="Quick links">
        <NavLink className="stat-card stat-card-coral" to="/leaderboard">
          <span className="stat-label">COMPETE</span>
          <strong>See the leaderboard</strong>
          <span className="stat-arrow">↗</span>
        </NavLink>
        <NavLink className="stat-card stat-card-ink" to="/workouts">
          <span className="stat-label">RESET</span>
          <strong>Find your next workout</strong>
          <span className="stat-arrow">↗</span>
        </NavLink>
      </section>
    </div>
  )
}

function App() {
  const location = useLocation()
  const currentPage = navigation.find((item) => item.to === location.pathname)

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/">
          <span className="brand-mark">O</span>
          <span>octofit</span>
        </NavLink>
        <p className="sidebar-kicker">YOUR TRAINING ROOM</p>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              end={item.to === '/'}
              key={item.to}
              to={item.to}
            >
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="pulse-dot" aria-hidden="true" />
          <span>API connected</span>
        </div>
      </aside>
      <main className="content-area">
        <header className="topbar">
          <div>
            <p className="date-line">THURSDAY, SEPTEMBER 24, 2026</p>
            <p className="breadcrumb">Workspace / {currentPage?.label ?? 'Overview'}</p>
          </div>
          <div className="profile-chip"><span>AM</span> Ava Martinez</div>
        </header>
        <div className="page-content">
          <Routes>
            <Route element={<Overview />} path="/" />
            <Route element={<Activities />} path="/activities" />
            <Route element={<Leaderboard />} path="/leaderboard" />
            <Route element={<Teams />} path="/teams" />
            <Route element={<Users />} path="/users" />
            <Route element={<Workouts />} path="/workouts" />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
