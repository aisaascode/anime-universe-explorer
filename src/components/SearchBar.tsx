
import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { animes } from "@/lib/data";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof animes>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 100);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      const filtered = animes.filter((anime) =>
        anime.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSelectAnime = (id: string) => {
    navigate(`/anime/${id}`);
    clearSearch();
    setIsExpanded(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center">
        {isExpanded ? (
          <div className="relative flex items-center md:w-64">
            <Input
              id="search-input"
              type="text"
              placeholder="Search animes..."
              className="pl-8 pr-8 py-2 w-full"
              value={searchQuery}
              onChange={handleSearch}
            />
            <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-2 hover:text-muted-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={toggleSearch}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {searchQuery.length > 1 && searchResults.length > 0 && isExpanded && (
        <div className="absolute top-full mt-1 w-full bg-background border border-border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          {searchResults.map((anime) => (
            <div
              key={anime.id}
              className="flex items-center p-2 hover:bg-muted cursor-pointer"
              onClick={() => handleSelectAnime(anime.id)}
            >
              <img
                src={anime.image}
                alt={anime.title}
                className="h-12 w-8 object-cover rounded"
              />
              <div className="ml-2">
                <p className="text-sm font-medium">{anime.title}</p>
                <p className="text-xs text-muted-foreground">{anime.year}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {searchQuery.length > 1 && searchResults.length === 0 && isExpanded && (
        <div className="absolute top-full mt-1 w-full bg-background border border-border rounded-md shadow-lg z-50 p-4 text-center">
          <p className="text-muted-foreground">No results found</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
