import type { Movie } from "@/lib/types";
import { MovieCard } from "./movie-card";

interface MovieListProps {
  movies: Movie[];
  onVote: (id: string, type: "up" | "down") => void;
}

export function MovieList({ movies, onVote }: MovieListProps) {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
        <h3 className="text-xl font-semibold tracking-tight">No movies yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Add a movie to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onVote={onVote} />
      ))}
    </div>
  );
}
