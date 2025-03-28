
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";
import SearchBar from "@/components/SearchBar";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const genres = [
    "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi", "Slice of Life"
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-anime-purple mr-2">All</span>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-anime-red to-anime-purple">Animes</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-anime-purple transition-colors duration-200">
              Home
            </Link>
            <div className="relative group">
              <button className="text-foreground hover:text-anime-purple transition-colors duration-200">
                Genres
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="grid grid-cols-2 p-3 gap-2">
                  {genres.map((genre) => (
                    <Link 
                      key={genre} 
                      to={`/genre/${genre.toLowerCase()}`}
                      className="text-sm text-foreground hover:text-anime-purple"
                    >
                      {genre}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/popular" className="text-foreground hover:text-anime-purple transition-colors duration-200">
              Popular
            </Link>
            <Link to="/new" className="text-foreground hover:text-anime-purple transition-colors duration-200">
              New Releases
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            <ThemeToggle />
            {isLoggedIn ? (
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            ) : (
              <Button className="bg-anime-purple hover:bg-anime-purple/90">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-3">
            <SearchBar />
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-screen" : "max-h-0"
          )}
        >
          <div className="flex flex-col space-y-3 pt-4 pb-2">
            <Link
              to="/"
              className="text-foreground hover:text-anime-purple py-2 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <div className="border-t border-border py-3">
              <p className="text-sm text-muted-foreground mb-2">Genres</p>
              <div className="grid grid-cols-2 gap-2">
                {genres.map((genre) => (
                  <Link
                    key={genre}
                    to={`/genre/${genre.toLowerCase()}`}
                    className="text-sm text-foreground hover:text-anime-purple py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/popular"
              className="text-foreground hover:text-anime-purple py-2 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Popular
            </Link>
            <Link
              to="/new"
              className="text-foreground hover:text-anime-purple py-2 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              New Releases
            </Link>
            
            <div className="border-t border-border py-3">
              {isLoggedIn ? (
                <Link
                  to="/profile"
                  className="text-foreground hover:text-anime-purple py-2 transition-colors duration-200 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </Link>
              ) : (
                <Button className="w-full bg-anime-purple hover:bg-anime-purple/90">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
