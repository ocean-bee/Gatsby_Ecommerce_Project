import * as React from "react"
import { graphql } from "gatsby"
import { ProductListing } from "../../components/productListing"
import Layout from "../../components/layout"

export default function Products({ data: { products } }) {
  return (
      <Layout>
        <div className="py-6 flex flex-col justify-center px-4 max-w-xl m-auto">
          <h1 className="text-4xl font-mono font-semibold py-4">All Products</h1>
          <ProductListing products={products.nodes} />
        </div>
      </Layout>
  )
}

export const query = graphql`
  {
    products: allShopifyProduct(
      sort: { fields: updatedAt, order: ASC }
      limit: 24
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`