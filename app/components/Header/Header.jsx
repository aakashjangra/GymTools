import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function Header({className: cName}) {
    const router = useRouter();
    const cart = useSelector((state) => state.cart.cartItems);
    const products = useSelector((state) => state.productStore.products);
    const [ searchBoxVisible, setSearchBoxVisible ] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(products);

    const handleSearchChange = (query) => {
        setSearchQuery(query);

        // Filter the items based on the search query
        const filteredItems = products?.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredItems);
    };

    const closeSearchBox = () => {
        handleSearchChange('');
        setSearchBoxVisible(false);
    }

    useEffect(() => {
        setSearchResults(products);
    }, [products]);

  return (
    <header className={cName}>
                            {/* absolute positioned search box */}
                            <div className={`searchBox ${searchBoxVisible? 'visible': 'hidden'}`}>
                                    <input type="text" placeholder="Search..."
                                       value={searchQuery}
                                       onChange={(e) => handleSearchChange(e.target.value)}
                                       name="search" />
                                    <button className='search'>    
                                        <img src="/search.svg" alt="A SVG of search" />
                                    </button>
                                    <button className='closeSearchBox' onClick={closeSearchBox}>X</button>
                                {
                                    searchQuery && searchQuery != '' && searchResults?.length > 0 && (
                                        <section className='searchResults'>
                                            <p className='searchResultsCategory'>Products</p>
                                            <ul>
                                                {searchResults?.map((item) => (
                                                    <li key={item.id} className='searchResult' 
                                                          onClick={() => {
                                                            closeSearchBox();
                                                            router.push( `/product?pid=${item.id}`)
                                                        }}
                                                    >
                                                            <img className='image' src={item.imageUrls[0]} alt={`image of ${item.title} (product)`} />
                                                            <h4 className='title'>{item.title}</h4>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    )
                                }
                            </div>
                        <nav>
                            <section className="header-left">
                                <Link className="title-gymtools link" href="/">
                                    <h1>GymTools</h1>
                                </Link>
                                <Link className="link-with-svg link" href='/gym-equipments'>
                                    Gym Equipments
                                    <img
                                        className="svg"
                                        src="/chevron-down.svg"
                                        alt="A SVG of chevron down"
                                    />
                                </Link>
                                <Link className="link-with-svg link" href='/calisthenics-equipments'>
                                    Calisthenics Equipments
                                    <img
                                        className="svg"
                                        src="/chevron-down.svg"
                                        alt="A SVG of chevron down"
                                    />
                                </Link>
                                <Link className='link' href='/lookbook'>Lookbook</Link>
                            </section>
                            <section className="header-right">
                                <button className="search" onClick={() => setSearchBoxVisible(true)}>
                                    <img src="/search.svg" alt="A SVG of search" />
                                </button>
                                <button className="user">
                                    <img src="/user.svg" alt="A SVG of user" />
                                </button>
                                <button className="cart">
                                    <Link href={'/cart'}>
                                    <img src="/cart.svg" alt="A SVG of cart" className='cartSvg'/>
                                    {
                                        cart?.length > 0 && (
                                            <p className='cartItemsCount'>{cart?.length}</p>
                                        )
                                    }
                                    </Link>
                                </button>
                            </section>
                        </nav>
    </header>
  )
}

export default Header