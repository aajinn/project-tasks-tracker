import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';
import UserSidebar from './components/UserSidebar';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import Add from './pages/Add';
import Tasks from './pages/Tasks';
import UserDashboard from './components/UserDashboard';
import Login from './pages/Login';
import Team from './pages/Team';
import './App.css';
import './styles.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === 'admin' ? '/' : '/user/dashboard'} />} />
        
        <Route path="/*" element={
          !user ? (
            <Navigate to="/login" />
          ) : (
            <div style={{ display: 'flex' }}>
              {user.role === 'admin' ? (
                <>
                  <AdminSidebar />
                  <main style={{ padding: '20px', flex: 1, marginLeft: '240px' }}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/add-project" element={<Add />} />
                      <Route path="*" element={<Navigate to="/" />} />
                      <Route path="/tasks" element={<Tasks />} />
                      <Route path="/team" element={<Team />} />
                    </Routes>
                  </main>
                </>
              ) : (
                <>
                  <UserSidebar />
                  <main style={{ padding: '20px', flex: 1, marginLeft: '240px' }}>
                    <Routes>
                      <Route path="/user/dashboard" element={<UserDashboard />} />
                      <Route path="/user/profile" element={<div>Profile Page</div>} />
                      <Route path="*" element={<Navigate to="/user/dashboard" />} />
                    </Routes>
                  </main>
                </>
              )}
            </div>
          )
        } />
      </Routes>
    </Router>
  );
}

export default App;

