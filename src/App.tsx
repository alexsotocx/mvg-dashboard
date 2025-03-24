import { useMemo, useState } from 'react'
import { useLocalStorage } from 'react-use';

import { StationSelector } from './components/station-selector/StationSelector'
import { DeparturesTable } from './components/departures/departures-table'
import { useDepartures } from './api/mvg/mvg-api'
import type { Departure } from './components/departures/types';

interface FavoriteStation {
  stationId: string;
  name: string;
}

export function App() {
  const [localStoredStations, setLocalStoredStations] = useLocalStorage<FavoriteStation[]>('mvg_saved_stations', []);
  const [favoriteStations, setFavoriteStations] = useState<FavoriteStation[]>(localStoredStations!)
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [transportationList, setTransportationList] = useLocalStorage<string[]>('mvg_transportation_list', [])

  const handleSaveStations = (station: FavoriteStation) => {
    const newFavorites =  [...favoriteStations, station];
    setFavoriteStations(newFavorites);
    setLocalStoredStations(newFavorites);

    if (newFavorites.length > 0 && !lastRefreshed) {
      setLastRefreshed(new Date())
    }
  }

  const handleRemoveStation = (stationId: string) => {
    const newFavorites = favoriteStations.filter(station => station.stationId !== stationId);
    setFavoriteStations(newFavorites);
    setLocalStoredStations(newFavorites);
  }

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1)
    setLastRefreshed(new Date())
  }

  const handleAddTransportation = (transport: string) => {
    if (transport.trim() !== '' && !transportationList?.includes(transport.trim())) {
      const newList = [...(transportationList || []), transport.trim()];
      setTransportationList(newList);
    }
  }

  const handleRemoveTransportation = (transport: string) => {
    const newList = transportationList?.filter(item => item !== transport) || [];
    setTransportationList(newList);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">MVG Departure Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Your Stations</h2>
        <StationSelector onSaveStations={handleSaveStations} />
      </div>

      <TransportationSelector 
        transportationList={transportationList || []} 
        onAddTransportation={handleAddTransportation} 
        onRemoveTransportation={handleRemoveTransportation}
      />

      {favoriteStations.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Departures 
              {lastRefreshed && <span className="text-sm font-normal ml-2 text-gray-500">{lastRefreshed.toISOString()}</span>}
            </h2>
            <button
              onClick={handleRefresh}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh All
            </button>
          </div>

          {favoriteStations.map(station => (
            <StationDeparturesSection
              key={`${station.stationId}-${refreshTrigger}`}
              station={station}
              onRemove={handleRemoveStation}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface TransportationSelectorProps {
  transportationList: string[];
  onAddTransportation: (transport: string) => void;
  onRemoveTransportation: (transport: string) => void;
}

function TransportationSelector({ 
  transportationList, 
  onAddTransportation, 
  onRemoveTransportation 
}: TransportationSelectorProps) {
  const [transportationInput, setTransportationInput] = useState('');
  
  const handleAddTransportation = () => {
    if (transportationInput.trim() !== '') {
      onAddTransportation(transportationInput);
      setTransportationInput('');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Transportation Types</h2>
      <div className="flex">
        <input
          type="text"
          value={transportationInput}
          onChange={e => setTransportationInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAddTransportation()}
          className="border border-gray-300 rounded-l px-3 py-2 flex-grow"
          placeholder="Add transportation type (e.g., S1, U3, Tram, Bus)"
        />
        <button
          onClick={handleAddTransportation}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        {transportationList.map(transport => (
          <div key={transport} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
            {transport}
            <button 
              onClick={() => onRemoveTransportation(transport)}
              className="ml-2 text-blue-500 hover:text-blue-700"
              aria-label={`Remove ${transport}`}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

interface StationDeparturesSectionProps {
  station: FavoriteStation;
  onRemove: (stationId: string) => void;
}

function StationDeparturesSection({ station, onRemove }: StationDeparturesSectionProps) {
  const { data: departures, isLoading, error } = useDepartures({
    stationId: station.stationId,
    limit: 20
  })

  const convertedDepartures: Departure[] = useMemo(() => {
    if (!departures) return []
    return departures.map(departure => ({
      identifier: departure.label,
      destination: departure.destination,
      departureTime: new Date(departure.realtimeDepartureTime)
    }))
  }
    , [departures])

  return (
    <div className="mb-6" data-testid={`departures-section-${station.stationId}`}>
      <div className="flex items-center mb-3">
        <h3 className="text-lg font-medium">{station.name}</h3>
        <button 
          onClick={() => onRemove(station.stationId)}
          className="ml-2 cursor-pointer hover:opacity-70"
          aria-label={`Remove ${station.name} from favorites`}
        >
          (x)
        </button>
      </div>

      {isLoading && (
        <div className="p-4 bg-gray-50 rounded">Loading departures...</div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded">
          Error loading departures for {station.name}
        </div>
      )}

      {departures && departures.length > 0 ? (
        <DeparturesTable departures={convertedDepartures} />
      ) : !isLoading && !error ? (
        <div className="p-4 bg-gray-50 rounded">No departures available</div>
      ) : null}
    </div>
  )
}
