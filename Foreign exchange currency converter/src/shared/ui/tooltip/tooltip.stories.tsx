import { Tooltip } from './tooltip'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = { title: 'UI/Tooltip', component: Tooltip, args: { content: 'Latest available rate', children: <button type="button">Hover or focus</button> } } satisfies Meta<typeof Tooltip>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
