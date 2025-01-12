const BASE_URL = "https://api.themoviedb.org/3";
import { API_options } from "./constants";
import { useState, useCallback } from "react";

export function useFetchData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMovies = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?language=en-US&page=${page}`,
        API_options
      );
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err ? err : new Error("An error occurred"));
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchMoviesApi = useCallback(async (query, page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?query=${query}&language=en-US&page=${page}`,
        API_options
      );
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err ? err : new Error("An error occurred"));
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const discoverMoviesApi = useCallback(async (filters, page = 1) => {
    const { genre, yearFrom, yearTo, ratingFrom, ratingTo } = filters;

    setLoading(true);
    setError(null);
    try {
      let url = `${BASE_URL}/discover/movie?language=en-US&&page=${page}`;

      if (genre) url += `&with_genres=${genre}`;
      if (yearFrom) url += `&primary_release_date.gte=${yearFrom}-01-01`;
      if (yearTo) url += `&primary_release_date.lte=${yearTo}-12-31`;
      if (ratingFrom) url += `&vote_average.gte=${ratingFrom}`;
      if (ratingTo) url += `&vote_average.lte=${ratingTo}`;

      const response = await fetch(url, API_options);
      const data = response.json();

      return data;
    } catch (err) {
      setError(err ? err : new Error("An error occurred"));
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, getMovies, searchMoviesApi, discoverMoviesApi };
}
