import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './assets/index.css'
import Login from './components/Login.jsx'
import FeedPublic from './components/FeedPublic.jsx'

function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    navigate(`/${userData.id}/feed`);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />}/>
      <Route path="/:userId/feed" element={user ? <FeedPublic user={user} /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
};

function App() {
  return (
  <BrowserRouter>
    <AppContent/>
  </BrowserRouter>
  )
}

export default App
