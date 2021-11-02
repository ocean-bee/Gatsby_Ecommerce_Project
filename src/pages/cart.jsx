import * as React from "react"
import { Link } from "gatsby"
import { StoreContext } from "../context/store-context"
import { LineItem } from "../components/line-item"
import Layout from "../components/layout"
import { formatPrice } from "../utils/format-price"
import { BsArrowRight } from 'react-icons/bs'

export default function CartPage() {
  const { checkout, loading } = React.useContext(StoreContext)
  const emptyCart = checkout.lineItems.length === 0

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  return (
    <Layout>
      <div className="">
        {emptyCart ? (
          <div className="min-h-screen flex justify-center items-center">
            <div className="flex flex-col text-center space-y-4">
              <h1 className="font-mono lowercase">Your cart is empty</h1>
            </div>
          </div>
        ) : (
          <div>
            {/* Cart.hasitem */}
            <div className="">
              <div className="min-h-screen m-auto flex justify-center items-center flex-col px-4 bg-gray-100 space-y-6 lowercase">


                <div className="space-y-6 min-w-full">
                  {checkout.lineItems.map((item) => (
                    <LineItem item={item} key={item.id} />
                  ))}
                </div>

                <div className="py-4 px-4 bg-white min-w-full rounded-2xl shadow-lg">
                  <div className="space-y-4">
                    <div className="flex flex-col">

                    <div className="flex flex-row space-x-4 font-mono text-xl">
                      <p>Subtotal:</p>
                      <p className="font-mono">
                      {formatPrice(
                      checkout.subtotalPriceV2.currencyCode,
                      checkout.subtotalPriceV2.amount
                    )}
                      </p>
                    </div>


                    


                   

                    <div className="flex flex-row space-x-4 font-mono text-xl">
                      <p>Taxes:</p>
                      <p className="font-mono">
                      {formatPrice(
                      checkout.totalTaxV2.currencyCode,
                      checkout.totalTaxV2.amount
                    )}
                      </p>
                    </div>

                    <div className="flex flex-row space-x-4  text-xl items-center">
                        <p className="font-mono">Shipping:</p>
                        <p className="font-mono"> Calculated at Checkout</p>
                      </div>


                    <div className="flex flex-row space-x-4 font-mono text-2xl font-bold pt-4">
                      <p>total:</p>
                      <p>
                        {formatPrice(
                          checkout.totalPriceV2.currencyCode,
                          checkout.totalPriceV2.amount
                        )}
                      </p>
                    </div>

                    
                    </div>

                    <button onClick={handleCheckout} disabled={loading} className=" font-mono font-semibold lowercase flex items-center space-x-2 bg-purple-600 py-4 min-w-full justify-center rounded-2xl text-white hover:shadow-2xl text-2xl">
                      <p>Checkout -></p>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}