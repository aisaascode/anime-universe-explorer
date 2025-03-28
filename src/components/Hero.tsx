
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface HeroProps {
  featuredAnime: {
    id: string;
    title: string;
    image: string;
    description: string;
    year: string;
    rating: number;
    genres: string[];
  };
}

const Hero = ({ featuredAnime }: HeroProps) => {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={featuredAnime.image} 
          alt={featuredAnime.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="container relative h-full flex items-center z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {featuredAnime.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-yellow-400 font-medium">{featuredAnime.rating}/10</span>
              <span className="text-gray-300">{featuredAnime.year}</span>
              <div className="flex space-x-2">
                {featuredAnime.genres.slice(0, 2).map((genre, index) => (
                  <span key={index} className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 line-clamp-3 md:line-clamp-4">
              {featuredAnime.description}
            </p>
            
            <div className="flex space-x-4">
              <Button asChild className="bg-anime-purple hover:bg-anime-purple/90 text-white">
                <Link to={`/watch/${featuredAnime.id}/1/1`}>
                  <Play className="mr-2 h-4 w-4" />
                  Watch Now
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20">
                <Link to={`/anime/${featuredAnime.id}`}>
                  <Info className="mr-2 h-4 w-4" />
                  Details
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
