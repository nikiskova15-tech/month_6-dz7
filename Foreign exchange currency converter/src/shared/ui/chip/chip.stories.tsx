import { Chip } from './chip'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = { title: 'UI/Chip', component: Chip, args: { children: 'USD / EUR' } } satisfies Meta<typeof Chip>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Removable: Story = { args: { removable: true } }
