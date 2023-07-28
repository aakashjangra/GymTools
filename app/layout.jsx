"use client"

import './globals.css'
import { Pathway_Extreme } from 'next/font/google'
import Link from 'next/link'
import { persistor, store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import Header from './components/Header/Header'

const pathwayExtremeFont = Pathway_Extreme({ subsets: ['latin'] })

export const metadata = {
  title: 'HomePage | GymTools',
  description: 'Homepage of GymTools E-commerce site',
}

function RootLayout({ children }) {
  return (
      <html lang="en">
          <body className={pathwayExtremeFont.className}>
            <div className={"announcement-bar"}>
                Free shipping available on all orders!
            </div>
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Header className='header'/>
                    {children}
                </PersistGate>
              </Provider>
            <footer className="footer">
                <section className="upper-footer">
                    <div>
                        <h3 className="footer-headings">Quick Links</h3>
                        <ul className="list">
                            <li>
                                    <Link href='/gym-equipments'>
                                        Gym Equipments
                                    </Link>
                                </li>
                            <li>
                                <Link href='/calisthenics-equipments'>
                                    Calisthenics Equipments
                                </Link>
                            </li>
                            <li>
                                    <Link href='/lookbook'>
                                        Lookbook
                                    </Link>
                                </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="footer-headings">Info</h3>
                        <ul className="list">
                            <li>
                                <Link href={'/'}>
                                    About
                                </Link>
                            </li>
                            <li><Link href={'/'}>
                                    Contact Us
                                </Link></li>
                            <li><Link href={'/'}>
                                    Shopping Policy
                                </Link></li>
                            <li><Link href={'/'}>
                                    Blog
                                </Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="footer-headings">Our Mission</h3>
                        <p>
                            To empower people to reach their fitness goals by
                            providing them with the best possible selection of
                            fitness equipments.
                        </p>
                    </div>
                </section>
                <section className="lower-footer credits copyright">
                    <p>© 2023, Architecture, Flow and Programming by Akash</p>
                    <p>
                        © 2023, Design inspired by theme-dawn-demo Powered by
                        Shopify
                    </p>
                </section>
            </footer>
          </body>
      </html>
  );
}

export default RootLayout;