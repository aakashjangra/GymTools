import './globals.css'
import { Pathway_Extreme } from 'next/font/google'

const pathwayExtremeFont = Pathway_Extreme({ subsets: ['latin'] })

export const metadata = {
  title: 'HomePage | GymTools',
  description: 'Homepage of GymTools E-commerce site',
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <body className={pathwayExtremeFont.className}>
              <div className={"announcement-bar"}>
                  Free shipping available on all orders!
              </div>
              <header className="header">
                  <nav>
                      <section className="header-left">
                          <a className="title-gymtools">
                              <h2>GymTools</h2>
                          </a>
                          <a className="link-with-svg">
                              Gym Equipments
                              <img
                                  className="svg"
                                  src="/chevron-down.svg"
                                  alt="A SVG of chevron down"
                              />
                          </a>
                          <a className="link-with-svg">
                              Calisthenics Equipments
                              <img
                                  className="svg"
                                  src="/chevron-down.svg"
                                  alt="A SVG of chevron down"
                              />
                          </a>
                          <a>Lookbook</a>
                      </section>
                      <section className="header-right">
                          <a className="search">
                              <img src="/search.svg" alt="A SVG of search" />
                          </a>
                          <a className="user">
                              <img src="/user.svg" alt="A SVG of user" />
                          </a>
                          <a className="cart">
                              <img src="/cart.svg" alt="A SVG of cart" />
                          </a>
                      </section>
                  </nav>
              </header>
              {children}
              <footer className="footer">
                  <section className="upper-footer">
                      <div>
                          <h3 className="footer-headings">Quick Links</h3>
                          <ul className="list">
                              <li>Gym Equipments</li>
                              <li>Calisthenics Equipments</li>
                              <li>Lookbook</li>
                          </ul>
                      </div>
                      <div>
                          <h3 className="footer-headings">Info</h3>
                          <ul className="list">
                              <li>About</li>
                              <li>Contact Us</li>
                              <li>Shopping Policy</li>
                              <li>Blog</li>
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
