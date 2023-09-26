import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'box-icon': BoxIconProps;
    }
  }
}

interface BoxIconProps {
  type?: string;
  name: string;
  color?: string;
  size?: string;
  rotate?: string;
  flip?: string;
  border?: string;
  animation?: string;
  pull?: string;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>,
)
