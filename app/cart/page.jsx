"use client"

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { useSelector } from 'react-redux';

function Cart() {
    // const cart = useStore((state) => state.cart);
    const cart = useSelector((state) => state.cart.cartItems)
    const [subTotal, setSubTotal] = useState(0);

    useEffect(() => {
      let total = 0;
      cart.map((item) => {total += item.quantity * item.data.salePrice});
      setSubTotal(total);
    }, [])
    
  return (
      <section className={styles.cart}>
        <section className={styles.header}>
          <h2 className={styles.heading}>Your cart</h2>
          <Link className={styles.linkToProducts} href={'/lookbook'}>Continue shopping</Link>
        </section>
         { cart?.length > 0 && 
         (
            <section className={styles.products}>
              <section className={styles.tHeadings}>
                <div className={styles.thead}>PRODUCT</div>
                <div className={styles.thead}>QUANTITY</div>
                <div className={`${styles.thead} ${styles.total}`}>TOTAL</div>
              </section>
               {
                cart.map((item) => {
                  const itemTotal = item.quantity * item.data.salePrice;
                   return (
                     <section className={styles.product}>
                      <section className={styles.info}>
                        <img src={item.data.imageUrls[0]} alt={item.data.title} className={styles.productImage}/>
                        <div className={styles.titleAndPrice}>
                          <h3 className={styles.title}>{item.data.title}</h3>
                          <p className={styles.price}>₹{item.data.salePrice}</p>
                        </div>
                      </section>
                      <section className={styles.quantity}>{item.quantity}</section>
                      <section className={styles.total}>₹{itemTotal}</section>
                    </section>
                  )
                })
               }
            </section>
         )
         }

         <section className={styles.billing}>
           <section className={styles.subtotal}>
             <p>Subtotal:</p>
             <p>₹{subTotal} INR</p>
          </section>
            <p className={styles.note}>Taxes and shipping calculated at checkout</p>
            <button className={styles.checkout}>Check out</button>
         </section>
      </section>
  )
}

export default Cart