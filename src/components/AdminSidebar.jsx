import './AdminSidebar.css';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-header">ADMIN PANEL</div>
      <nav className="sidebar-nav">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Dashboard
        </Link>
        <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>
          Projects
        </Link>
        <Link to="/tasks" className={location.pathname === '/tasks' ? 'active' : ''}>
          Tasks
        </Link>
        <Link to="/team" className={location.pathname === '/team' ? 'active' : ''}>
          Team
        </Link>
      </nav>
      <div className="sidebar-footer">
        <button className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default AdminSidebar;
