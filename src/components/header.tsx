"use client";

import { Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onAddMovieClick: () => void;
}

export function Header({ onAddMovieClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/80 backdrop-blur-lg">
      <div className="container flex h-16 max-w-7xl items-center">
        <div className="mr-4 flex items-center gap-3">
          <div className="bg-primary text-primary-foreground rounded-md p-2">
            <Play className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold">Streamlined</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button onClick={onAddMovieClick} className="hidden sm:inline-flex">
            <Plus className="mr-2 h-4 w-4" />
            Add Video
          </Button>
           <Button onClick={onAddMovieClick} size="icon" className="sm:hidden rounded-full">
            <Plus className="h-5 w-5" />
            <span className="sr-only">Add Video</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
