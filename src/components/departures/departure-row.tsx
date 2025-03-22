import { Departure } from "./types"

export function DepartureRow({ identifier, destination, departureTime }: Departure) {
  const formattedTime = new Intl.DateTimeFormat('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(departureTime)
  
  return (
    <tr 
      className="border-b border-gray-200 hover:bg-gray-50" 
      data-testid={`departure-row-${identifier}-${formattedTime}`}
    >
      <td 
        className="py-4 px-6 font-medium" 
        data-testid={`departure-identifier-${identifier}-${formattedTime}`}
      >
        {identifier}
      </td>
      <td 
        className="py-4 px-6" 
        data-testid={`departure-destination-${identifier}-${formattedTime}`}
      >
        {destination}
      </td>
      <td 
        className="py-4 px-6 text-right" 
        data-testid={`departure-time-${identifier}-${formattedTime}`}
      >
        {formattedTime}
      </td>
    </tr>
  )
}
