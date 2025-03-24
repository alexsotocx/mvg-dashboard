import type { Meta, StoryObj } from '@storybook/react';
import { DepartureRow } from '../components/departures/departure-row';

const meta = {
  title: 'Components/DepartureRow',
  component: DepartureRow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DepartureRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    identifier: 'U3',
    destination: 'Moosach',
    departureTime: new Date('2024-03-15T14:30:00'),
    showAbsoluteTime: false,
  },
  decorators: [
    (Story) => (
      <table>
        <tbody>
          <Story />
        </tbody>
      </table>
    ),
  ],
};