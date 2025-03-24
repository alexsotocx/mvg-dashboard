import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StationSelector } from '../StationSelector';
import { useAllStations } from '../../../api/mvg/mvg-api';

// Mock the API hook
vi.mock('../../../api/mvg/mvg-api', () => ({
  useAllStations: vi.fn()
}));

describe('StationSelector', () => {
  const mockStations = [
    { id: 'station1', name: 'Marienplatz' },
    { id: 'station2', name: 'Hauptbahnhof' },
    { id: 'station3', name: 'Münchner Freiheit' }
  ];

  const mockOnSaveStations = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAllStations as any).mockReturnValue({
      data: mockStations,
      isLoading: false,
      error: null
    });
  });

  it('renders the component correctly', () => {
    render(<StationSelector onSaveStations={mockOnSaveStations} />);
    expect(screen.getByTestId('station-search-input')).toBeInTheDocument();
    expect(screen.getByTestId('station-search-button')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    (useAllStations as any).mockReturnValue({
      data: null,
      isLoading: true,
      error: null
    });

    render(<StationSelector onSaveStations={mockOnSaveStations} />);
    expect(screen.getByText('Loading stations...')).toBeInTheDocument();
  });

  it('displays error state', () => {
    (useAllStations as any).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to load')
    });

    render(<StationSelector onSaveStations={mockOnSaveStations} />);
    expect(screen.getByText('Error loading stations')).toBeInTheDocument();
  });

  it('searches for stations and allows adding them to favorites', () => {
    render(<StationSelector onSaveStations={mockOnSaveStations} />);
    
    // Search for a station
    const searchInput = screen.getByTestId('station-search-input');
    fireEvent.change(searchInput, { target: { value: 'Marien' } });
    fireEvent.click(screen.getByTestId('station-search-button'));
    
    // Check if station is found and displayed
    expect(screen.getByText('Marienplatz')).toBeInTheDocument();
    
    // Add station to favorites
    fireEvent.click(screen.getByTestId('add-station-marienplatz'));
    
    // Verify onSaveStations was called with the right data
    expect(mockOnSaveStations).toHaveBeenCalledWith({
      stationId: 'station1', 
      name: 'Marienplatz'
    });
  });

  it('displays no results message when search yields no stations', () => {
    render(<StationSelector onSaveStations={mockOnSaveStations} />);
    
    // Search for a station that doesn't exist
    const searchInput = screen.getByTestId('station-search-input');
    fireEvent.change(searchInput, { target: { value: 'NonExistentStation' } });
    fireEvent.click(screen.getByTestId('station-search-button'));
    
    expect(screen.getByText('No stations found matching your search')).toBeInTheDocument();
  });

  it('enables search button only when text is entered', () => {
    render(<StationSelector onSaveStations={mockOnSaveStations} />);
    
    const searchButton = screen.getByTestId('station-search-button');
    expect(searchButton).toBeDisabled();
    
    const searchInput = screen.getByTestId('station-search-input');
    fireEvent.change(searchInput, { target: { value: 'M' } });
    
    expect(searchButton).not.toBeDisabled();
  });

  it('performs search when Enter key is pressed', () => {
    render(<StationSelector onSaveStations={mockOnSaveStations} />);
    
    const searchInput = screen.getByTestId('station-search-input');
    fireEvent.change(searchInput, { target: { value: 'Marien' } });
    fireEvent.keyDown(searchInput, { key: 'Enter' });
    
    expect(screen.getByText('Marienplatz')).toBeInTheDocument();
  });
});
