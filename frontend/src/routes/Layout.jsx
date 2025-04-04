import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import useAuthStore from "../contexts/store/authStore";
import { useEffect } from "react";

export default function Layout() {
  const { checkAuth, loading } = useAuthStore(); // Get Zustand actions/state
  useEffect(() => {
    const fetchAuth = async () => {
      await checkAuth();
    };
    fetchAuth();
  }, [checkAuth]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}
