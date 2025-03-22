import { render, screen, fireEvent } from '@testing-library/react'
import { DeparturesTable } from '../departures-table'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

describe('DeparturesTable', () => {
  const fixedDate = new Date(2025, 0, 1, 8, 0, 0); // January 1, 2023, 8:00 AM

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(fixedDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function generateMockDepature() {
    return [{
      identifier: 'S1',
      destination: 'Munich Airport',
      departureTime: (() => {
        const date = new Date();
        date.setHours(8)
        date.setMinutes(20)
        return date
      })(),
    }]
  }


  it('renders departures table with correct data', () => {
    render(<DeparturesTable departures={generateMockDepature()} />)

    expect(screen.getByTestId('departures-table')).toBeInTheDocument()

    const row = screen.getByTestId('departure-row-S1-08:20')
    expect(row).toBeInTheDocument()

    expect(screen.getByTestId('departure-identifier-S1-08:20')).toHaveTextContent('S1')
    expect(screen.getByTestId('departure-destination-S1-08:20')).toHaveTextContent('Munich Airport')
    expect(screen.getByTestId('departure-time-S1-08:20')).toHaveTextContent('20 min')
  })

  it('toggles between relative and absolute time display', () => {
    render(<DeparturesTable
      departures={generateMockDepature()}
    />)

    expect(screen.getByTestId('departure-time-S1-08:20')).toHaveTextContent('20 min')

    const toggleButton = screen.getByTestId('toggle-time-button');
    fireEvent.click(toggleButton);

    expect(screen.getByTestId('departure-time-S1-08:20')).toHaveTextContent('08:20')
  })
})
