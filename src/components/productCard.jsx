import * as React from "react"
import { graphql, Link } from "gatsby"
import { getShopifyImage } from "gatsby-source-shopify"
import { GatsbyImage } from "gatsby-plugin-image"
import { formatPrice } from "../utils/format-price"


const ProductCard = ({ product,eager }) => {
    const {
        title,
        images: [firstImage],
        storefrontImages,
        priceRangeV2,
        slug
    } = product

    let storefrontImageData = {};
    if (storefrontImages) {
      const storefrontImage = storefrontImages.edges[0].node;
      try {
        storefrontImageData = getShopifyImage({
          image: storefrontImage,
          layout: "fixed",
        });
      } catch (e) {
        console.error(e);
      }
    }

    const hasImage = firstImage || Object.getOwnPropertyNames(storefrontImageData || {}).length

    const price = formatPrice(
        priceRangeV2.minVariantPrice.currencyCode,
        priceRangeV2.minVariantPrice.amount
    )


    return (
      <Link to={slug}>
        <div className="w-86 shadow-2xl bg-white rounded-2xl">
          <div className="px-4 py-4">
            {hasImage ? (
              <div data-name="product-image-box">
                <GatsbyImage
                  alt={firstImage?.altText ?? title}
                  image={firstImage?.gatsbyImageData ?? storefrontImageData}
                  loading={eager ? "eager" : "lazy"}
                  className="rounded-2xl"
                  style={{
                    zIndex: 1,
                  }}
                />
              </div>
            ) : (
              <div />
            )}
          </div>
          <div className="flex flex-col items-start justify-start pb-4 px-4">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-green-700 font-mono font-semibold text-2xl">{price}</p>

          </div>
        </div>
      </Link>
    );
}

export default ProductCard

export const query = graphql`
  fragment ProductCard on ShopifyProduct {
    id
    title
    slug: gatsbyPath(
        filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
    )
    images {
        id
        altText
        gatsbyImageData(aspectRatio: 1, width: 640)
    }
    priceRangeV2 {
        minVariantPrice {
          amount
          currencyCode
        }
    }
    
  }
`