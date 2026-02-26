import * as React from "react";
import { Box, Typography } from "../assets/mui";
import Menu from "../components/Menu.jsx";
import FeedPublic from "../components/FeedPublic.jsx";



// export default function Home({ user }) {
//   return (
//     <Box sx={{ display: "flex", gap: 2, p: 2, alignItems: "flex-start" }}>
//     <Box sx={{ position: "sticky", top: 16, height: "calc(100vh - 32px)" }}>
//         <Menu />
//     </Box>
//     <Box sx={{ flex: 1 }}>
//         <FeedPublic user={user} />
//     </Box>
//     </Box>
//   );
// }


export default function Home({ user }) {
  return (
    <>
      {/* HEADER */}
      <Box
        sx={{
          p: 3,
          backgroundColor: "#f7cea6",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          borderRadius: 2
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          The Old One
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Partagez avec ceux qui comptent vraiment.
        </Typography>
      </Box>

      {/* CONTENU */}
      <Box sx={{ display: "flex", gap: 2, p: 2 }}>
        <Menu user={user}/>
        <Box sx={{ flex: 1 }}>
          <FeedPublic user={user} />
        </Box>
      </Box>
    </>
  );
}