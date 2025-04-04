import { useState } from "react";

const LogoutPopup = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Logout Button as Text */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-700 hover:underline hover:text-black"
      >
        Logout
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-lg z-50">
          <div className="bg-[#CFE6D0] shadow-lg rounded-xl p-6 w-80 text-center border border-[#5DA134]">
            <p className="text-lg text-[#143117] font-semibold mb-4">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-evenly">
              {/* Cancel Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-[#E1F1E7] text-[#143117] rounded-lg hover:bg-[#CFE6D0] border border-[#5DA134] transition cursor-pointer"
              >
                Cancel
              </button>

              {/* Confirm Logout Button */}
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-[#2AA831] text-white rounded-lg hover:bg-[#5DA134] transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutPopup;
