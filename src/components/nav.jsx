import React, { useState } from "react"
import {Link} from 'gatsby'
import { FiMenu, FiShoppingBag, FiSearch } from 'react-icons/fi'
import { Toast } from "./toast"
import { StoreContext } from "../context/store-context"
import { CartButton } from "./cart-button"


const NavBar = function () {
    const [isActive, setHidden] = useState(false)

    const { checkout, loading, didJustAddToCart } = React.useContext(StoreContext)

    const items = checkout ? checkout.lineItems : []


    const quantity = items.reduce((total, item) => {
      return total + item.quantity
    }, 0)

    return (
      <>
        <div className="flex flex-grow justify-between items-center py-3 px-5 bg-white fixed w-full shadow-lg" style={{
          zIndex: `9999`
        }}>
          {/* Start */}
          <div className="flex flex-row items-center space-x-5">
            <button>
              <FiMenu
                onClick={() => setHidden(!isActive)}
                className="text-2xl"
              />
            </button>
            <Link to="/"><h1 className="text-3xl font-bold">Cyberganica</h1></Link>
          </div>

         

          {/* End */}
          <div className="flex flex-row items-center space-x-4">
             
            <CartButton quantity={quantity} />

          </div>
        </div>

        <Toast show={loading || didJustAddToCart}>
          <div className="bg-green-400 rounded-2xl py-2 px-2 shadow-xl font-mono lowercase">
          {!didJustAddToCart ? (
            "Updating…"
          ) : (
            <>
              Added to cart{" "}
              
            </>
          )}
          </div>
          
        </Toast>

        <aside className="flex flex-row">
          <div
            className={`transform top-0 left-0 w-80 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 shadow-2xl ${
              isActive ? "translate-x-0" : "-translate-x-full"
            }`}

            style={{
              zIndex: 99999
            }}
          >
            <div className="flex flex-row items-center py-3 space-x-5 px-5">
              <button>
                <FiMenu
                  onClick={() => setHidden(!isActive)}
                  className="text-2xl"
                />
              </button>
              <Link to="/"><h1 className="text-3xl font-bold">Cyberganica</h1></Link>
            </div>
            <div className="">
                <div className="px-5 text-xl space-y-5 py-10">
                  {/* 
                  <div className="border-2 border-gray-900 px-2 py-1 rounded-2xl lowercase font-mono flex flex-row justify-between items-center space-x-2">
                    <p className="text-gray-500">Search</p> <FiSearch />
                  </div>
                  */}

                  <div className="py-4 font-mono lowercase flex flex-col space-y-6">

                    <Link to="/products">all products</Link>

                    <Link to="/products/stickers">stickers</Link>

                    <Link to="/products/shirts">shirts</Link>

                  </div>
              </div>
            </div>
          </div>

          <button className={`transform top-0 w-screen bg-gray-900 bg-opacity-30 fixed h-full overflow-auto shadow-2xl backdrop-filter backdrop-blur-lg ${
              isActive ? "translate-x-0" : "-translate-x-full"
            }`}
            
            onClick={() => setHidden(!isActive)}


            style={{
              zIndex: 9999
            }}></button>
        </aside>
      </>
    );
}

export default NavBar