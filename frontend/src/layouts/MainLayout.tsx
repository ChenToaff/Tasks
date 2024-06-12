import DrawerHeader from "@components/DrawerHeader";
import Loading from "@components/Loading";
import SideMenu from "@components/SideMenu";
import TopBar from "@components/TopBar";
import TaskDrawer from "@features/tasks/components/TaskDrawer";
import { SelectedTaskProvider } from "@features/tasks/contexts/SelectedTaskContext";
import { TaskInEditProvider } from "@features/tasks/contexts/TaskInEditContext";
import { Box, CssBaseline } from "@mui/material";
import socketService from "@services/WebsocketService";
import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout(): JSX.Element {
  useEffect(() => {
    socketService.connect("");

    return () => {
      socketService.disconnect();
    };
  });
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          height: "100%",
          flexDirection: "column",
        }}
      >
        <TopBar />
        <Box
          sx={{ display: "flex", height: "100%", flexGrow: 1, width: "100%" }}
        >
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
              <TaskInEditProvider>
                <DrawerHeader />
                <Box
                  minWidth="400px"
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    overflow: "auto",
                    paddingLeft: 3,
                  }}
                >
                  <Suspense fallback={<Loading />}>
                    <Outlet />
                  </Suspense>
                  <TaskDrawer />
                </Box>
              </TaskInEditProvider>
            </SelectedTaskProvider>
          </Box>
        </Box>
      </Box>
    </>
  );
}
