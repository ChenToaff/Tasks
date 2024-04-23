import { Box, CssBaseline, Container } from "@mui/material";
import React, { Suspense } from "react";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </Container>
  );
}
