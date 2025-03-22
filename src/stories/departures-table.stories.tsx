import type { Meta, StoryObj } from '@storybook/react';
import { DeparturesTable } from '../components/departures/departures-table';

const meta = {
  title: 'Components/DeparturesTable',
  component: DeparturesTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DeparturesTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockDepartures = [
  {
    identifier: 'U3',
    destination: 'Moosach',
    departureTime: new Date('2024-03-15T14:30:00'),
  },
  {
    identifier: 'S1',
    destination: 'München Flughafen Terminal',
    departureTime: new Date('2024-03-15T14:35:00'),
  },
  {
    identifier: 'Bus 100',
    destination: 'Ostbahnhof',
    departureTime: new Date('2024-03-15T14:40:00'),
  },
];

export const Default: Story = {
  args: {
    departures: mockDepartures,
  },
};

export const EmptyTable: Story = {
  args: {
    departures: [],
  },
};
