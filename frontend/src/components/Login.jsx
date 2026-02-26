import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Card, CardContent, CardActions, Typography } from '@mui/material'

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("access", data.access);
      onLoginSuccess(data.user);
      navigate(`/${data.user.id}/feed`);
      console.log("user :", data.user.id);
    };
  };

  const handleSignUp = () => {
    navigate("/signup");
  }

  return (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      flexDirection: "column",
    }}
  >
    <h1>The Old One</h1>

    <Box component="form" onSubmit={handleSubmit}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: 400,
          height: 475,
          color: "#FAF9F7",
          boxShadow: 10,
          borderRadius: 6,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Typography variant="h5" sx={{ color: "#45413C" }}>
            Avec THE OLD ONE, partagez et restez en contact avec vos proches, et uniquement vos proches.
          </Typography>

          <Typography sx={{ color: "#45413C", mt: 3, textTransform: "uppercase" }}>
            Se Connecter
          </Typography>

          <TextField
            type="email"
            id="outlined-email"
            label="Email"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            type="password"
            id="outlined-password"
            label="Password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardContent>

        <CardActions sx={{ display: "flex", flexDirection: "column", gap: 1, px: 2 }}>
          <Button type="submit" variant="contained" size="medium" sx={{ backgroundColor: "#C45A3B" }}>
            se connecter
          </Button>
          <Button onClick={handleSignUp} size="small" sx={{ color: "#C45A3B" }}>
            s'inscrire
          </Button>
        </CardActions>
      </Card>
    </Box>
  </Box>
);
}
export default Login