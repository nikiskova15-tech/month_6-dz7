import type { Meta, StoryObj } from '@storybook/react'

import { SegmentedControl } from './SegmentedControl'
const meta = { title: 'UI/SegmentedControl', component: SegmentedControl, args: { value: 'palette', label: 'Mode', options: [{ value: 'palette', label: 'Palette' }, { value: 'preview', label: 'Preview' }], onChange: () => undefined } } satisfies Meta<typeof SegmentedControl>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
