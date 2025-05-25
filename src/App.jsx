import { useState } from 'react'
import './App.css'
import AdminSidebar from './components/AdminSidebar.jsx';
import './styles.css'
function App() {
  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <main style={{ padding: '20px', flex: 1 }}>
        <h1>Admin Dashboard</h1>
        {/* You will add routing/pages here later */}
      </main>
    </div>
  );
}

export default App;

