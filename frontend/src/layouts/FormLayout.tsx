import Loading from "@components/Loading";
import { Box, CssBaseline, Container } from "@mui/material";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function FormLayout(): JSX.Element {
  return (
    <Container maxWidth="xs" sx={{ marginTop: 8 }}>
      <CssBaseline />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>{" "}
    </Container>
  );
}
