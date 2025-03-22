import type { Departure } from "./types"
import { getMinutesUntil } from "../../utils/time"

interface DepartureRowProps extends Departure {
  showAbsoluteTime: boolean
}

export function DepartureRow({ identifier, destination, departureTime, showAbsoluteTime }: DepartureRowProps) {
  const testIdTime = new Intl.DateTimeFormat('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(departureTime)

  const displayTime = showAbsoluteTime
    ? testIdTime
    : getMinutesUntil(departureTime)

  const postFixId = `${identifier}-${testIdTime}`;
  return (
    <tr
      className="border-b border-gray-200 hover:bg-gray-50"
      data-testid={`departure-row-${postFixId}`}
    >
      <td
        className="py-4 px-6 font-medium"
        data-testid={`departure-identifier-${postFixId}`}
      >
        {identifier}
      </td>
      <td
        className="py-4 px-6"
        data-testid={`departure-destination-${postFixId}`}
      >
        {destination}
      </td>
      <td
        className="py-4 px-6 text-right"
        data-testid={`departure-time-${postFixId}`}
      >
        {showAbsoluteTime ? displayTime : `${displayTime} min`}
      </td>
    </tr>
  )
}
