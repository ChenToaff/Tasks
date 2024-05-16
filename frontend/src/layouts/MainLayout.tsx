import DrawerHeader from "@components/DrawerHeader";
import Loading from "@components/Loading";
import SideMenu from "@components/SideMenu";
import TopBar from "@components/TopBar";
import TaskRightDrawer from "@features/tasks/components/TaskRightDrawer";
import { SelectedTaskProvider } from "@features/tasks/contexts/SelectedTaskContext";
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
          <Box
            component="main"
            sx={{
              height: "100vh",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <SelectedTaskProvider>
              <DrawerHeader />
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  overflow: "auto",
                  marginX: 3,
                }}
              >
                <Suspense fallback={<Loading />}>
                  <Outlet />
                </Suspense>
                <TaskRightDrawer />
              </Box>
            </SelectedTaskProvider>
          </Box>
        </Box>
      </Box>
    </>
  );
}
