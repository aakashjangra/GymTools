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
    //used for hamburger menu, mobile only
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

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

    const itemsInCart = (cart) => {
        let count = 0;
        cart.forEach((item) => count += item.quantity);
        return count;
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
                        <nav className='header-nav'>
                            {/* hamburger menu mobile */}
                                <button className='hamburger desktop-hidden' onClick={toggleMenu}>
                                        {
                                            menuOpen? (
                                                <img src="/close.svg" className='svg' alt="A SVG of close button" />
                                            ): (
                                                <img src="/hamburger.svg" className='svg' alt="A SVG of hamburger" />
                                            )
                                        }
                                </button>
                                <div className={`menu ${menuOpen ? 'open' : 'closed'} desktop-hidden`}>
                                    {/* Add your menu items here */}
                                    <div onClick={toggleMenu}>
                                        <Link className="link-with-svg link" href='/gym-equipments'>
                                            Gym Equipments
                                            <img
                                                className="svg"
                                                src="/arrow-right.svg"
                                                alt="A SVG of arrow right"
                                                />
                                        </Link>
                                    </div>
                                    <div onClick={toggleMenu}>
                                        <Link className="link-with-svg link" href='/calisthenics-equipments'>
                                            Calisthenics Equipments
                                            <img
                                                className="svg"
                                                src="/arrow-right.svg"
                                                alt="A SVG of arrow right"
                                            />
                                        </Link>
                                    </div>
                                    <div onClick={toggleMenu}>
                                        <Link className='link' href='/lookbook'>Lookbook</Link>
                                    </div>
                                </div>
                            <section className="header-left">
                                <Link className="title-gymtools link" href="/">
                                    <h1>GymTools</h1>
                                </Link>
                                <Link className="link-with-svg link mobile-hidden" href='/gym-equipments'>
                                    Gym Equipments
                                    <img
                                        className="svg"
                                        src="/chevron-down.svg"
                                        alt="A SVG of chevron down"
                                    />
                                </Link>
                                <Link className="link-with-svg link mobile-hidden" href='/calisthenics-equipments'>
                                    Calisthenics Equipments
                                    <img
                                        className="svg"
                                        src="/chevron-down.svg"
                                        alt="A SVG of chevron down"
                                    />
                                </Link>
                                <Link className='link mobile-hidden' href='/lookbook'>Lookbook</Link>
                            </section>
                            <section className="header-right">
                                <button className="search" onClick={() => setSearchBoxVisible(true)}>
                                    <img src="/search.svg" alt="A SVG of search" />
                                </button>
                                <button className="user mobile-hidden">
                                    <img src="/user.svg" alt="A SVG of user" />
                                </button>
                                <button className="cart">
                                    <Link href={'/cart'}>
                                    <img src="/cart.svg" alt="A SVG of cart" className='cartSvg'/>
                                    {
                                        cart?.length > 0 && (
                                            <p className='cartItemsCount'>{itemsInCart(cart)}</p>
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