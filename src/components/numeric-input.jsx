  
import * as React from "react"

export function NumericInput({
  onIncrement,
  onDecrement,
  className,
  disabled,
  fontSize,
  ...props
}) {
  return (
    <div className={` font-mono ${fontSize} flex flex-row items-center`}>
            <button
        disabled={disabled}
        className="text-2xl hover:font-extrabold"
        aria-label="Increment"
        onClick={onIncrement}
      >
        <span>+</span>
      </button>
      <div className="">
      <input
        disabled={disabled}
        type="numeric"
        style={{
        
        }}
        {...props}
        className="text-center"
        size='5'
      />
      </div>

      <button
        disabled={disabled}
        className="text-2xl hover:font-extrabold"
        aria-label="Decrement"
        onClick={onDecrement}
      >
        <span>-</span>
      </button>
    </div>
  )
}