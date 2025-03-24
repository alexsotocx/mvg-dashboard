import { useState, useMemo, useEffect } from 'react';
import { useAllStations } from '../../api/mvg/mvg-api';
import Fuse from 'fuse.js';

interface FavoriteStation {
  stationId: string;
  name: string;
}

interface StationSelectorProps {
  onSaveStations?: (station: FavoriteStation) => void;
}

interface StationSearchResultProps {
  station: {
    id: string;
    name: string;
  };
  onAddToFavorites: (stationId: string, name: string) => void;
}

function StationSearchResult({ station, onAddToFavorites }: StationSearchResultProps) {
  return (
    <div 
      className="flex justify-between items-center p-2 border-b hover:bg-gray-100 cursor-pointer"
      onClick={() => onAddToFavorites(station.id, station.name)}
      data-testid={`station-${station.name.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <span>{station.name}</span>
    </div>
  );
}

export function StationSelector({ onSaveStations }: StationSelectorProps) {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredStations, setFilteredStations] = useState<Array<{id: string, name: string}>>([]);
  const { data: stations, isLoading, error } = useAllStations();
  
  // Create a memoized Fuse instance when stations change
  const fuseInstance = useMemo(() => {
    if (!stations) return null;
    
    // Configure Fuse with our search options
    return new Fuse(stations, {
      keys: ['name'],
      threshold: 0.3, // Lower threshold = more strict matching
      location: 0,
      distance: 100, // Allow more errors for longer strings
      minMatchCharLength: 2,
      shouldSort: true, // Sort by score
    });
  }, [stations]);
  
  const handleSearch = () => {
    if (!searchText.trim() || searchText.trim().length < 3 || !fuseInstance) {
      setFilteredStations([]);
      return;
    }

    const searchResults = fuseInstance.search(searchText, { limit: 10 });
    
    const matchedStations = searchResults.map(result => result.item);
    setFilteredStations(matchedStations);
  };

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  const handleAddToFavorites = (stationId: string, name: string) => {
    if (onSaveStations) {
      const newFavorite: FavoriteStation = {
        stationId,
        name,
      };
      onSaveStations(newFavorite);
      
      setSearchText('');
      setFilteredStations([]);
    }
  };

  if (isLoading) return <div className="p-4">Loading stations...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading stations</div>;

  return (
    <div className="p-4 border rounded shadow-sm">
      <div>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Type at least 3 characters to search for stations..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          data-testid="station-search-input"
        />
      </div>
      
      {filteredStations.length > 0 && (
        <div className="mt-3 border rounded max-h-60 overflow-y-auto">
          {filteredStations.map(station => (
            <StationSearchResult
              key={station.id}
              station={station}
              onAddToFavorites={handleAddToFavorites}
            />
          ))}
        </div>
      )}
      
      {searchText.length >= 3 && filteredStations.length === 0 && (
        <div className="mt-2 text-sm text-gray-500">
          No stations found matching your search
        </div>
      )}
    </div>
  );
}
