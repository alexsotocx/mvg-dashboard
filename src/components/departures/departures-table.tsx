import { useState } from 'react'
import { DepartureRow } from './departure-row'
import type { Departure } from './types'

interface DeparturesTableProps {
  departures: Departure[]
}

export function DeparturesTable({ departures }: DeparturesTableProps) {
  const [showAbsoluteTime, setShowAbsoluteTime] = useState(false)

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200" data-testid="departures-table">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Line
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Destination
            </th>
            <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center justify-end">
                <span 
                  onClick={() => setShowAbsoluteTime(!showAbsoluteTime)}
                  className="cursor-pointer hover:text-gray-800 flex items-center"
                  data-testid="toggle-time-button"
                >
                  Departure {showAbsoluteTime ? '(T)' : '(M)'}
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {departures.map((departure) => (
            <DepartureRow
              key={`${departure.identifier}-${departure.departureTime}`}
              showAbsoluteTime={showAbsoluteTime}
              {...departure}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
