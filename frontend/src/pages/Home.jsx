import React, { useState } from "react";
import Search from "../components/Search";
import LandingPage from "../animations/LandingPage";
import RemedySuggestionForm from "../components/SuggestionForm";
import RemedyCard from "../components/RemedyCard";
import { getRemedies } from "../apis/RemedyApis";
import { NavLink } from "react-router";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [remedyResults, setRemedyResults] = useState([]);
  const [showContent, setShowContent] = useState(true);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setShowContent(true);
      return;
    }
    // console.log("Search triggered with query:", searchQuery);
    try {
      const res = await getRemedies(searchQuery);
      // console.log("Response from API:", res);
      setRemedyResults(res);
      setShowContent(false);
    } catch (err) {
      console.error("Error fetching remedies:", err);
    }
  };

  return (
    <>
      <div className=" min-h-screen bg-gradient-to-b from-[#E1F1E7] to-[#5DA134] ">
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
        {showContent ? (
          <LandingPage />
        ) : (
          <div className="flex flex-wrap justify-center gap-4 px-4 mx-auto my-4 rounded-xl  p-4">
            {remedyResults.length === 0 ? (
              <div>
                <h1 className="text-3xl text-green-600 font-bold text-center mt-6">
                  Sorry, we couldn't find a remedy for your search. 🥲
                </h1>
                <h2 className="text-xl text-green-600 font-medium text-center mt-4">
                  Want to suggest one? Head over to the{" "}
                  <NavLink
                    className="text-green-950 font-bold "
                    to="suggestion"
                  >
                    Suggestion Page{" "}
                  </NavLink>
                </h2>
              </div>
            ) : (
              remedyResults.map((remedy) => (
                <div
                  key={remedy._id}
                  className="w-auto max-w-[1200px] h-auto flex"
                >
                  <RemedyCard remedy={remedy} />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}
