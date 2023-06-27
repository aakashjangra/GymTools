"use client";
import { useEffect, useState } from 'react';
import styles from './page.module.css'
import { db } from './config/firebase';
// getDocs to get multiple docs together, doc to get 1(single) entry
import { getDocs, collection } from "firebase/firestore";

export default function Home() {
    const [products, setProducts] = useState([]);
    const productsCollectionRef = collection(db, "products"); //the second parameter should match collection name in our db
    const getProducts = async () => {
        //READ THE  DATA
        //STORE IN PRODUCTS ARRAY
        try {
            const data = await getDocs(productsCollectionRef);
            const filteredData = data.docs.map((doc) => (
                {
                    ...doc.data()
                }
                ))
            setProducts(filteredData);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getProducts();
        
    }, [])    
  return (
      <main>
          <section className={styles.banner}>
              <h3 className={styles.heading}>
                  The perfect blend of form and function.
              </h3>
              <p className={styles.description}>
                  For those who demand the best in both form and function
              </p>
              <button className={styles.shopNow}>Shop now</button>
          </section>
          <section className={styles.productShowcase}>
              <h3 className={styles.heading}>
                  Crafted with care. Built for results.
              </h3>
              <p className={styles.description}>
                  Equipment that's built to last, and designed to help you
                  reach your goals
              </p>
              <section className={styles.products}>
                {
                    products?.length > 0 ?
                    <section> Products Here </section> 
                    : <p>No products right now.</p>
                }
              </section>
          </section>
      </main>
  );
}
