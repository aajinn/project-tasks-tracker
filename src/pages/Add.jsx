import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const navigate = useNavigate();
  const [newProject, setNewProject] = useState({
    name: '',
    tasks: '',
    deadline: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const project = {
      id: Date.now(),
      name: newProject.name,
      tasks: parseInt(newProject.tasks),
      deadline: newProject.deadline
    };
    
    // Get existing projects from localStorage
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    // Add new project
    const updatedProjects = [...existingProjects, project];
    // Save to localStorage
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    // Navigate back to projects page
    navigate('/projects');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem' 
      }}>
        <h1>Add New Project</h1>
        <button 
          className="button"
          onClick={() => navigate('/projects')}
          style={{ marginleft: '1rem' }}
        >
          Back to Projects
        </button>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontWeight: '500'
            }}>
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={newProject.name}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem'
              }}
              placeholder="Enter project name"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontWeight: '500'
            }}>
              Number of Tasks
            </label>
            <input
              type="number"
              name="tasks"
              value={newProject.tasks}
              onChange={handleInputChange}
              required
              min="0"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem'
              }}
              placeholder="Enter number of tasks"
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontWeight: '500'
            }}>
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={newProject.deadline}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem'
              }}
            />
          </div>


          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              type="submit"
              className="button button-primary"
              style={{ flex: 1 }}
            >
              Add Project
            </button>
            <button 
              type="button"
              className="button"
              onClick={() => navigate('/projects')}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
