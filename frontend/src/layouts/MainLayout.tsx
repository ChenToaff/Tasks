import DrawerHeader from "@components/DrawerHeader";
import Loading from "@components/Loading";
import SideMenu from "@components/SideMenu";
import TopBar from "@components/TopBar";
import { Box, Container, CssBaseline } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout(): JSX.Element {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        <TopBar />
        <Box sx={{ display: "flex", flexGrow: 1, width: "100%" }}>
          <SideMenu />
          <Box component="main" sx={{ overflow: "auto", flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </Box>
        </Box>
      </Box>
    </>
  );
}
