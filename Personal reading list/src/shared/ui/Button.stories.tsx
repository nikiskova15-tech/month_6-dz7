import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './index'
const meta={title:'UI/Button',component:Button,args:{children:'Открыть книгу',className:'bg-amber-800 text-white'}} satisfies Meta<typeof Button>
export default meta
type Story=StoryObj<typeof meta>
export const Primary:Story={}
export const Quiet:Story={args:{children:'Подробнее',className:'bg-stone-100 text-stone-900'}}
