"use client"

import React, { useEffect } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { useSelector } from 'react-redux';

function Cart() {
    // const cart = useStore((state) => state.cart);
    const cart = useSelector((state) => state.cart.cartItems)

    useEffect(() => {
      console.log("cart is -> ", cart);
    }, [])
    
  return (
    <>
      <section className={styles.header}>
        <h2 className={styles.heading}>Your cart</h2>
        <Link className={styles.linkToProducts} href={'/lookbook'}>Continue shopping</Link>
         { cart?.length > 0 && 
         (
            <section className={styles.products}>Products</section>
         )
         }
      </section>
    </>
  )
}

export default Cart