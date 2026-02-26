import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './assets/index.css'
import Login from './components/Login.jsx'
import Home from "./pages/Home.jsx"
import SignUp from './components/SignUp.jsx'

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://127.0.0.1:8000/api/me/', {
        headers: { 'Authorization': `Bearer ${token}`}
      })
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        navigate(`/${data.user.id}/feed`);
      })
      .catch(() => {
        localStorage.removeItem('token');
      })
      .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) return null;

  const handleLoginSuccess = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    navigate(`/${userData.id}/feed`);
  };


  return (
    <Routes>
      <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/:userId/feed" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
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
