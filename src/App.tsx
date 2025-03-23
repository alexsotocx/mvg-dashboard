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

  const handleSaveStations = (stations: FavoriteStation[]) => {
    setFavoriteStations(stations)
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
          <h2 className="text-xl font-semibold">Departures</h2>

          {favoriteStations.map(station => (
            <StationDeparturesSection
              key={station.stationId}
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
