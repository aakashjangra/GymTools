"use client"

import { doc, getDoc } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase';
import styles from './page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import QuantitySelector from '../components/QuantitySelector/QuantitySelector';
import ImageSlider from '../components/ImageSlider/ImageSlider';


function Product() {
  const cart = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch()
  const searchParams = useSearchParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);

  let counter = 0;

  const getProduct = async () => {
    //READ THE  DATA
    //STORE IN PRODUCTS ARRAY
    try {
            const productsCollectionRef = doc(db, "products", searchParams.get('pid')); //the second parameter should match collection name in our db
            const data = await getDoc(productsCollectionRef)
            const filteredData = 
            {
              id: data.id,
              ...data.data()
            };
            console.log(' filteredData is -> ', filteredData);
            setProduct(filteredData);
        } catch (err) {
            console.error(err);
        }
    }

  useEffect(() => {
    console.log(cart, addToCart);
    getProduct();
  }, [])
  
  return (
    <>
    {
      product ?
      (
        <section className={styles.product}>
          <section className={styles.upperSection}>
            <section className={`${styles.images} ${styles.mobileHidden}`}>
              
                  {
                    product.imageUrls.length > 0 ?
                    (
                      product.imageUrls.map((imageUrl) => {
                        counter++;
                        return <img className={`image${counter} ${styles.image}`} src={imageUrl} key={imageUrl} alt={`${product.title} image`} />
                      }
                      )
                    ) : 
                    (
                      <img src='' alt='image not found' />
                    )
                }
            </section>
            <ImageSlider className={styles.desktopHidden} images={product.imageUrls} />
         <section className={styles.aboutProduct}>
          <h2 className={styles.title} >{product.title}</h2>
            <div className={styles.pricingContainer}>
              <h3 className={styles.salePrice}>₹ {product.salePrice} INR</h3>
              <h4 className={styles.price}>₹ {product.price} INR</h4>
            </div>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity}/>
                <button className={styles.addToCart} onClick={()=> {
                  
                  console.log('addtocart func- ', addToCart)
                  dispatch(addToCart({product, quantity}));
                  console.log('cart setted', cart);
                }} ><p>Add to cart</p></button>
                <button className={styles.buyItNow}><p>Buy it now</p></button>
                <p className={styles.description}>{product.description}</p>
         </section>
                  </section>
                <section className={styles.lowerSection}>
                  <section className={styles.features}>
                    <section className={styles.feature}>
                      <h3 className={styles.heading}>Free Shipping
</h3>
                      <p className={styles.description}>We offer free worldwide express shipping on all orders. You'll receive your order an estimated 1–4 days after shipment.</p>
                    </section>
                    <section className={styles.feature}>
                      <h3 className={styles.heading}>Hassle-Free Exchanges
</h3>
                      <p className={styles.description}>Exchanges are free. Try from the comfort of your home. We will collect from your home, work or an alternative address. </p>
                    </section>
                  </section>
                </section>
       </section> 
         )
      : 
      (
      <div>Nothing to show.</div>
      )
    }
    </>
  )
}

export default Product