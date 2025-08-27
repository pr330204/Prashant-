
"use client";

import type { Movie } from "@/lib/types";
import { Heart, MessageCircle, Send, MoreVertical, Music4, Volume2, VolumeX } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { YouTubePlayer } from "./youtube-player";
import { useRef, useState } from "react";

interface ShortsViewerProps {
  movies: Movie[];
}

export function ShortsViewer({ movies }: ShortsViewerProps) {
  const playerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (playerRef.current) {
      // @ts-ignore
      if (playerRef.current.isMuted()) {
        // @ts-ignore
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        // @ts-ignore
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };


  if (movies.length === 0) {
    return (
      <div className="flex flex-col h-full items-center justify-center rounded-lg bg-black text-center">
        <h3 className="text-lg font-semibold tracking-tight">No shorts found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Try a different search or add a new video under 5 minutes.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto snap-y snap-mandatory">
      {movies.map((movie, index) => (
        <div key={movie.id} className="h-full w-full snap-start relative flex items-center justify-center bg-black">
          <YouTubePlayer videoUrl={movie.url} playerRef={playerRef} />

          <div className="absolute top-4 right-4 z-20">
            <Button onClick={toggleMute} size="icon" variant="ghost" className="rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white">
              {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </Button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/60 to-transparent">
             <div className="flex items-end">
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-9 w-9 border-2 border-white">
                            <AvatarImage src={movie.channelThumbnailUrl} />
                            <AvatarFallback>{movie.channelTitle?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-sm">{movie.channelTitle}</span>
                        <Button size="sm" className="h-7 text-xs bg-white text-black font-bold rounded-lg hover:bg-white/90">Follow</Button>
                    </div>
                    <p className="text-sm line-clamp-2">{movie.title}</p>
                    <div className="flex items-center gap-2">
                        <Music4 className="h-4 w-4" />
                        <p className="text-xs truncate">Original audio - {movie.channelTitle}</p>
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                     <div className="flex flex-col items-center">
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20 hover:text-white">
                           <Heart className="h-7 w-7" />
                        </Button>
                        <span className="text-xs font-semibold">91.1k</span>
                     </div>
                     <div className="flex flex-col items-center">
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20 hover:text-white">
                           <MessageCircle className="h-7 w-7" />
                        </Button>
                        <span className="text-xs font-semibold">337</span>
                     </div>
                      <div className="flex flex-col items-center">
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20 hover:text-white">
                           <Send className="h-7 w-7" />
                        </Button>
                        <span className="text-xs font-semibold">5,857</span>
                     </div>
                     <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20 hover:text-white">
                        <MoreVertical className="h-7 w-7" />
                     </Button>
                      <Avatar className="h-10 w-10 border-2 border-white animate-spin-slow">
                        <AvatarImage src={movie.channelThumbnailUrl} />
                      </Avatar>
                </div>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
}
