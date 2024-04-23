import React, { ReactElement, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import FormLayout from "@layouts/FormLayout";
import Home from "./Home";
import Login from "./Login";
const Tasks = lazy(() => import("@routes/Tasks"));
const SignUp = lazy(() => import("@routes/SignUp"));

const Router: React.FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainLayout />}
          children={
            <>
              <Route path="Tasks" element={<Tasks />} />
              <Route path="Home" element={<Home />} />
            </>
          }
        />

        <Route
          path="SignUp"
          element={
            <FormLayout>
              <SignUp />
            </FormLayout>
          }
        />
        <Route
          path="Login"
          element={
            <FormLayout>
              <Login />
            </FormLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
