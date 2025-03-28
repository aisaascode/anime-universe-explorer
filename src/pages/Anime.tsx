
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Play, Star, Calendar, Clock, BookOpen, Share2, Heart, Plus, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { animes } from '@/lib/data';
import AnimeCard from '@/components/AnimeCard';
import { motion } from 'framer-motion';

const Anime = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandDescription, setExpandDescription] = useState(false);
  
  const anime = animes.find(a => a.id === id);
  
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
  
  // Get recommended animes (same genres)
  const recommendedAnimes = animes
    .filter(a => a.id !== anime.id && a.genre.some(g => anime.genre.includes(g)))
    .slice(0, 6);
  
  // Create episodes data
  const seasons = [
    {
      name: "Season 1",
      episodes: Array.from({ length: 12 }, (_, i) => ({
        number: i + 1,
        title: `Episode ${i + 1}`,
        duration: "24 min",
        thumbnail: anime.image,
      })),
    },
    {
      name: "Season 2",
      episodes: Array.from({ length: 10 }, (_, i) => ({
        number: i + 1,
        title: `Episode ${i + 1}`,
        duration: "24 min",
        thumbnail: anime.image,
      })),
    },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Banner */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={anime.image} 
            alt={anime.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/30" />
        </div>
      </div>
      
      {/* Content */}
      <div className="container relative -mt-32 z-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Poster */}
          <div className="md:col-span-3">
            <motion.div 
              className="overflow-hidden rounded-lg shadow-lg aspect-[2/3]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={anime.image} 
                alt={anime.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="mt-4 space-y-3">
              <Button className="w-full bg-anime-purple hover:bg-anime-purple/90">
                <Play className="mr-2 h-4 w-4" />
                Watch Now
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <Heart className="mr-2 h-4 w-4" />
                  Favorite
                </Button>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Watchlist
                </Button>
              </div>
              
              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
          
          {/* Details */}
          <div className="md:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {anime.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1 fill-yellow-500" />
                  <span className="font-medium">{anime.rating}/10</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-muted-foreground">{anime.year}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-muted-foreground">24 min/ep</span>
                </div>
                
                <div className="flex items-center">
                  <Film className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-muted-foreground">TV Series</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {anime.genre.map((genre, i) => (
                  <Badge key={i} variant="secondary" className="rounded-full">
                    {genre}
                  </Badge>
                ))}
              </div>
            </motion.div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="episodes">Episodes</TabsTrigger>
                <TabsTrigger value="characters">Characters</TabsTrigger>
                <TabsTrigger value="related">Related</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="prose dark:prose-invert max-w-none mb-8">
                  <h3 className="text-xl font-medium mb-4">Synopsis</h3>
                  <div className={`relative ${!expandDescription && "max-h-32 overflow-hidden"}`}>
                    <p className="text-muted-foreground leading-relaxed">
                      {anime.description}
                      {anime.description}
                      {anime.description}
                    </p>
                    
                    {!expandDescription && (
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setExpandDescription(!expandDescription)}
                    className="text-anime-purple hover:text-anime-purple/90 text-sm font-medium mt-2"
                  >
                    {expandDescription ? "Read Less" : "Read More"}
                  </button>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-medium mb-4">Recommended</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {recommendedAnimes.map((anime) => (
                      <AnimeCard
                        key={anime.id}
                        id={anime.id}
                        title={anime.title}
                        image={anime.image}
                        rating={anime.rating}
                        year={anime.year}
                        genre={anime.genre}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="episodes">
                <div className="space-y-8">
                  {seasons.map((season, seasonIndex) => (
                    <div key={seasonIndex}>
                      <h3 className="text-xl font-medium mb-4">{season.name}</h3>
                      <div className="space-y-4">
                        {season.episodes.map((episode, episodeIndex) => (
                          <div 
                            key={episodeIndex}
                            className="flex flex-col sm:flex-row items-start sm:items-center border border-border rounded-lg overflow-hidden hover:bg-muted/50 transition-colors"
                          >
                            <Link to={`/watch/${id}/${seasonIndex + 1}/${episode.number}`} className="w-full sm:w-1/4 aspect-video sm:aspect-[16/9] relative group">
                              <img src={episode.thumbnail} alt={episode.title} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Play className="text-white h-8 w-8" />
                              </div>
                            </Link>
                            
                            <div className="p-4 flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between w-full">
                              <div>
                                <div className="flex items-center">
                                  <span className="font-medium text-muted-foreground mr-2">EP {episode.number}</span>
                                  <h4 className="font-medium">{episode.title}</h4>
                                </div>
                                <span className="text-sm text-muted-foreground">{episode.duration}</span>
                              </div>
                              
                              <Link 
                                to={`/watch/${id}/${seasonIndex + 1}/${episode.number}`}
                                className="mt-2 sm:mt-0 bg-anime-purple hover:bg-anime-purple/90 text-white px-4 py-2 rounded-md text-sm font-medium"
                              >
                                Watch
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="characters">
                <div className="text-center py-10">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Characters Coming Soon</h3>
                  <p className="text-muted-foreground">
                    We're working on adding character information to this anime.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="related">
                <div className="text-center py-10">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Related Anime Coming Soon</h3>
                  <p className="text-muted-foreground">
                    We're working on adding related anime information.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anime;
