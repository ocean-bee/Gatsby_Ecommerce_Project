import * as React from "react"
import Layout from "../../../components/layout"
import { graphql, Link } from "gatsby"
import isEqual from "lodash.isequal"
import { StoreContext } from "../../../context/store-context"
import { GatsbyImage, getSrc } from "gatsby-plugin-image"
import { formatPrice } from "../../../utils/format-price"
import { NumericInput } from "../../../components/numeric-input"
import { AddToCart } from "../../../components/add-to-cart"






const Hello = ({ data: { product, suggestions } }) => {
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRangeV2,
    title,
    description,
    images,
    images: [firstImage],
  } = product
  const { client } = React.useContext(StoreContext)

  const [variant, setVariant] = React.useState({ ...initialVariant });
  const [quantity, setQuantity] = React.useState(1);

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant;

  const [available, setAvailable] = React.useState(
    productVariant.availableForSale
  );

  const checkAvailablity = React.useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result =
          fetchedProduct?.variants.filter(
            (variant) => variant.id === productVariant.storefrontId
          ) ?? [];

        if (result.length > 0) {
          setAvailable(result[0].available);
        }
      });
    },
    [productVariant.storefrontId, client.product]
  );

  const handleOptionChange = (index, event) => {
    const value = event.target.value;

    if (value === "") {
      return;
    }

    const currentOptions = [...variant.selectedOptions];

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    };

    const selectedVariant = variants.find((variant) => {
      return isEqual(currentOptions, variant.selectedOptions);
    });

    setVariant({ ...selectedVariant });
  };

  React.useEffect(() => {
    checkAvailablity(product.storefrontId);
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId]);

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price
  );

  const hasVariants = variants.length > 1;
  const hasImages = images.length > 0;
  const hasMultipleImages = true || images.length > 1;

  return (
    <Layout>
      <div className="py-10">
        <div className="flex justify-center items-center">
          <div className="max-w-xl px-4 space-y-6 flex flex-col">
            {/* header card */}
            <div className="flex flex-col">
              <div className="bg-white py-4 px-4 rounded-2xl shadow-2xl">
                {hasImages && (
                  <div className="">
                    <ul className="space-y-4">
                      {images.map((image, index) => (
                        <li key={`product-image-${image.id}`} className="">
                          <GatsbyImage
                            objectFit="cover"
                            loading={index === 0 ? "eager" : "lazy"}
                            alt={
                              image.altText
                                ? image.altText
                                : `Product Image of ${title} #${index + 1}`
                            }
                            image={image.gatsbyImageData}
                            className="rounded-2xl"
                          />
                        </li>
                      ))}
                    </ul>

                    <h1 className="text-6xl pt-5 font-semibold">{title}</h1>

                    <h3 className="text-4xl pt-3 pb-6 text-green-700 font-mono font-bold">
                      {price}
                    </h3>

                    <div className="flex flex-row space-x-4 items-center">
                      <h3 className="text-2xl font-mono lowercase ">
                        Quantity:
                      </h3>
                      <NumericInput
                        aria-label="Quantity"
                        onIncrement={() =>
                          setQuantity((q) => Math.min(q + 1, 20))
                        }
                        onDecrement={() =>
                          setQuantity((q) => Math.max(1, q - 1))
                        }
                        onChange={(event) =>
                          setQuantity(event.currentTarget.value)
                        }
                        value={quantity}
                        min="1"
                        max="20"
                        fontSize="text-xl"

                      />
                    </div>

                    <fieldset className="text-2xl font-mono lowercase py-2">
                      {hasVariants &&
                        options.map(({ id, name, values }, index) => (
                          <div
                            key={id}
                            className="flex flex-row items-center space-x-4 py-2"
                          >
                            <p>{name}:</p>

                            <select
                              aria-label="Variants"
                              onChange={(event) =>
                                handleOptionChange(index, event)
                              }
                              className="lowercase"
                            >
                              <option value="">{`select ${name}`}</option>
                              {values.map((value) => (
                                <option
                                  value={value}
                                  key={`${name}-${value}`}
                                  className="lowercase"
                                >
                                  {value}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                    </fieldset>

                    <div className="flex flex-row space-x-4 justify-center items-center pt-6 pb-2">


                      <AddToCart
                      variantId={productVariant.storefrontId}
                      quantity={quantity}
                      available={available}
                      className="min-w-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* desc card */}
            <div className="flex flex-col bg-white rounded-2xl shadow-xl">
              <div className="py-4 text-gray-900 px-4">
                <h2 className="text-3xl font-semibold">Description:</h2>
                <p className="text-xl">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Hello

export const query = graphql`
  query($id: String!, $productType: String!) {
    product: shopifyProduct(id: { eq: $id }) {
      title
      description
      productType
      productTypeSlug: gatsbyPath(
        filePath: "/products/{ShopifyProduct.productType}"
      )
      tags
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      images {
        # altText
        id
        gatsbyImageData(layout: CONSTRAINED, width: 640, aspectRatio: 1)
      }
      variants {
        availableForSale
        storefrontId
        title
        price
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        id
      }
    }
    suggestions: allShopifyProduct(
      limit: 3
      filter: { productType: { eq: $productType }, id: { ne: $id } }
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`