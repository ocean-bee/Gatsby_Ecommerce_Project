import * as React from "react"
import { graphql } from "gatsby"
import { ProductListing } from "../../../components/productListing"
import Layout from "../../../components/layout"

export default function ProductTypeIndex({
  data: { products },
  pageContext: { productType },
}) {
  return (
    <Layout>
      <div className="py-6 flex flex-col justify-center px-4 max-w-xl m-auto">
        <h1 className="text-4xl font-mono font-semibold py-4">{productType}</h1>
        <ProductListing products={products.nodes} />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query($productType: String!) {
    products: allShopifyProduct(
      filter: { productType: { eq: $productType } }
      sort: { fields: updatedAt, order: ASC }
      limit: 24
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`