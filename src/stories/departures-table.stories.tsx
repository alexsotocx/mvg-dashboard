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

const getMockDepartures = () => {
  const now = new Date();
  return [
    {
      identifier: 'U3',
      destination: 'Moosach',
      departureTime: new Date(now.getTime() + 20 * 60 * 1000), // 20 minutes from now
    },
    {
      identifier: 'S1',
      destination: 'München Flughafen Terminal',
      departureTime: new Date(now.getTime() + 40 * 60 * 1000), // 40 minutes from now
    },
    {
      identifier: 'Bus 100',
      destination: 'Ostbahnhof',
      departureTime: new Date(now.getTime() + 60 * 60 * 1000), // 60 minutes from now
    },
  ];
};

export const Default: Story = {
  args: {
    departures: getMockDepartures(),
  },
};

export const EmptyTable: Story = {
  args: {
    departures: [],
  },
};
