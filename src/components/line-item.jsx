import * as React from "react"
import debounce from "lodash.debounce"
import { StoreContext } from "../context/store-context"
import { formatPrice } from "../utils/format-price"
import { GatsbyImage } from "gatsby-plugin-image"
import { getShopifyImage } from "gatsby-source-shopify"
import { NumericInput } from "./numeric-input"


export function LineItem({ item }) {
  const {
    removeLineItem,
    checkout,
    updateLineItem,
    loading,
  } = React.useContext(StoreContext)
  const [quantity, setQuantity] = React.useState(item.quantity)

  const variantImage = {
    ...item.variant.image,
    originalSrc: item.variant.image.src,
  }
  const price = formatPrice(
    item.variant.priceV2.currencyCode,
    Number(item.variant.priceV2.amount)
  )

  const subtotal = formatPrice(
    item.variant.priceV2.currencyCode,
    Number(item.variant.priceV2.amount) * quantity
  )

  const handleRemove = () => {
    removeLineItem(checkout.id, item.id)
  }

  const uli = debounce(
    (value) => updateLineItem(checkout.id, item.id, value),
    300
  )
  // eslint-disable-next-line
  const debouncedUli = React.useCallback((value) => uli(value), [])

  const handleQuantityChange = (value) => {
    if (value !== "" && Number(value) < 1) {
      return
    }
    setQuantity(value)
    if (Number(value) >= 1) {
      debouncedUli(value)
    }
  }

  function doIncrement() {
    handleQuantityChange(Number(quantity || 0) + 1)
  }

  function doDecrement() {
    handleQuantityChange(Number(quantity || 0) - 1)
  }

  const image = React.useMemo(
    () =>
      getShopifyImage({
        image: variantImage,
        layout: "constrained",
        crop: "contain",
        width: 120,
        height: 120,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [variantImage.src]
  )

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-2xl">
      <div className="flex flex-row  pt-4 px-4  items-start justify-between">



        <div className="">
          <div className="flex-col">
            <div className="text-3xl font-bold font-mono">{item.title}</div>
            <div className="text-2xl font-mono">
              {item.variant.title === "Default Title" ? "" : item.variant.title}
            </div>
            <div className="text-xl font-bold font-mono pb-4 text-green-600">{price}</div>

          </div>
        </div>

        <div className="">
          {image && (
            <GatsbyImage
              key={variantImage.src}
              image={image}
              alt={variantImage.altText ?? item.variant.title}
              className="rounded-2xl"
            />
          )}
        </div>

      </div>
      <div className="flex flex-row  space-y-2 font-mono min-w-full px-4 pb-4 space-x-16 text-xl">
        <NumericInput
          disabled={loading}
          value={quantity}
          aria-label="Quantity"
          onIncrement={doIncrement}
          onDecrement={doDecrement}
          onChange={(e) => handleQuantityChange(e.currentTarget.value)}
          fontSize=""
        />
        <button onClick={handleRemove} className="lowercase hover:font-extrabold">Remove</button>
      </div>
    </div>
  );
}