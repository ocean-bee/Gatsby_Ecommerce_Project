import * as React from "react"
import { FaTwitter, FaInstagram, FaSnapchatGhost } from 'react-icons/fa'

const Footer = () => {
    return(
        <div className=" flex justify-center items-center flex-col pt-6 pb-6 bg-white ">
            <div className="flex flex-row space-x-4 text-2xl py-2">
               <FaTwitter />
               <FaInstagram />
               <FaSnapchatGhost />
            </div>
            <div className="flex flex-row space-x-4 py-2">
                <p>Shipping</p>
                <p>Privacy</p>
                <p>FAQs</p>
                <p>Contact</p>

            </div>
            <h1 className="pt-4 font-mono text-sm">Cyberganica All Rights Reserved 2021.</h1>
        </div>
    )
}

export default Footer