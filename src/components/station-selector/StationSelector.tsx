import { useState, useMemo } from 'react';
import { useAllStations } from '../../api/mvg/mvg-api';

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
    <div className="flex justify-between items-center p-2 border-b">
      <span>{station.name}</span>
      <button 
        className="px-3 py-1 text-white text-sm bg-blue-500 rounded hover:bg-blue-600"
        onClick={() => onAddToFavorites(station.id, station.name)}
        data-testid={`add-station-${station.name.replace(/\s+/g, '-').toLowerCase()}`}
      >
        Add
      </button>
    </div>
  );
}

export function StationSelector({ onSaveStations }: StationSelectorProps) {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredStations, setFilteredStations] = useState<Array<{id: string, name: string}>>([]);
  const { data: stations, isLoading, error } = useAllStations();
  
  const sortedStations = useMemo(() => {
    if (!stations) return [];
    return [...stations].sort((a, b) => a.name.localeCompare(b.name));
  }, [stations]);

  const handleSearch = () => {
    if (!searchText.trim() || !sortedStations.length) {
      setFilteredStations([]);
      return;
    }

    const searchLower = searchText.toLowerCase();
    const matches = sortedStations
      .filter(station => station.name.toLowerCase().startsWith(searchLower))
      .slice(0, 20);
    
    setFilteredStations(matches);
  };

  const handleAddToFavorites = (stationId: string, name: string) => {
    if (onSaveStations) {
      const newFavorite: FavoriteStation = {
        stationId,
        name,
      };
      onSaveStations(newFavorite);
    }
  };

  if (isLoading) return <div className="p-4">Loading stations...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading stations</div>;

  return (
    <div className="p-4 border rounded shadow-sm">
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Search for a station..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          data-testid="station-search-input"
        />
        <button 
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300"
          onClick={handleSearch}
          disabled={!searchText.trim()}
          data-testid="station-search-button"
        >
          Search
        </button>
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
      
      {searchText && filteredStations.length === 0 && (
        <div className="mt-2 text-sm text-gray-500">
          No stations found matching your search
        </div>
      )}
    </div>
  );
}
