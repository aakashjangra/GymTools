"use client"

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import {clearCart, removeFromCart, updateCartItemQuantity} from '../store/cartSlice';
import Image from 'next/image';

function Cart() {
    // const cart = useStore((state) => state.cart);
    const cart = useSelector((state) => state.cart.cartItems)
    const dispatch = useDispatch();
    const [subTotal, setSubTotal] = useState(0);

    useEffect(() => {
      let total = 0;
      cart.map((item) => {total += item.quantity * item.data.salePrice});
      setSubTotal(total);
    }, [cart])

    const setQuantity=(id, quan) => dispatch(updateCartItemQuantity({id, quantity: quan}));
    
  return (
      <section className={styles.cart}>
        <section className={styles.header}>
          <h2 className={styles.heading}>Your cart</h2>
          <Link className={styles.linkToProducts} href={'/lookbook'}>Continue shopping</Link>
        </section>
         { cart?.length > 0 ?
         (
            <section className={styles.products}>
              <section className={styles.tHeadings}>
                <div className={`${styles.thead} ${styles.product}`}>PRODUCT</div>
                <div className={`${styles.thead} ${styles.quantity}`}>QUANTITY</div>
                <div className={`${styles.thead} ${styles.total}`}>TOTAL</div>
              </section>
               {
                cart.map((item) => {                
                  const itemTotal = item.quantity? item.quantity * item.data.salePrice: 0;
                   return (
                     <section className={styles.product}>
                        <section className={styles.info}>
                          <img src={item.data.imageUrls[0]} alt={item.data.title} className={styles.productImage}/>
                          <div className={styles.titleAndPrice}>
                            <h3 className={styles.title}>{item.data.title}</h3>
                            <p className={styles.price}>₹{item.data.salePrice}</p>
                          </div>
                        </section>
                        <div className={styles.middleSection}>
                            {/* Quantity Selector */}
                            <div className={styles.quantityInputContainer}>
                                        <input className={styles.quantityInput} onChange={(event) => {
                                            if(event.target.value && (event.target.value >= 1 && event.target.value < 99999))
                                              setQuantity(item.id, parseInt(event.target.value))
                                            else 
                                              setQuantity(item.id, 1);
                                          }} value={item.quantity} id='quantity' type='number'></input>
                                      <button className={styles.quantityIncrement} onClick={() => setQuantity(item.id, item.quantity+1)}>+</button>
                                      <button className={styles.quantityDecrement} disabled={item.quantity == 1}  onClick={() => {
                                        if(item.quantity == 1) return;
                                        setQuantity(item.id, item.quantity-1)}}>-</button>
                            </div>
                            {/* Quantity Selector Ends Here*/}
                            <button className={styles.itemDelete}>
                              <Image src={'/trash.svg'} height={20} width={15} className={styles.itemDelete}  onClick={() => dispatch(removeFromCart({id: item.id}))}></Image>
                            </button>
                        </div>
                        <section className={styles.total}>₹{itemTotal}</section>
                    </section>
                  )
                })
               }
            </section>
         ) : (
          <h2 className={styles.emptyCart}><p>Your cart is Empty! <i className={styles.faceEmoji}>˙◠˙</i></p></h2>
         )
         }

         { cart?.length > 0 && 
           (
              <section className={styles.billing}>
                <section className={styles.subtotal}>
                  <p>Subtotal:</p>
                  <p>₹{subTotal} INR</p>
                </section>
                  <p className={styles.note}>Taxes and shipping calculated at checkout</p>
                  <button className={styles.checkout} >
                    <Link href={'/'} ><p onClick={() => dispatch(clearCart())}>Check out</p></Link>
                  </button>
              </section>
            )
         }
      </section>
  )
}

export default Cart