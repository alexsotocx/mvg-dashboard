import { useMemo, useState } from 'react'
import { StationSelector } from './components/station-selector/StationSelector'
import { DeparturesTable } from './components/departures/departures-table'
import { useDepartures } from './api/mvg/mvg-api'
import { Departure } from './components/departures/types';

interface FavoriteStation {
  stationId: string;
  name: string;
}

export function App() {
  const [favoriteStations, setFavoriteStations] = useState<FavoriteStation[]>([])
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleSaveStations = (stations: FavoriteStation[]) => {
    setFavoriteStations(stations)
    if (stations.length > 0 && !lastRefreshed) {
      setLastRefreshed(new Date())
    }
  }

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1)
    setLastRefreshed(new Date())
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">MVG Departure Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Your Stations</h2>
        <StationSelector onSaveStations={handleSaveStations} />
      </div>

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
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface StationDeparturesSectionProps {
  station: FavoriteStation;
}

function StationDeparturesSection({ station }: StationDeparturesSectionProps) {
  const { data: departures, isLoading, error } = useDepartures({
    stationId: station.stationId
  })

  const convertedDepartures: Departure[] = useMemo(() => {
    if (!departures) return []
    return departures.map(departure => ({
      identifier: departure.label,
      destination: departure.destination,
      departureTime: new Date(departure.plannedDepartureTime)
    }))
  }
    , [departures])

  return (
    <div className="mb-6" data-testid={`departures-section-${station.stationId}`}>
      <h3 className="text-lg font-medium mb-3">{station.name}</h3>

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
