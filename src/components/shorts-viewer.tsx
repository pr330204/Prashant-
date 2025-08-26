"use client";

import type { Movie } from "@/lib/types";
import { getYouTubeEmbedUrl } from "@/lib/utils";
import { Heart, MessageCircle, Send, MoreVertical, Music4 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface ShortsViewerProps {
  movies: Movie[];
}

export function ShortsViewer({ movies }: ShortsViewerProps) {

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
      {movies.map((movie) => (
        <div key={movie.id} className="h-full w-full snap-start relative flex items-center justify-center">
          <iframe
            src={`${getYouTubeEmbedUrl(movie.url)}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${getYouTubeVideoId(movie.url)}`}
            title={movie.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>

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

// Helper function to extract video ID, assuming it's also needed here.
// You can move this to utils if it's used in more places.
function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  let videoId: string | null = null;
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes('youtube.com')) {
      if (urlObj.pathname.startsWith('/embed/')) {
        videoId = urlObj.pathname.split('/')[2];
      } else {
        videoId = urlObj.searchParams.get('v');
      }
    }
  } catch (error) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    if (match) {
      videoId = match[1];
    }
  }
  return videoId;
}
