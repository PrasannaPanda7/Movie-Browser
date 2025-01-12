import { MovieProvider } from "@/context/MovieContext";
import MovieList from "@/components/MovieList";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";

export default function Home() {
  return (
    <MovieProvider>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Movie Explorer</h1>
        <SearchBar />
        <Filters />
        <MovieList />
      </main>
    </MovieProvider>
  );
}
