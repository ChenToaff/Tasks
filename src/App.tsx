import "./App.css";
import TopBar from "./comopnents/TopBar";
import Home from "./comopnents/Home";
import { Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TopBar />
      <Home />
    </Box>
  );
}

export default App;
