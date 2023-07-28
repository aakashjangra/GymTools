"use client";

import { useEffect, useState } from "react";
import styles from './CategorySpecificPage.module.css'
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import Products from "../Products/Products";

function CategorySpecificPage({title, category}) {
    const [allUnsortedProducts, setAllUnsortedProducts] = useState([]);
    const [priceFilterMin, setPriceFilterMin] = useState(null);
    const [priceFilterMax, setPriceFilterMax] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [highestPrice, setHighestPrice] = useState(NaN);
    const [sortBy, setSortBy] = useState("featured");
    const productsCollectionRef = collection(db, "products"); //the second parameter should match collection name in our db
    
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
            filteredData = filteredData.filter((val) => val.category === category);
            setAllProducts([...filteredData]);
            setAllUnsortedProducts([...filteredData]);
            setHighestPriceFromProducts(filteredData);
        } catch (err) {
            console.error(err);
        }
    }

    const changeSort = (sortBy) => {
        switch (sortBy) {
            case "featured":
                setProducts([...allUnsortedProducts]);
                break;
            case "price-low-to-high":
                allProducts.sort((a, b) => 
                    a.salePrice === b.salePrice? 0
                    : a.salePrice > b.salePrice? 1: 
                    -1
                );
                setProducts([...allProducts]);
                break;
            case "price-high-to-low":
                allProducts.sort((a, b) => 
                    a.salePrice === b.salePrice? 0
                    : a.salePrice < b.salePrice? 1: 
                    -1
                );
                setProducts([...allProducts]);
                break;
            case "alphabetically-a-z":
                allProducts.sort((a, b) => 
                    a.title === b.title? 0
                    : a.title > b.title? 1: 
                    -1
                );
                setProducts([...allProducts]);
                break;
            case "alphabetically-z-a":
                allProducts.sort((a, b) => 
                    a.title === b.title? 0
                    : a.title < b.title? 1: 
                    -1
                );
                setProducts([...allProducts]);
                break;
            
            default:
                break;
        }
                if(priceFilterMin && priceFilterMax) filterProductsOnPrice();
    }
    
    const setHighestPriceFromProducts = (products) => {
        let max = 0;
        products.forEach(product => {
            max = Math.max(product.salePrice, max);
        });
        setHighestPrice(max);
    }

    const filterProductsOnPrice = () => {
        const filteredProducts = [];
        allProducts.forEach(product => {
            if((priceFilterMin ? priceFilterMin <= product.salePrice: true) && (priceFilterMax ? product.salePrice <= priceFilterMax : true)){
                filteredProducts.push(product);
            }
        });
        console.log('filtered products - ', filteredProducts, !priceFilterMax);
        setProducts([...filteredProducts]);
    }

    useEffect(() => {
        getProducts();
        changeSort(sortBy);

    }, []);

    useEffect(() => {
        changeSort(sortBy);
    }, [allUnsortedProducts, sortBy])    

    useEffect(() => {
        filterProductsOnPrice();
    }, [priceFilterMin, priceFilterMax]);

  return (
    //head
    <>
    <h2 className={styles.pageHeading}>{title}</h2>
    <div className={styles.filterSort}>
    {/* filter */}
        <section className={styles.filter}>
            <p>Filter:</p>
            <div className={styles.filterOptionContainer}>
                <p className={styles.filterOption}>Price</p>
                <img
                    className="svg"
                    src="/chevron-down.svg"
                    alt="A SVG of chevron down"
                />
                <div className={styles.filterOptionPopup}>
                    <div className={styles.highestPriceAndReset}>
                        <p className={styles.highestPriceContainer}>The highest price is ₹{highestPrice}</p>
                        <p className={styles.resetPrice} onClick={() => {
                            setPriceFilterMin(0);
                            setPriceFilterMax(highestPrice);
                        }}>Reset</p>
                    </div>
                    <div className={styles.inputs}>
                            <label className={styles.input} htmlFor="minPrice" onChange={(event) => setPriceFilterMin(event.target.value)}>From: 
                                ₹ <input type="number" id="minPrice" value={priceFilterMin}/>
                            </label>
                            <label className={styles.input} htmlFor="maxPrice" onChange={(event) => setPriceFilterMax(event.target.value)}>To: 
                                ₹ <input type="number" id="maxPrice" value={priceFilterMax}/>
                            </label>
                    </div>
                </div>
            </div>
        </section>
        {/* Sort */}
        <section className={styles.sort}>
            <label htmlFor="sort">Sort by:</label>
            <select name="sort" id="sort" onChange={(event) => {
                setSortBy(event.target.value);
            }}>
                <option value="featured">Featured</option>
                <option value="price-low-to-high">Price: Low to High</option>
                <option value="price-high-to-low">Price: High to Low</option>
                <option value="alphabetically-a-z">Alphabetically: A-Z</option>
                <option value="alphabetically-z-a">Alphabetically: Z-A</option>
            </select>
        </section>
    </div>
        {/* products */}
       <Products products={products} />
    {/* pagination */}
    </>
  )
}

export default CategorySpecificPage