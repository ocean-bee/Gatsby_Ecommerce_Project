import * as React from 'react'
import { StoreContext } from "../context/store-context"


export function AddToCart({ variantId, quantity, available, ...props }) {
    const { addVariantToCart, loading } = React.useContext(StoreContext)

    function addToCart(e) {
      e.preventDefault()
      addVariantToCart(variantId, quantity)
    }
  
    return (
      <div className="min-w-full">
        <button
          type="submit"
          onClick={addToCart}
          disabled={!available || loading}
          {...props}
          className="flex-grow min-w-full text-xl py-2 px-2 rounded-2xl font-mono border-purple-700 border-2 bg-purple-700 text-gray-50 lowercase  hover:bg-purple-500 hover:text-white hover:border-purple-500 hover:shadow-2xl"
        >
          {available ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    );
}