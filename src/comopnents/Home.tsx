import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TopBarNew from "./TopBarNew";
import SideMenu from "./SideMenu";
import MainView from "./MainView";

export default function Home() {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
      <SideMenu />
      <MainView />
    </Box>
  );
}
