import React from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function Search({ searchQuery, setSearchQuery, handleSearch }) {
  return (
    <>
      <form
        onSubmit={handleSearch}
        className="flex justify-center items-center w-full px-4 pt-10 "
      >
        <input
          name="search"
          type="text"
          placeholder="Try Searching Face tan.."
          className="w-full max-w-3xl p-3 rounded-full bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-[#5DA134] transition-all duration-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch(e);
            }
          }}
        />
      </form>
    </>
  );
}
