"use client";

import { useEffect, useState } from "react";
import styles from './CategorySpecificPage.module.css'
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import Products from "../Products/Products";

function CategorySpecificPage({title, category}) {
    const [allUnsortedProducts, setAllUnsortedProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [highestPrice, setHighestPrice] = useState(NaN);
    const [filterSortOpen, setFilterSortOpen] = useState(false);
    const [priceFilterOpen, setPriceFilterOpen] = useState(false);
    const [priceFilterMin, setPriceFilterMin] = useState(null);
    const [priceFilterMax, setPriceFilterMax] = useState(null);
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

    const resetPriceFilter = () => {
        setPriceFilterMin(null);
        setPriceFilterMax(null);
    }

    const applyFilterSort = () => {
        changeSort(sortBy);
        filterProductsOnPrice();
        removeAllOverlays();
    }

    const removeAllFilterSort = () => {
        setSortBy("featured"); //initial
        resetPriceFilter();
    }

    const removeAllOverlays = () => {
        setPriceFilterOpen(false);
        setFilterSortOpen(false);
    }

    const togglePriceFilterOpen = () => {
        setPriceFilterOpen(!priceFilterOpen);
    }

    const toggleFilterSort = () => {
        setFilterSortOpen(!filterSortOpen);
        if(priceFilterOpen)
            removeAllOverlays();
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
    <div className={`${styles.filterSort} ${styles.mobileHidden}`}>
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
    <div className={`${styles.filterSort} ${styles.desktopHidden}`}>
        <div className={styles.filterSortButton} onClick={toggleFilterSort}><img src="/filter.svg" /><p>Filter and sort</p></div>
        <section className={`${styles.filterSortOverlay} ${styles.overlay} ${filterSortOpen? styles.open: styles.closed}`}>
            <div className={styles.head}>
                <p className={styles.about}>Filter and sort</p>
                <img className={styles.closeButton} onClick={toggleFilterSort} src="/close.svg" />
            </div>
            <section className={styles.filterAndSortOptions}>
                <section className={`${styles.price} ${styles.option} ${styles.filter}`} onClick={togglePriceFilterOpen}>
                    <p>Price</p><img src="/arrow-right.svg" />
                </section>
                {/* Sort */}
                <section className={`${styles.sort} ${styles.option}`}>
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
            </section>
            <div className={styles.foot}>
                <div className={styles.first} onClick={removeAllFilterSort}>Remove all</div>
                <div className={styles.second} onClick={applyFilterSort}>Apply</div>
            </div>
        </section>
        {/* overlay */}
        <div className={`${styles.priceFilterOverlay} ${styles.overlay} ${priceFilterOpen? styles.open: ''}`}>
                <div className={styles.body}>
                    <div className={styles.back} onClick={togglePriceFilterOpen}><img src="/arrow-left.svg" /><span>Price</span></div>
                    <div className={styles.filterOptionPopup}>
                            <p className={styles.highestPriceContainer}>The highest price is ₹{highestPrice}</p>
                            <div className={styles.inputs}>
                                    <label className={styles.input} htmlFor="minPrice" onChange={(event) => setPriceFilterMin(event.target.value)}>From: 
                                        <span>₹ <input type="number" id="minPrice" value={priceFilterMin}/></span>
                                    </label>
                                    <label className={styles.input} htmlFor="maxPrice" onChange={(event) => setPriceFilterMax(event.target.value)}>To: 
                                        <span>₹ <input type="number" id="maxPrice" value={priceFilterMax}/></span>
                                    </label>
                            </div>
                    </div>
                </div>
                    <div className={styles.foot}>
                        <div className={styles.first} onClick={() => {
                            setPriceFilterMin(0);
                            setPriceFilterMax(highestPrice);
                        }}>Clear</div>
                        <div className={styles.second} onClick={() => {
                            filterProductsOnPrice();
                            removeAllOverlays();
                        }}>Apply</div>
                    </div>
        </div>
    </div>

        {/* products */}
       <Products products={products} />
        {/* pagination */}
    </>
  )
}

export default CategorySpecificPage