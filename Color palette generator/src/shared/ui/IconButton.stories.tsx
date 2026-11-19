import type { Meta, StoryObj } from '@storybook/react'
import { Copy } from 'lucide-react'

import { IconButton } from './IconButton'
const meta = { title: 'UI/IconButton', component: IconButton, args: { children: <Copy size={17} />, 'aria-label': 'Copy' } } satisfies Meta<typeof IconButton>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
