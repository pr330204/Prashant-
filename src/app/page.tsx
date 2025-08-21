"use client";

import type { Movie } from "@/lib/types";
import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { MovieList } from "@/components/movie-list";
import { AddMovieDialog } from "@/components/add-movie-dialog";
import { SuggestMovieDialog } from "@/components/suggest-movie-dialog";
import { Button } from "@/components/ui/button";
import { Plus, Wand2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

// Initial placeholder data for movies
const initialMovies: Movie[] = [
  {
    id: "1",
    title: "Inception",
    url: "https://www.youtube.com/embed/YoHD9XEInc0",
    votes: 25,
  },
  {
    id: "2",
    title: "The Matrix",
    url: "https://www.youtube.com/embed/vKQi3bBA1y8",
    votes: 30,
  },
  {
    id: "3",
    title: "Interstellar",
    url: "https://www.youtube.com/embed/zSWdZVtXT7E",
    votes: 22,
  },
  {
    id: "4",
    title: "Parasite",
    url: "https://www.youtube.com/embed/5xH0HfJHsaY",
    votes: 18,
  },
];

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [isAddMovieOpen, setAddMovieOpen] = useState(false);
  const [isSuggestMovieOpen, setSuggestMovieOpen] = useState(false);
  const { user } = useAuth();

  const sortedMovies = useMemo(() => {
    return [...movies].sort((a, b) => b.votes - a.votes);
  }, [movies]);

  const handleVote = (id: string, type: "up" | "down") => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id
          ? { ...movie, votes: movie.votes + (type === "up" ? 1 : -1) }
          : movie
      )
    );
  };

  const handleAddMovie = (movie: Omit<Movie, "id" | "votes">) => {
    const newMovie: Movie = {
      ...movie,
      id: Date.now().toString(),
      votes: 0,
    };
    setMovies((prevMovies) => [newMovie, ...prevMovies]);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 px-4 py-8 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-center sm:text-left">
              <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Movie Watchlist
              </h1>
              <p className="text-muted-foreground">
                Vote for your favorite movies to watch next.
              </p>
            </div>
            {user && (
              <div className="flex shrink-0 gap-2">
                <Button onClick={() => setSuggestMovieOpen(true)}>
                  <Wand2 />
                  Suggest with AI
                </Button>
                <Button onClick={() => setAddMovieOpen(true)} variant="secondary">
                  <Plus />
                  Add Movie
                </Button>
              </div>
            )}
          </div>
          <MovieList movies={sortedMovies} onVote={handleVote} />
        </div>
      </main>
      <AddMovieDialog
        isOpen={isAddMovieOpen}
        onOpenChange={setAddMovieOpen}
        onMovieAdded={handleAddMovie}
      />
      <SuggestMovieDialog
        isOpen={isSuggestMovieOpen}
        onOpenChange={setSuggestMovieOpen}
        onMovieSuggested={(title, url) => {
          handleAddMovie({ title, url });
          setSuggestMovieOpen(false);
        }}
      />
    </div>
  );
}
