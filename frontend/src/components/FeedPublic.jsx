import * as React from 'react';

import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Container,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FavoriteIcon,
  red,
} from "../assets/mui";

const originPost = [
  {
    id: 1,
    author: "Eddy Malou",
    date: "February 24, 2026",
    text: "La congolexicomatisation des lois du marché.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxAPnjjYw7fRQ2SYiBpK5yV6dAnbnXdqdHZg&s",
  },
];

const API_BASE_URL = "http://127.0.0.1:8000/api";

function mapApiPostToUi(post) {
  return {
    id: post.id,
    author: post.author_name ?? "Utilisateur",
    date: post.created_at ? new Date(post.created_at).toLocaleDateString() : "",
    text: post.text ?? "",
    imageUrl: post.image_url ?? "",
  };
}

export default function FeedPublic({ user }) {
  const [open, setOpen] = React.useState(false);
  const openCreateDialog = () => setOpen(true);
  const closeCreateDialog = () => setOpen(false);

  const [apiPosts, setApiPosts] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setError("");
        const res = await fetch(`${API_BASE_URL}/posts/`);
        if (!res.ok) throw new Error("Impossible de charger les posts");
        const data = await res.json(); // posts backend
        const uiPosts = data.map(mapApiPostToUi);
        if (mounted) setApiPosts(uiPosts);
      } catch (e) {
        if (mounted) setError(e.message ?? "Erreur");
      }
    })();

    return () => { mounted = false; };
  }, []);

  const posts = [...apiPosts, ...originPost];

  const createPublication = async ({ text, imageUrl }) => {
    setError("");

    const token = localStorage.getItem("access");
    if (!token) {
      setError("Pas de token : connecte-toi avant de publier.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/posts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, image_url: imageUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "Impossible de publier");
      }

      const createdUi = mapApiPostToUi(data);
      setApiPosts((prev) => [createdUi, ...prev]); // at the begining
    } catch (e) {
      setError(e.message ?? "Erreur lors de la publication");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 0 }}>
      <Card className="app-block composer-block" sx={{ width: 600, maxWidth: "100%", mx: "auto", mb: 3, borderRadius: 3 }}>
        <CardContent>
          <div
            onClick={openCreateDialog}
            style={{
              backgroundColor: "#F0F2F5",
              borderRadius: "20px",
              padding: "12px 16px",
              cursor: "pointer",
              color: "#555",
              textAlign: "left",
            }}
          >
            Quoi de neuf ?
          </div>
        </CardContent>
      </Card>

      {!!error && (
        <Card sx={{ width: 600, maxWidth: "100%", mx: "auto", mb: 3 }}>
          <CardContent>
            <Typography variant="body2" sx={{ color: "error.main" }}>
              {error}
            </Typography>
          </CardContent>
        </Card>
      )}

      {posts.map((post) => (
        <Card className="app-block post-block" key={post.id} sx={{ width: 600, maxWidth: "100%", mx: "auto", mb: 3 }}>
          <CardHeader
            sx={{ 
              textAlign: "left", 
              "& .MuiCardHeader-content": { textAlign: "left" }, 
              "& .MuiCardHeader-title": { textAlign: "left" }, 
              "& .MuiCardHeader-subheader": { textAlign: "left" },
            }}
            avatar={
              <Avatar sx={{ bgcolor: "#C45A3B" }}>
                {post.author[0]}
              </Avatar>
            }
            title={post.author}
            subheader={post.date}
          />

          {post.imageUrl && (
            <CardMedia className="post-image"
              component="img"
              image={post.imageUrl}
              sx={{ width: "100%", height: "auto" , borderRadius: 2 }}
            />
          )}

          {post.text && (
            <CardContent>
              <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "left" }}>
                {post.text}
              </Typography>
            </CardContent>
          )}

          <CardActions>
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}

      <CreatePublicationDialog
        open={open}
        onClose={closeCreateDialog}
        onCreate={(payload) => {
          createPublication(payload);
          closeCreateDialog();
        }}
      />
    </Container>
  );
}

// ======================================
//   Component: CreatePublicationDialog
// ======================================

function CreatePublicationDialog({ open, onClose, onCreate }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const text = (formJson.text ?? "").toString().trim();
    const imageUrl = (formJson.imageUrl ?? "").toString().trim();

    if (text === "" && imageUrl === "") return;

    onCreate({ text, imageUrl });
    event.currentTarget.reset();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Quoi de neuf ?</DialogTitle>

      <DialogContent>
        <form id="post-form" onSubmit={handleSubmit}>
          <TextField autoFocus margin="dense" name="text" label="..." fullWidth multiline minRows={3} />
          <TextField margin="dense" name="imageUrl" label="Colle l'URL de ton image" fullWidth />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined" sx={{ borderColor: "grey.400", color: "inherit", borderRadius: "14px" }}>
          Annuler
        </Button>
        <Button type="submit" form="post-form" variant="contained" sx={{ borderColor: "grey.400", backgroundColor: "#C45A3B", borderRadius: "14px" }}>
          Publier
        </Button>
      </DialogActions>
    </Dialog>
  );
}