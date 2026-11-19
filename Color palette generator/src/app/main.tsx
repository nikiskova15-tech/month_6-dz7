import React from 'react'
import ReactDOM from 'react-dom/client'

import { ToastProvider } from './ToastProvider'

import { GeneratorPage } from '@/pages/generator'
import './styles.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root was not found')
ReactDOM.createRoot(root).render(<React.StrictMode><ToastProvider /><GeneratorPage /></React.StrictMode>)
