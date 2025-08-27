import { useRef, useState } from "react"
import { motion } from "motion/react"
import { easeTransition, easeTransition2 } from "./App"



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
        <motion.nav>
        <motion.span initial={{y:-128, opacity:0}} animate={{y:0, opacity:1}} transition={easeTransition}><h1>CLANKER INSULTER</h1></motion.span>
        <motion.span initial={{y:-128, opacity:0}} animate={{y:0, opacity:1}} transition={easeTransition2}><button ref={themeButton} aria-label="toggle theme" id="themeButton" className="moon" onClick={handleButton}></button></motion.span>
        </motion.nav>
    )
}

export default NavBar