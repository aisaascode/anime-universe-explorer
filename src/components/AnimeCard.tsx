
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimeCardProps {
  id: string;
  title: string;
  image: string;
  rating: number;
  year: string;
  genre: string[];
  featured?: boolean;
}

const AnimeCard = ({ id, title, image, rating, year, genre, featured = false }: AnimeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-lg bg-black/20 shadow-md transition-all duration-300 group',
        featured ? 'md:col-span-2' : '',
        isHovered ? 'z-10 shadow-xl' : 'z-0'
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        y: -5, 
        transition: { duration: 0.2 } 
      }}
    >
      <Link to={`/anime/${id}`} className="block relative aspect-[2/3]">
        <img
          src={image}
          alt={title}
          className={cn(
            'w-full h-full object-cover transition-transform duration-500',
            isHovered ? 'scale-110' : 'scale-100'
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70" />
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 flex items-center bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="h-3 w-3 text-yellow-500 mr-1" />
          <span className="text-xs font-medium text-white">{rating}</span>
        </div>
        
        {/* Play Button */}
        <div className={cn(
          'absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300',
          isHovered ? 'opacity-100' : ''
        )}>
          <div className="bg-anime-purple rounded-full p-3 shadow-lg transform transition-transform duration-300 hover:scale-110">
            <Play className="h-6 w-6 text-white" fill="white" />
          </div>
        </div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-medium line-clamp-1 mb-1">{title}</h3>
          <div className="flex items-center justify-between text-xs text-white/80">
            <span>{year}</span>
            <span className="line-clamp-1">{genre[0]}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AnimeCard;
