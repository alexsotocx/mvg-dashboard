import type { Meta, StoryObj } from '@storybook/react';
import { StationSelector } from './StationSelector';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock data for stations
const mockStations = [
  { id: 'de:09162:6', name: 'Marienplatz', place: 'München' },
  { id: 'de:09162:1', name: 'Hauptbahnhof', place: 'München' },
  { id: 'de:09162:3', name: 'Sendlinger Tor', place: 'München' },
  { id: 'de:09162:80', name: 'Karlsplatz (Stachus)', place: 'München' },
  { id: 'de:09162:18', name: 'Ostbahnhof', place: 'München' },
  { id: 'de:09162:25', name: 'Münchner Freiheit', place: 'München' },
  { id: 'de:09162:40', name: 'Odeonsplatz', place: 'München' },
];


// Create a function that returns a configured QueryClient with mocks
function createMockQueryClient(mockData = mockStations) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });
  
  queryClient.setQueryData(['stations'], mockData);
  
  return queryClient;
}

const meta: Meta<typeof StationSelector> = {
  title: 'Components/StationSelector',
  component: StationSelector,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story, context) => {
      // Set up the mock response based on the story parameters
      const stations = context.parameters.mockStations || mockStations;
      
      const queryClient = createMockQueryClient(stations);
      
      return (
        <QueryClientProvider client={queryClient}>
          <div className="w-[500px]">
            <Story />
          </div>
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof StationSelector>;

export const Default: Story = {
  args: {
    onSaveStations: (stations) => console.log('Saved stations:', stations),
  },
};

export const WithCustomMockData: Story = {
  args: {
    onSaveStations: (stations) => console.log('Saved stations:', stations),
  },
  parameters: {
    mockStations: [
      { id: 'de:09162:6', name: 'Marienplatz', place: 'München' },
      { id: 'de:09162:1', name: 'Hauptbahnhof', place: 'München' },
      { id: 'de:09162:3', name: 'Sendlinger Tor', place: 'München' },
    ],
  },
};
