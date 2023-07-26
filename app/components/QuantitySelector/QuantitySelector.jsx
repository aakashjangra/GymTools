import React from 'react'
import styles from './QuantitySelector.module.css';

function QuantitySelector({quantity, setQuantity}) {
  return (
    <div className={styles.quantityInputContainer}>
              <label className={styles.quantityLabel} htmlFor="quantity">
                Quantity
                <br />
                <input className={styles.quantityInput} onChange={(event) => {
                    if(event.target.value && (event.target.value >= 1 && event.target.value < 99999))
                      setQuantity(parseInt(event.target.value))
                    else 
                      setQuantity(1);
                  }} value={quantity} id='quantity' type='number'></input>
              </label>
              <button className={styles.quantityIncrement} onClick={() => {setQuantity(quantity+1)}}>+</button>
              <button className={styles.quantityDecrement} disabled={quantity == 1}  onClick={() => {
                if(quantity == 1) return;
                setQuantity(quantity-1)}}>-</button>
    </div>
  )
}

export default QuantitySelector