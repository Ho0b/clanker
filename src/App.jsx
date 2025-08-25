import { useRef, useState } from 'react'
import { color, motion } from "motion/react"
import { Canvas, useFrame } from '@react-three/fiber'
import validator from 'validator'
import './App.css'
import { animate } from 'motion'
import NavBar from './Nav'

export const easeTransition = {
    duration: 1,
    ease: ["backOut"]
  }

function InputBox(){

  let inputMessage = useRef()
  let [message, setMessage] = useState("")
  

  function cleanMessage(unsanitized){
    return(validator.escape(unsanitized))
  }
  
  function messageHandler(e){
    e.preventDefault()
    let cleaned = cleanMessage(message)

    console.log(cleaned)
    setMessage("")
  }

  return(
    <motion.div id='inputContainer'
      initial={{scale:0, opacity:0, y:-32}}
      animate={{scale:1, opacity:1, y:0}}
      transition={easeTransition}
    >
      <form onSubmit={messageHandler}>
      <input placeholder='Type Insult' value={message} onChange={e=>setMessage(e.target.value)} ref={inputMessage}></input>
      </form>
    </motion.div>
    
  )
}

function shapeSize(size){
  return ([size, size, size])
}

function Robot(){

  const [isHovering, setHovering] = useState(false)

  const robotMesh = useRef()
  useFrame((state, delta) => {robotMesh.current.rotation.z += delta*.3; robotMesh.current.rotation.y += delta*.025; })


  return(
    <mesh 
      position={[0, 0, 0]} 
      ref={robotMesh}
      onPointerOver={()=>{setHovering(true)}}
      onPointerOut={()=>{setHovering(false)}}
      >
      <octahedronGeometry args={isHovering ? shapeSize(2) : shapeSize(1)} />
      <meshStandardMaterial color={isHovering ? "green" : "#fff"}/>
    </mesh>
  )
}

function RenderCanvas(){
  return(
    <Canvas>
      <ambientLight intensity={3} position={[-1, -1, -1]} color={"blue"}/>
      <directionalLight intensity={2} color="green" position={[3,3,1]}/>
      <Robot/>
    </Canvas>
  )
}

function App() {
  return (
    <>
    <NavBar/>
    <RenderCanvas/>
    <InputBox/>
    </>
  )
}

export default App
