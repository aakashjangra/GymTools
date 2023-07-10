"use client";

import React, { useEffect, useState } from 'react';
import './page.css';
import styles from './page.module.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import Products from '../components/Products/Products';

function Lookbook() {
    const productsCollectionRef = collection(db, "products"); //the second parameter should match collection name in our db
    const [products, setProducts] = useState([]);
    const [showcaseImages, setShowcaseImages] = useState([]);
    let imageCounter = 0;

    const getProducts = async () => {
        //READ THE  DATA
        //STORE IN PRODUCTS ARRAY
        try {
            const data = await getDocs(productsCollectionRef);
            let filteredData = data.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data()
                }
                ))
            setProducts([...filteredData]);
        } catch (err) {
            console.error(err);
        }
    }

    const separateImages = (products) => {
        const imagesArray = [];
        if(products.length < 11) return;

        for(let i  = 0; i<11; i++) {
            const product = products[i];
            imagesArray.push(product.imageUrls[0]); //taking only first image of each product, total = 1*11 = 11 images
        };

        setShowcaseImages([...imagesArray]);
    }

    useEffect(() => {
      getProducts();
    }, [])

    useEffect(() => {
        separateImages(products);
    }, [products]);

  return (
    <>
        <section className={styles.summerInspiration}>
            <h2 className={styles.heading}>Summer Inspiration</h2>
            <section className={styles.showcaseImages}>
                {
                    showcaseImages.map((imageUrl) => {
                            imageCounter++;
                            return <img key={imageUrl} src={imageUrl} className={`image${imageCounter} ${styles.image}`} alt={imageUrl} />    
                    })
                }
            </section>
        </section>
        <section className={styles.productsContainer}>
            <h2 className={styles.heading}>Featured</h2>
            {products?.length > 0 ? (
                      (function renderEightProducts() {
                          let renderProducts = [];
                          for (let i = 0; i < 8; i++) {
                              const product = products[i];
                              renderProducts.push(product);
                          }
                          return <Products products={renderProducts} />;
                      })()
              ) : (
                  <section>No products right now.</section>
              )}
        </section>
    </>
  )
}

export default Lookbook