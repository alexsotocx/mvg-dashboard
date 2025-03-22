import { DepartureRow } from './departure-row'

interface Departure {
  identifier: string
  destination: string
  departureTime: string
}

interface DeparturesTableProps {
  departures: Departure[]
}

export function DeparturesTable({ departures }: DeparturesTableProps) {
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
              Departure
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {departures.map((departure) => (
            <DepartureRow
              key={`${departure.identifier}-${departure.departureTime}`}
              {...departure}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
