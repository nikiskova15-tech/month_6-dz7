import { cn } from '@/shared/lib'

import { Modal } from './modal'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = { title: 'UI/Modal', component: Modal, args: { open: true, title: 'Confirm action', onClose: () => undefined, children: <p className={cn('text-sm text-slate-300')}>Are you sure?</p> } } satisfies Meta<typeof Modal>
export default meta
type Story = StoryObj<typeof meta>
export const Open: Story = {}
export const Closed: Story = { args: { open: false } }

