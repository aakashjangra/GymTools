import React from 'react'
import Products from '../Products/Products';

function EightProducts({ products }) {
  const renderProducts = [];
    for (let i = 0; i < 8; i++) {
        const product = products[i];
        renderProducts.push(product);
    }
    return <Products products={renderProducts} />;
}

export default EightProducts;