import React, { useState } from "react";
import Search from "../components/Search";
import LandingPage from "../animations/LandingPage";
import RemedySuggestionForm from "../components/SuggestionForm";
import RemedyCard from "../components/RemedyCard";
import { getRemedies } from "../apis/RemedyApis";

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
    console.log("Search triggered with query:", searchQuery);
    try {
      const res = await getRemedies(searchQuery);
      console.log("Response from API:", res);
      setRemedyResults(res);
      setShowContent(false);
    } catch (err) {
      console.error("Error fetching remedies:", err);
    }
  };

  return (
    <>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      {showContent ? (
        <LandingPage />
      ) : (
        <div className="flex flex-wrap justify-center gap-4 px-4 max-w-[1200px] mx-auto my-4 ">
          {remedyResults.map((remedy) => (
            <div key={remedy._id} className="w-auto max-w-[1200px] h-auto flex">
              <RemedyCard remedy={remedy} />
            </div>
          ))}
        </div>
      )}

      {/* <RemedySuggestionForm /> */}
    </>
  );
}
