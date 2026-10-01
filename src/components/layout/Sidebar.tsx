import { NavLink } from 'react-router-dom';

const navigationItems = [
  { label: 'Overview', path: '/' },
  { label: 'Displays', path: '/screens' },
  { label: 'Playlists', path: '/playlists' },
  { label: 'Content', path: '/content' },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink className="sidebar__brand" to="/">
        <span className="sidebar__brand-mark">S</span>
        <span>SignalBoard</span>
      </NavLink>

      <nav aria-label="Primary navigation" className="sidebar__nav">
        {navigationItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              `sidebar__nav-link${isActive ? ' sidebar__nav-link--active' : ''}`
            }
            end={item.path === '/'}
            key={item.path}
            to={item.path}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <p className="sidebar__footer-label">NETWORK</p>
        <p className="sidebar__footer-status">
          <span />
          10 of 12 screens online
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;