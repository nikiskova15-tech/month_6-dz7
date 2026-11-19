import { Badge } from './badge'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = { title: 'UI/Badge', component: Badge, args: { children: 'Live' } } satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Positive: Story = { args: { className: 'border-emerald-700 bg-emerald-500/10 text-emerald-300' } }
