import { Select } from './select'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = { title: 'UI/Select', component: Select, args: { children: <><option>USD</option><option>EUR</option></> } } satisfies Meta<typeof Select>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
