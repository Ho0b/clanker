import { useState } from 'react'
import { motion } from "motion/react"
import { Canvas, useFrame } from '@react-three/fiber'
import './App.css'
import { animate } from 'motion'

function InputBox(){

  const ease = {
    duration: 2,
    ease: [0, 0.75, 0.2, 1]
  }

  return(
    <motion.div id='inputContainer'
      initial={{scale:0, opacity:0, y:128}}
      animate={{scale:1, opacity:1, y:0}}
      transition={ease}
    >
      <input placeholder='Type Insult'>
    
      </input>
    </motion.div>
    
  )
}

function Robot(){
  return(
    <mesh>
      <boxGeometry args={[2, 2, 2]}/>
      <meshStandardMaterial />
    </mesh>
  )
}

function RenderCanvas(){
  return(
    <Canvas>
      <directionalLight intensity={1} color="white" position={[2,1,2]}/>
      <Robot/>
    </Canvas>
  )
}

function App() {
  return (
    <>
    <RenderCanvas/>
    <InputBox/>
    </>
  )
}

export default App
