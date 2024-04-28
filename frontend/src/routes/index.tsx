import React, { ReactElement, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import FormLayout from "@layouts/FormLayout";
import Home from "./Home";
import Login from "./Login";
import CreateProject from "./CreateProject";
import ProtectedRoute from "@components/ProtectedRoute";
const Project = lazy(() => import("@routes/Project"));
const Tasks = lazy(() => import("@routes/Tasks"));
const SignUp = lazy(() => import("@routes/SignUp"));
// const CreateProject = lazy(() => import("@routes/CreateProject"));

const Router: React.FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="projects/new" element={<CreateProject />} />
          <Route element={<MainLayout />}>
            <Route path="tasks" element={<Tasks />} />
            <Route path="home" element={<Home />} />
            <Route path="projects/:id" element={<Project />} />
          </Route>
        </Route>

        <Route element={<FormLayout />}>
          <Route path="signUp" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/" element={<Navigate to="/home" replace={true} />} />
        {/* <Route path="*" element={<Navigate to={"/404"} />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
