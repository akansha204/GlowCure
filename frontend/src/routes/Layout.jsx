import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import useAuthStore from "../contexts/store/authStore";
import { useEffect } from "react";
import useLikedStore from "../contexts/store/userLikedStore";

export default function Layout() {
  const { checkAuth, loading, isAuthenticated } = useAuthStore(); // Get Zustand actions/state
  const { fetchLikedRemedies } = useLikedStore();

  useEffect(() => {
    const fetchAuth = async () => {
      await checkAuth();
    };
    fetchAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLikedRemedies(); // fetch once after login
    }
  }, [isAuthenticated]);

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
