import { useRef, useState } from "react"
import { motion } from "motion/react"
import { easeTransition } from "./App"



function NavBar(){
    const themeButton = useRef()
    const [isClicked, setClicked] = useState(false)

    function handleButton(){
        if (isClicked){
            document.getElementById("themeButton").classList.replace("sun", "moon")
            document.body.classList.remove("light")
        }
        else if (!isClicked){
            document.getElementById("themeButton").classList.replace("moon", "sun")
            document.body.classList.add("light")
        }
        setClicked(!isClicked)
    }
    return(
        <motion.nav initial={{y:-48, opacity:0}} animate={{y:0, opacity:1}} transition={easeTransition}>
        <span><h1>CLANKER INSULTER</h1></span>
        <span><button ref={themeButton} aria-label="toggle theme" id="themeButton" className="moon" onClick={handleButton}></button></span>
        </motion.nav>
    )
}

export default NavBar