"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useMovieContext } from "@/context/MovieContext";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const { setSearchQuery, searchQuery } = useMovieContext();

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, searchQuery]);

  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
