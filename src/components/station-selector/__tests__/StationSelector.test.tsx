import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StationSelector } from '../StationSelector';
import * as mvgApi from '../../../api/mvg/mvg-api';

vi.mock('../../../api/mvg/mvg-api');

interface MockUseAllStationsOptions {
  isLoading?: boolean;
  error?: Error | null;
  data?: any;
}

function setupUseAllStationsMock({
  isLoading = false,
  error = null,
  data = null
}: MockUseAllStationsOptions = {}) {
  return vi.spyOn(mvgApi, 'useAllStations').mockReturnValue({
    isLoading,
    error,
    data
  } as any);
}

describe('StationSelector', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('displays loading state when stations are being fetched', () => {
    setupUseAllStationsMock({ isLoading: true });

    render(<StationSelector />);

    expect(screen.getByText('Loading stations...')).toBeInTheDocument();
    expect(screen.queryByTestId('station-search-input')).not.toBeInTheDocument();
    expect(screen.queryByTestId('station-search-button')).not.toBeInTheDocument();
  });

  it('displays error message when stations fetch fails', () => {
    const testError = new Error('Failed to fetch stations');
    setupUseAllStationsMock({ error: testError });

    render(<StationSelector />);

    expect(screen.getByText('Error loading stations')).toBeInTheDocument();
    expect(screen.queryByTestId('station-search-input')).not.toBeInTheDocument();
    expect(screen.queryByTestId('station-search-button')).not.toBeInTheDocument();
  });

  it('filters stations based on search input', () => {
    const mockStations = [
      { id: '1', name: 'Station A' },
      { id: '2', name: 'Station B' },
      { id: '3', name: 'Station C' }
    ];

    setupUseAllStationsMock({ data: mockStations });

    render(<StationSelector />);

    expect(screen.queryByText('Station A')).not.toBeInTheDocument();
    expect(screen.queryByText('Station B')).not.toBeInTheDocument();
    expect(screen.queryByText('Station C')).not.toBeInTheDocument();

    const searchInput = screen.getByTestId('station-search-input');
    fireEvent.change(searchInput, { target: { value: 'Station B' } });

    const searchButton = screen.getByTestId('station-search-button');
    fireEvent.click(searchButton);

    expect(screen.getByText('Station B')).toBeInTheDocument();
    expect(screen.queryByText('Station A')).not.toBeInTheDocument();
    expect(screen.queryByText('Station C')).not.toBeInTheDocument();

    expect(screen.getByTestId('add-station-station-b')).toBeInTheDocument();
  });

  it('adds station to favorites when add button is clicked', () => {
    const mockStations = [
      { id: 'airport123', name: 'Airport' },
      { id: 'aubing456', name: 'Aubing' }
    ];

    setupUseAllStationsMock({ data: mockStations });

    const onSaveStationsMock = vi.fn();

    render(<StationSelector onSaveStations={onSaveStationsMock} />);

    const searchInput = screen.getByTestId('station-search-input');
    fireEvent.change(searchInput, { target: { value: 'Aub' } });

    const searchButton = screen.getByTestId('station-search-button');
    fireEvent.click(searchButton);

    expect(screen.getByText('Aubing')).toBeInTheDocument();
    expect(screen.queryByText('Airport')).not.toBeInTheDocument();

    const addButton = screen.getByTestId('add-station-aubing');
    fireEvent.click(addButton);

    expect(onSaveStationsMock).toHaveBeenCalledTimes(1);
    expect(onSaveStationsMock).toHaveBeenCalledWith([
      { stationId: 'aubing456', name: 'Aubing' }
    ]);

    expect(screen.getByText('1 station(s) added to favorites')).toBeInTheDocument();
  });
});
