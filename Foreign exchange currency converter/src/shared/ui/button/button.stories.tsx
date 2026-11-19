import { Button } from './button'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = { title: 'UI/Button', component: Button, args: { children: 'Continue' }, argTypes: { variant: { control: 'select' }, size: { control: 'select' } } } satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = { args: { variant: 'primary' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Disabled: Story = { args: { disabled: true } }
