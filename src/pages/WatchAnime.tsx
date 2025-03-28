
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import VideoPlayer from '@/components/VideoPlayer';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, List } from 'lucide-react';
import { animes } from '@/lib/data';

const WatchAnime = () => {
  const { id, season = "1", episode = "1" } = useParams<{ id: string; season: string; episode: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const anime = animes.find(a => a.id === id);
  
  const seasonNum = parseInt(season);
  const episodeNum = parseInt(episode);
  
  // Create episodes data based on seasonNum
  const maxEpisodes = seasonNum === 1 ? 12 : 10;
  const episodes = Array.from({ length: maxEpisodes }, (_, i) => ({
    number: i + 1,
    title: `Episode ${i + 1}`,
  }));

  useEffect(() => {
    // Simulate loading video
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [id, season, episode]);

  if (!anime) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Anime not found</h1>
          <p className="text-muted-foreground mb-6">The anime you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Go Back Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const goToNextEpisode = () => {
    if (episodeNum < maxEpisodes) {
      navigate(`/watch/${id}/${seasonNum}/${episodeNum + 1}`);
    } else if (seasonNum === 1) {
      navigate(`/watch/${id}/2/1`);
    }
  };

  const goToPreviousEpisode = () => {
    if (episodeNum > 1) {
      navigate(`/watch/${id}/${seasonNum}/${episodeNum - 1}`);
    } else if (seasonNum === 2) {
      navigate(`/watch/${id}/1/12`);
    }
  };

  const episodeTitle = `Season ${seasonNum}, Episode ${episodeNum}: ${episodes[episodeNum - 1]?.title}`;

  return (
    <div className="min-h-screen bg-anime-dark">
      <Navbar />
      
      <div className="container py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="aspect-video bg-card animate-pulse flex items-center justify-center">
                <div className="text-muted-foreground">Loading video...</div>
              </div>
            ) : (
              <VideoPlayer 
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                poster={anime.image}
                title={episodeTitle}
              />
            )}
            
            <div className="mt-4">
              <h1 className="text-xl font-bold mb-1">{anime.title}</h1>
              <h2 className="text-muted-foreground mb-4">{episodeTitle}</h2>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={goToPreviousEpisode}
                  disabled={seasonNum === 1 && episodeNum === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <Button
                  variant="outline"
                  onClick={goToNextEpisode}
                  disabled={seasonNum === 2 && episodeNum === maxEpisodes}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
                
                <Button asChild variant="outline">
                  <Link to={`/anime/${id}`}>
                    <List className="h-4 w-4 mr-2" />
                    All Episodes
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-6 p-4 border border-border rounded-lg">
              <h3 className="font-medium mb-2">Synopsis</h3>
              <p className="text-muted-foreground">{anime.description}</p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/4">
            <div className="bg-card rounded-lg overflow-hidden border border-border">
              <div className="p-4 border-b border-border">
                <h3 className="font-bold">Season {seasonNum} Episodes</h3>
              </div>
              
              <div className="p-2 max-h-[60vh] overflow-y-auto">
                {episodes.map((ep) => (
                  <Link
                    key={ep.number}
                    to={`/watch/${id}/${seasonNum}/${ep.number}`}
                    className={`flex items-center p-2 rounded-md ${
                      episodeNum === ep.number
                        ? "bg-anime-purple/20 text-anime-purple"
                        : "hover:bg-muted transition-colors"
                    }`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-muted rounded-md mr-3">
                      {ep.number}
                    </div>
                    <div>
                      <div className="font-medium">{ep.title}</div>
                      <div className="text-xs text-muted-foreground">24 min</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchAnime;
