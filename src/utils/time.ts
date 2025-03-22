export function getMinutesUntil(departureTime: Date): number {
  const now = new Date()
  const diffMs = departureTime.getTime() - now.getTime()
  return Math.round(diffMs / 60000) // Convert ms to minutes and round
}
