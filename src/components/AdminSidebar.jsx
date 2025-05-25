import './AdminSidebar.css';

export default function AdminSidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">ADMIN PANEL</div>
      <nav className="sidebar-nav">
        <a href="#"> Dashboard</a>
        <a href="#"> Projects</a>
        <a href="#"> Tasks</a>
        <a href="#"> Team</a>
      </nav>
      <div className="sidebar-footer">
        <button className="logout-button">Logout</button>
      </div>
    </div>
  );
}
