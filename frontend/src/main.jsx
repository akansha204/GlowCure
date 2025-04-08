import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Layout from "./routes/Layout";
import Home from "./pages/Home";
import Blog from "./pages/Blog.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Liked from "./pages/Liked.jsx";
import SignUpPage from "./components/SignUpPage.jsx";

import useAuthStore from "./contexts/store/authStore";
import RemedySuggestionForm from "./components/SuggestionForm.jsx";
import ForgetPassword from "./pages/forgetPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="blog" element={<Blog />} />
      <Route path="SignUp" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="liked" element={<Liked />} />
      <Route path="SignUpPage" element={<SignUpPage />} />
      <Route path="suggestion" element={<RemedySuggestionForm />} />
      <Route path="ForgetPassword" element={<ForgetPassword />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
