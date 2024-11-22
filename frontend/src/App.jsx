import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Tela from './Tela'
import { TelaProvider } from './Contexts/TelaContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <TelaProvider>
      <Tela />
    </TelaProvider>
  )
}

export default App
