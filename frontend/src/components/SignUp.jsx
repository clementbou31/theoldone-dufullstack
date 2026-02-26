import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Card, CardContent, CardActions, Typography } from '@mui/material'

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setEmail('');
      setPassword('');
      setName('');
      navigate('/login');
    }
  }

  const handleLogin = () => {
    navigate("/login");
  }

  return (
    <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
          gap: 2,
        }}
      >      
      <h1>the old one</h1>
      <Box component="form" onSubmit={handleSubmit}>
        <Card sx={{ 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          width: 320, 
          height: 365, 
          color: "#FAF9F7" ,
          boxShadow: 10,
          borderRadius: 6,
        }}>
          <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <Typography variant="h5" sx={{ color: "#45413C", textTransform: 'uppercase'  }}>Sign up</Typography>
            <TextField
              type="email"
              id="outlined-email"
              label="Email"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="text"
              id="outlined-text"
              label="Name"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              type="password"
              id="outlined-email"
              label="Password"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </CardContent>
          <CardActions sx={{ display: "flex", flexDirection: "column", px: 2}}>
            <Button type="submit" variant="contained" size="medium" sx={{ backgroundColor: "#C45A3B" }}>s'inscrire</Button>
            <Button onClick={handleLogin} size="small" sx={{ color: "#C45A3B" }}>se connecter</Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  )
}

export default SignUp