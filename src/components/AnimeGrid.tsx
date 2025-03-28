
import React from 'react';
import AnimeCard from '@/components/AnimeCard';
import { motion } from 'framer-motion';

interface AnimeGridProps {
  title: string;
  animes: Array<{
    id: string;
    title: string;
    image: string;
    rating: number;
    year: string;
    genre: string[];
  }>;
  featured?: boolean;
}

const AnimeGrid = ({ title, animes, featured = false }: AnimeGridProps) => {
  return (
    <section className="py-8">
      <div className="container">
        <motion.h2 
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {animes.map((anime, index) => (
            <motion.div
              key={anime.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * (index % 6) }}
            >
              <AnimeCard
                id={anime.id}
                title={anime.title}
                image={anime.image}
                rating={anime.rating}
                year={anime.year}
                genre={anime.genre}
                featured={featured && index === 0}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AnimeGrid;
