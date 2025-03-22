interface DepartureRowProps {
  identifier: string
  destination: string
  departureTime: string
}

export function DepartureRow({ identifier, destination, departureTime }: DepartureRowProps) {
  const testIdSuffix = `${identifier}-${departureTime}`
  
  return (
    <tr 
      className="border-b border-gray-200 hover:bg-gray-50" 
      data-testid={`departure-row-${testIdSuffix}`}
    >
      <td 
        className="py-4 px-6 font-medium" 
        data-testid={`departure-identifier-${testIdSuffix}`}
      >
        {identifier}
      </td>
      <td 
        className="py-4 px-6" 
        data-testid={`departure-destination-${testIdSuffix}`}
      >
        {destination}
      </td>
      <td 
        className="py-4 px-6 text-right" 
        data-testid={`departure-time-${testIdSuffix}`}
      >
        {departureTime}
      </td>
    </tr>
  )
}
