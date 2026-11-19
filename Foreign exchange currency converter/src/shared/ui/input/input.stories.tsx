import { Input } from './input'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = { title: 'UI/Input', component: Input, args: { placeholder: 'Enter amount' } } satisfies Meta<typeof Input>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true, value: '100' } }
export const Invalid: Story = { args: { 'aria-invalid': true, value: '-1' } }
