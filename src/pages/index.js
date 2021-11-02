import * as React from "react"
import { graphql } from "gatsby"
import Footer from "../components/footer"
import Header from "../components/header"
import NavBar from '../components/nav'
import { ProductListing } from "../components/productListing"

export const query = graphql`
  query {
    shopifyCollection(title: {eq: "Staff Picks"}) {
      products {
        ...ProductCard
      }
    }
  }
`

const IndexPage = ({ data }) => {
  return (
    <main className="bg-gray-100">
      <NavBar />
      <Header />
      <section className="py-10 space-y-10">
        <div className="space-y-4 max-w-xl m-auto px-4">
          <h1 className="text-4xl font-semibold">Staff Picks</h1>
          <ProductListing products={data?.shopifyCollection?.products} />
        </div>

        
      
      </section>
      <Footer />
    </main>
  )
}

export default IndexPage
