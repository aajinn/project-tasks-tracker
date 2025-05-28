import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import Add from './pages/Add';
import './App.css';
import './styles.css';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <AdminSidebar />
        <main style={{ padding: '20px', flex: 1, marginLeft: '240px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/add-project" element={<Add />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

