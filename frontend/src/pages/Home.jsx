import * as React from "react";
import { Box } from "../assets/mui";
import Menu from "../components/Menu.jsx";
import FeedPublic from "../components/FeedPublic.jsx";

export default function Home({ user }) {
  return (
    <Box sx={{ display: "flex", gap: 2, p: 2, alignItems: "flex-start" }}>
    <Box sx={{ position: "sticky", top: 16, height: "calc(100vh - 32px)" }}>
        <Menu />
    </Box>
    <Box sx={{ flex: 1 }}>
        <FeedPublic user={user} />
    </Box>
    </Box>
  );
}