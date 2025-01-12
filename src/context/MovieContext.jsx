"use client";

import React, { createContext, useState, useContext, useCallback } from "react";
import { useFetchData } from "@/hooks/useFetchData";

const MovieContext = createContext(undefined);

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    yearFrom: "",
    yearTo: "",
    ratingFrom: "",
    ratingTo: "",
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { loading, error, getMovies, searchMoviesApi } = useFetchData();

  const loadMoreMovies = useCallback(async () => {
    if (loading) return;
    const data = Object.values(filters).some(Boolean)
      ? await searchMoviesApi(searchQuery, page, filters)
      : await getMovies(page);

    if (data) {
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(data.page < data.total_pages);
    }
  }, [searchQuery, filters, page]);

  const resetMovies = useCallback(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, []);

  const contextValue = {
    movies,
    loading,
    error,
    searchQuery,
    filters,
    page,
    hasMore,
    setSearchQuery: (query) => {
      setSearchQuery(query);
    },
    setFilters: (newFilters) => {
      setFilters(newFilters);
      resetMovies();
    },
    loadMoreMovies,
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
}
