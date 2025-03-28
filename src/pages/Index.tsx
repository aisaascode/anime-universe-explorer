
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/Hero';
import AnimeGrid from '@/components/AnimeGrid';
import { animes } from '@/lib/data';
import { motion } from 'framer-motion';

const Index = () => {
  // Get a featured anime for the hero
  const featuredAnime = {
    id: animes[0].id,
    title: animes[0].title,
    image: animes[0].image,
    description: animes[0].description,
    year: animes[0].year,
    rating: animes[0].rating,
    genres: animes[0].genre,
  };

  // Get trending animes
  const trendingAnimes = animes.slice(0, 12);
  
  // Get new releases
  const newReleases = [...animes].sort((a, b) => parseInt(b.year) - parseInt(a.year)).slice(0, 12);
  
  // Get popular animes
  const popularAnimes = [...animes].sort((a, b) => b.rating - a.rating).slice(0, 12);

  // Get animes by genre (Action)
  const actionAnimes = animes.filter(anime => anime.genre.includes("Action")).slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main>
        <Hero featuredAnime={featuredAnime} />
        
        <AnimeGrid title="Trending Now" animes={trendingAnimes} />
        
        <AnimeGrid title="New Releases" animes={newReleases} />
        
        <AnimeGrid title="Popular Animes" animes={popularAnimes} />
        
        <AnimeGrid title="Action Animes" animes={actionAnimes} />
        
        <motion.section
          className="py-16 container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-anime-purple/10 backdrop-blur-sm border border-anime-purple/20 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Anime Community</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Sign up to keep track of your favorite animes, create watchlists, and get personalized recommendations.
            </p>
            <button className="bg-anime-purple hover:bg-anime-purple/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Sign Up Now
            </button>
          </div>
        </motion.section>
      </main>
      
      <footer className="bg-background border-t border-border py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <span className="text-xl font-bold text-anime-purple mr-2">All</span>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-anime-red to-anime-purple">Animes</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Your ultimate anime streaming platform
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-medium mb-2">Browse</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Popular</li>
                  <li>New Releases</li>
                  <li>Genres</li>
                  <li>Studios</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Help</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>FAQ</li>
                  <li>Contact Us</li>
                  <li>Terms of Service</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} All Animes. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
