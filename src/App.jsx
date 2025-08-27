import { useRef, useState } from 'react'
import { color, motion , AnimatePresence, scale, number} from "motion/react"
import { Canvas, useFrame } from '@react-three/fiber'
import validator from 'validator'
import './App.css'
import NavBar from './Nav'
import { lerp } from 'three/src/math/MathUtils.js'

export const easeTransition = {
    duration: 1,
    ease: ["backOut"]
  }
export const easeTransition2 = {
    duration: 1.25,
    ease: ["backOut"]
  }

function InputBox({message, setMessage, isMessageRendered, setMessageRendered}){

    let inputMessage = useRef()
    const [inputValue, setInputValue] = useState("")
  
    function cleanMessage(unsanitized){
      return(validator.escape(unsanitized))
    }
  
    function messageHandler(e){
    e.preventDefault()
    let cleaned = cleanMessage(message)
    if(inputMessage.current === "") return

    console.log("working")
    setMessage(cleaned)
    setMessageRendered(true)
    setInputValue("")

    }
  return(
    <motion.div id='inputContainer'
      initial={{scaleY:0, opacity:0, y:-32}}
      animate={{scaleY:1, opacity:1, y:0}}
      transition={easeTransition}
    >
      <form onSubmit={messageHandler}>
      <input placeholder='give an insult' value={inputValue} onChange={e=>setInputValue(e.target.value)} ref={inputMessage}></input>
      </form>
    </motion.div>
    
  )
}

function shapeSize(size){
  return ([size, size, size])
}

function TextBubbleContainer({message, isMessageRendered, setMessageRendered}){

  function TextBox({text}){
    setTimeout(()=>{setMessageRendered(false)}, 3000)
    return(
        isMessageRendered ?
        <motion.li initial={{opacity:0, y:128}} animate={{opacity:1, y:0}} exit={{opacity:0}} transition={easeTransition} id='textBox'>
          {text}
        </motion.li> : <></>
    )
  }

  return(
    <ul id='textBubbleContainer'>
      <AnimatePresence>
        <TextBox text={message}/>
      </AnimatePresence>
    </ul>
  )
}

function Robot(){

  const [isHovering, setHovering] = useState(false)
  
  const robotMesh = useRef()
  useFrame((state, delta) => {;robotMesh.current.rotation.z += delta*.3; robotMesh.current.rotation.y += delta*.5; })


  return(
    <mesh 
      position={[0, 0, 0]} 
      ref={robotMesh}
      onPointerOver={()=>{setHovering(true)}}
      onPointerOut={()=>{setHovering(false)}}
      >
      <boxGeometry args={shapeSize(3)} />
      <meshStandardMaterial color={isHovering ? "red" : "blue"}/>
    </mesh>
  )
}

function RenderCanvas(){
  return(
    <Canvas>
      <ambientLight intensity={3} position={[-1, -1, -1]} color={"white"}/>
      <directionalLight intensity={2} color="white" position={[3,3,1]}/>
      <Robot/>
    </Canvas>
  )
}

function App() {

  let [message, setMessage] = useState("")
  let [isMessageRendered, setMessageRendered] = useState(false)

  return (
    <>
      <NavBar/>
      <RenderCanvas/>
      <TextBubbleContainer message={message} setMessage={setMessage} isMessageRendered={isMessageRendered} setMessageRendered={setMessageRendered}/>
      <InputBox message={message} setMessage={setMessage} isMessageRendered={isMessageRendered} setMessageRendered={setMessageRendered}/>
    </>
  )
}

export default App
