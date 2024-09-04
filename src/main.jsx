import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </StrictMode>
)
