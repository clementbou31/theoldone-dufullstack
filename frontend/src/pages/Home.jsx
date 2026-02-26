import * as React from "react";
import { Box } from "../assets/mui";
import Menu from "../components/Menu.jsx";
import FeedPublic from "../components/FeedPublic.jsx";

export default function Home({ user }) {
  return (
    <Box sx={{ display: "flex", gap: 2, p: 2 }}>
      <Menu />
      <Box sx={{ flex: 1 }}>
        <FeedPublic user={user} />
      </Box>
    </Box>
  );
}