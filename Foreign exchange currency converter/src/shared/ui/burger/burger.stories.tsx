import { useState } from 'react'

import { Burger } from './burger'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = { title: 'UI/Burger', component: Burger, render: function Render() { const [open, setOpen] = useState(false); return <Burger open={open} onClick={() => setOpen(!open)} /> } } satisfies Meta<typeof Burger>
export default meta
type Story = StoryObj<typeof meta>
export const Interactive: Story = {}
