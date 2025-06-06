import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/config';
import './Projects.css';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

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

  const handleDeleteClick = (projectId) => {
    setProjectToDelete(projectId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/projects/${projectToDelete}`);
      setProjects(projects.filter(project => project._id !== projectToDelete));
      setShowDeleteModal(false);
      setProjectToDelete(null);
    } catch (err) {
      setError('Failed to delete project. Please try again later.');
      console.error('Error deleting project:', err);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  const handleEditClick = (project) => {
    setEditingProject({ ...project });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = async () => {
    try {
      const response = await api.put(`/projects/${editingProject._id}`, editingProject);
      setProjects(projects.map(project => 
        project._id === editingProject._id ? response.data : project
      ));
      setShowEditModal(false);
      setEditingProject(null);
    } catch (err) {
      setError('Failed to update project. Please try again later.');
      console.error('Error updating project:', err);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingProject(null);
  };

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.status.toLowerCase() === filter;
  });

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>Projects</h1>
        <button className="add-project-btn" onClick={() => navigate('/add-project')}>
          Add Project
        </button>
      </div>

      <div className="filter-bar">
        <button 
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Projects
        </button>
        <button 
          className={`filter-button ${filter === 'in-progress' ? 'active' : ''}`}
          onClick={() => setFilter('in-progress')}
        >
          In Progress
        </button>
        <button 
          className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div key={project._id} className="project-card">
            <div className="project-header">
              <h3>{project.name}</h3>
              <span className={`status-badge ${project.status.toLowerCase()}`}>
                {project.status}
              </span>
            </div>
            
            <p className="project-description">{project.description}</p>
            
            <div className="project-dates">
              <div className="date-item">
                <span className="date-label">Start Date:</span>
                <span className="date-value">{new Date(project.startDate).toLocaleDateString()}</span>
              </div>
              {project.endDate && (
                <div className="date-item">
                  <span className="date-label">End Date:</span>
                  <span className="date-value">{new Date(project.endDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            <div className="project-actions">
              <button 
                className="button button-edit"
                onClick={() => handleEditClick(project)}
              >
                Edit
              </button>
              <button 
                className="button button-delete"
                onClick={() => handleDeleteClick(project._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="no-projects">
          <p>No projects found.</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this project? This action cannot be undone.</p>
            <div className="modal-actions">
              <button 
                className="button"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button 
                className="button button-delete"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {showEditModal && editingProject && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Project</h3>
            <div className="form-group">
              <label>Project Name</label>
              <input
                type="text"
                name="name"
                value={editingProject.name}
                onChange={handleEditChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={editingProject.description}
                onChange={handleEditChange}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={editingProject.status}
                onChange={handleEditChange}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={editingProject.startDate.split('T')[0]}
                onChange={handleEditChange}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={editingProject.endDate ? editingProject.endDate.split('T')[0] : ''}
                onChange={handleEditChange}
              />
            </div>
            <div className="modal-actions">
              <button 
                className="button"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
              <button 
                className="button button-primary"
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
