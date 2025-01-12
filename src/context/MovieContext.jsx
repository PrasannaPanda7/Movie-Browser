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
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const { loading, error, getMovies, searchMoviesApi, discoverMoviesApi } =
    useFetchData();

  const loadMoreMovies = useCallback(async () => {
    let data;
    if (loading) return;
    if (isAdvancedSearch) {
      data = await discoverMoviesApi(filters, page);
    } else if (searchQuery) {
      data = await searchMoviesApi(searchQuery, page);
    } else {
      data = await getMovies(page);
    }

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

  const toggleAdvancedSearch = useCallback(() => {
    setIsAdvancedSearch((prev) => !prev);
    resetMovies();
  }, [resetMovies]);

  const contextValue = {
    movies,
    loading,
    error,
    searchQuery,
    filters,
    page,
    hasMore,
    isAdvancedSearch,
    setSearchQuery: (query) => {
      setSearchQuery(query);
      resetMovies();
    },
    setFilters: (newFilters) => {
      setFilters(newFilters);
      resetMovies();
    },
    loadMoreMovies,
    toggleAdvancedSearch,
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
