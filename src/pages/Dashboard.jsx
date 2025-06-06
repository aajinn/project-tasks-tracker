import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Fake data for dashboard
  const stats = {
    totalProjects: 12,
    activeProjects: 8,
    completedProjects: 4,
    teamMembers: 15
  };

  const recentProjects = [
    {
      id: 1,
      name: 'Website Redesign',
      status: 'In Progress',
      progress: 75,
      team: ['John D.', 'Sarah M.'],
      dueDate: '2024-03-15'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      status: 'Active',
      progress: 45,
      team: ['Mike R.', 'Lisa P.'],
      dueDate: '2024-04-01'
    },
    {
      id: 3,
      name: 'Database Migration',
      status: 'Completed',
      progress: 100,
      team: ['Alex K.', 'Tom B.'],
      dueDate: '2024-02-28'
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Finalize Design Mockups',
      project: 'Website Redesign',
      dueDate: '2024-03-10',
      priority: 'High'
    },
    {
      id: 2,
      title: 'API Integration',
      project: 'Mobile App Development',
      dueDate: '2024-03-20',
      priority: 'Medium'
    },
    {
      id: 3,
      title: 'User Testing',
      project: 'Website Redesign',
      dueDate: '2024-03-25',
      priority: 'Low'
    }
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total-projects">📊</div>
          <div className="stat-content">
            <h3>Total Projects</h3>
            <p className="stat-number">{stats.totalProjects}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active-projects">🚀</div>
          <div className="stat-content">
            <h3>Active Projects</h3>
            <p className="stat-number">{stats.activeProjects}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed-projects">✅</div>
          <div className="stat-content">
            <h3>Completed</h3>
            <p className="stat-number">{stats.completedProjects}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon team-members">👥</div>
          <div className="stat-content">
            <h3>Team Members</h3>
            <p className="stat-number">{stats.teamMembers}</p>
          </div>
        </div>
      </div>

      {/* Recent Projects and Upcoming Tasks */}
      <div className="dashboard-grid">
        {/* Recent Projects */}
        <div className="dashboard-card">
          <h2>Recent Projects</h2>
          <div className="project-list">
            {recentProjects.map(project => (
              <div key={project.id} className="project-item">
                <div className="project-header">
                  <h3>{project.name}</h3>
                  <span className={`status-badge ${project.status.toLowerCase()}`}>
                    {project.status}
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="project-details">
                  <div className="team-members">
                    {project.team.map((member, index) => (
                      <span key={index} className="member-tag">{member}</span>
                    ))}
                  </div>
                  <div className="due-date">
                    Due: {new Date(project.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="dashboard-card">
          <h2>Upcoming Tasks</h2>
          <div className="task-list">
            {upcomingTasks.map(task => (
              <div key={task.id} className="task-item">
                <div className="task-header">
                  <h3>{task.title}</h3>
                  <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="task-details">
                  <span className="project-name">{task.project}</span>
                  <span className="due-date">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
