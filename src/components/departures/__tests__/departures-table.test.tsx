import { render, screen } from '@testing-library/react'
import { DeparturesTable } from '../departures-table'
import { describe, expect, it } from 'vitest'
import { Departure } from '../types'

describe('DeparturesTable', () => {
  const mockDepartures: Departure[] = [{
    identifier: 'S1',
    destination: 'Munich Airport',
    departureTime: new Date('2025-01-01T10:00:00')
  }]

  it('renders departures table with correct data', () => {
    render(<DeparturesTable departures={mockDepartures} />)

    // Verify table exists
    expect(screen.getByTestId('departures-table')).toBeInTheDocument()

    // Verify row data with unique identifier
    const row = screen.getByTestId('departure-row-S1-10:00')
    expect(row).toBeInTheDocument()

    // Verify individual cells with unique identifiers
    expect(screen.getByTestId('departure-identifier-S1-10:00')).toHaveTextContent('S1')
    expect(screen.getByTestId('departure-destination-S1-10:00')).toHaveTextContent('Munich Airport')
    expect(screen.getByTestId('departure-time-S1-10:00')).toHaveTextContent('10:00')
  })
})
