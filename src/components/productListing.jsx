import * as React from "react"
import ProductCard from "../components/productCard"

// To optimize LCP we mark the first product card as eager so the image gets loaded faster
export function ProductListing({ products = [] }) {
  return (
    <div className="flex flex-col justify-center items-center space-y-10 ">
      {products.map((p, index) => (
        <ProductCard product={p} key={p.id} />
      ))}
    </div>
  )
}