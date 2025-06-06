import React, { useState, useEffect } from 'react';
import api from '../api/config';
import './UserDashboard.css';

const UserDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/projects');
      setProjects(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch projects. Please try again later.');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading your projects...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="user-dashboard">
      <h1>My Projects</h1>
      
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project._id} className="project-card">
            <h3>{project.name}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-status">
              <span className={`status-badge ${project.status.toLowerCase()}`}>
                {project.status}
              </span>
            </div>
            <div className="project-dates">
              <div>
                <strong>Start Date:</strong>
                <span>{new Date(project.startDate).toLocaleDateString()}</span>
              </div>
              {project.endDate && (
                <div>
                  <strong>End Date:</strong>
                  <span>{new Date(project.endDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="no-projects">
          <p>You don't have any projects assigned yet.</p>
        </div>
      )}
    </div>
  );
};

export default UserDashboard; 