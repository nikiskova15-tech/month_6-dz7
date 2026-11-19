import { cn } from '@/shared/lib'

import { Popover } from './popover'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = { title: 'UI/Popover', component: Popover, args: { trigger: <span className={cn('rounded-lg bg-slate-800 px-3 py-2')}>Options</span>, children: <p className={cn('text-sm')}>Popover content</p> } } satisfies Meta<typeof Popover>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}

