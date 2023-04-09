import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import './App.css'
import Three from './Components/three'

function App() {

  return (
    <div className='App'>
      <Canvas shadows>
        <Suspense>
          <Three />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
