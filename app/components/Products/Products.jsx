import React, { useEffect } from 'react';
import styles from './Products.module.css';

function Products({ products }) {
  return (
    <section className={styles.products}>
    {products.map((product) => 
                    <div
                                      className={`${styles.card} ${styles.product}`}
                                      key={product.id}
                                  >
                                      <div className={styles.productImages}>
                                          {product.imageUrls?.length > 0 ? (
                                              <>
                                                  <img
                                                      className={`${styles.productPreviewImg} ${styles.imageNormal}`}
                                                      src={product.imageUrls[0]}
                                                      alt="Product Preview Image"
                                                  />
                                                  <img
                                                      className={`${styles.productPreviewImg} ${styles.imageHover}`}
                                                      src={product.imageUrls?.length > 1? product.imageUrls[1]: product.imageUrls[0]}
                                                      alt="Product Preview Image"
                                                  />
                                              </>
                                          ) : (
                                              <></>
                                          )}
                                      </div>
                                      <h4 className={styles.productName}>
                                          {product.title}
                                      </h4>
                                      <div className={styles.pricing}>
                                          <p
                                              className={`${styles.price} ${styles.strikeThrough}`}
                                          >
                                              ₹ {product.price} INR
                                          </p>
                                          <p className={styles.salePrice}>
                                              ₹ {product.salePrice} INR
                                          </p>
                                      </div>
                </div>
        )}
        </section>
  )
}

export default Products