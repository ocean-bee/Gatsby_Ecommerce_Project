import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"


const Header = () => {
    return(
        <div className="relative z-0 " >
            <StaticImage src="../images/header.jpg"

            className="object-cover h-screen  "

            />
            <div 
                className="absolute inset-0 flex justify-center items-center z-10 pt-10">
                
                <div className="flex flex-col space-y-0">
                <p className="text-4xl font-bold text-white pb-2 px-3  text-center">
                    CYBERGANICA
                </p>
                <p className="text-4xl font-bold text-white bg-black rounded-xl pt-3 pb-4 px-3 shadow-lg">
                    WINTER COLLECTION
                </p>

                <p className="text-4xl font-bold text-white pt-2 px-3  text-center">
                    2021
                </p>
                </div>

            </div>
        </div>

        
    )
}

export default Header