"use client";

import MovieCard from "./MovieCard";
import InfiniteScroll from "./InfiniteScroll";
import { useMovieContext } from "@/context/MovieContext";

export default function MovieList() {
  const { movies, loading, error, hasMore, loadMoreMovies, searchQuery } =
    useMovieContext();

  const getFilteredMovies = (movies) => {
    let filteredMovies = movies;
    filteredMovies = movies.filter((ele) =>
      ele.original_title.includes(searchQuery)
    );

    return filteredMovies;
  };

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <InfiniteScroll
      loadMore={loadMoreMovies}
      hasMore={hasMore}
      loading={loading}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {getFilteredMovies(movies).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {loading && <div className="text-center mt-4">Loading...</div>}
      {!loading && movies.length === 0 && (
        <div className="text-center mt-4">
          No movies found. Try adjusting your search or filters.
        </div>
      )}
    </InfiniteScroll>
  );
}
