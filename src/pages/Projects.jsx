import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(savedProjects);
  }, []);

  const handleDelete = (projectId) => {
    const updatedProjects = projects.filter(project => project.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Projects</h1>

        <button 
          className="button button-primary"
          onClick={() => navigate('/add-project')}
        >
          Add New Project
        </button>
      </div>
      
      <div className="projects-container">
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Tasks</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.tasks}</td>
                <td>{new Date(project.deadline).toLocaleDateString()}</td>
                <td>
                  <button className="button" style={{ marginRight: '0.5rem' }}>Edit</button>
                  <button 
                    className="button" 
                    style={{ backgroundColor: '#ff7675', color: 'white' }}
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
