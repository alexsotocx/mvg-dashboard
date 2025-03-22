import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { getMinutesUntil } from './time'

describe('time utils', () => {
  beforeEach(() => {
    // Mock current date to ensure consistent test results
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-01T12:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('getMinutesUntil', () => {
    it('should return correct minutes for future time', () => {
      const futureDate = new Date('2024-01-01T12:30:00') // 30 minutes in future
      expect(getMinutesUntil(futureDate)).toBe(30)
    })

    it('should return negative minutes for past time', () => {
      const pastDate = new Date('2024-01-01T11:45:00') // 15 minutes in past
      expect(getMinutesUntil(pastDate)).toBe(-15)
    })

    it('should round to nearest minute', () => {
      const dateWith30Seconds = new Date('2024-01-01T12:02:30') // 2.5 minutes in future
      expect(getMinutesUntil(dateWith30Seconds)).toBe(3) // Should round to 3
    })
  })
})
