import { Skeleton } from './skeleton'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = { title: 'UI/Skeleton', component: Skeleton, args: { className: 'h-6 w-40' } } satisfies Meta<typeof Skeleton>
export default meta
type Story = StoryObj<typeof meta>
export const Loading: Story = {}
export const Card: Story = { args: { className: 'h-32 w-64' } }
