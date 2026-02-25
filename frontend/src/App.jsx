import { useState } from 'react'
import './App.css'
import Login from './components/Login.jsx'
import FeedPublic from './components/FeedPublic.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentPage('feedpublic');
  };

  if ( currentPage === 'login') {
    return (
      <Login onLoginSuccess={handleLoginSuccess}/>
    )
  }

  if ( currentPage === 'feedpublic') {
    return (
      <FeedPublic user={user}/>
    )
  }

};

export default App
