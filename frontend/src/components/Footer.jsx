import React, { useEffect, useState } from "react";

export default function Footer() {
  const [showFooter, setShowFooter] = useState(false);

  // ✅ Check if the user has scrolled to the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.body.offsetHeight;

      if (scrollPosition >= pageHeight) {
        setShowFooter(true); // Show footer at the bottom
      } else {
        setShowFooter(false); // Hide footer otherwise
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {showFooter && (
        <footer className="fixed bottom-0 left-0 w-full p-4 rounded-t-2xl  shadow-lg transition-opacity duration-500 opacity-100">
          <div className="flex flex-col sm:flex-row justify-center items-center text-[#143117] gap-4">
            <div className="flex space-x-4">
              <a href="/" className="hover:text-[#2AA831] text-sm font-light">
                Home
              </a>
              <a
                href="/articles"
                className="hover:text-[#2AA831] text-sm font-light"
              >
                Articles
              </a>
            </div>
            <p className="font-bold text-sm opacity-70">GlowCure</p>
            <div className="flex space-x-4">
              <a
                href="/liked"
                className="hover:text-[#2AA831] text-sm font-light"
              >
                Liked
              </a>
              <a
                href="/profile"
                className="hover:text-[#2AA831] text-sm font-light"
              >
                Your Profile
              </a>
              <a
                href="/logout"
                className="hover:text-[#2AA831] text-sm font-light"
              >
                Logout
              </a>
              <a
                href="/signup"
                className="hover:text-[#2AA831] text-sm font-light"
              >
                Signup
              </a>
            </div>
          </div>
          <p className="text-center mt-2 text-xs opacity-60">
            &copy; 2025 GlowCure. All rights reserved.
          </p>
        </footer>
      )}
    </>
  );
}
