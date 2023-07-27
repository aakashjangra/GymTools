import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux';

function Header({className: cName}) {
    const cart = useSelector((state) => state.cart.cartItems);

  return (
    <header className={cName}>
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
                                <div className="search">
                                    <img src="/search.svg" alt="A SVG of search" />
                                </div>
                                <div className="user">
                                    <img src="/user.svg" alt="A SVG of user" />
                                </div>
                                <div className="cart">
                                    <Link href={'/cart'}>
                                    <img src="/cart.svg" alt="A SVG of cart" className='cartSvg'/>
                                    {
                                        cart?.length > 0 && (
                                            <p className='cartItemsCount'>{cart?.length}</p>
                                        )
                                    }
                                    </Link>
                                </div>
                            </section>
                        </nav>
                    </header>
  )
}

export default Header