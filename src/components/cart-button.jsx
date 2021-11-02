import * as React from "react"
import { Link } from "gatsby"
import { FiMenu, FiShoppingBag, FiSearch } from 'react-icons/fi'

import { cartButton,  } from "./cart-button.module.css"

export function CartButton({ quantity }) {
  return (
    <Link
      aria-label={`Shopping Cart with ${quantity} items`}
      to="/cart"
      className={cartButton}
    >
    <div className="flex">
     <FiShoppingBag className="text-2xl" />
      {quantity > 0 && <div className="bg-purple-600 rounded-full flex justify-center items-center font-mono text-white shadow-2xl text-xs" style={{
        width: `20px`,
        height: `20px`,
        marginLeft: `-12px`,
        marginTop: `-8px`,
      }}>{quantity}</div>}
    </div>
    </Link>
    
  )
}