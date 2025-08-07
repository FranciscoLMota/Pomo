import './App.css'
import { Navbar } from './features/Navbar'
import { Pomodoro } from './features/Pomodoro'

function App() {

  return (
    <div className="bg-onyx transition-all duration-500 font-russo flex flex-col h-screen" id="container">
      <Navbar />
      <Pomodoro />
    </div>
  )
}

export default App
