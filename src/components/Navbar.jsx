import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdClose, MdOutlineLightMode } from "react-icons/md";
import { ModeContext } from '../context/Mode';
import { NavLink } from 'react-router-dom';
import { LanguageContext } from '../context/Language';
import { CiCircleChevRight, CiClock2, CiGlobe, CiHeart, CiLogin, CiLogout, CiUser } from 'react-icons/ci';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import 'animate.css';
import supabase from '../tools/config/connect'
import { PiShoppingCartSimpleThin } from 'react-icons/pi';
import { TfiClose } from 'react-icons/tfi';
import slugify from 'slugify';

const useClickOutside = (handler) => {
  const domNode = useRef(null);

  useEffect(() => {
    const maybeHandler = (event) => {
      if (domNode.current && !domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, [handler]);

  return domNode;
};

const Navbar = () => {
  const [mode, setMode] = useContext(ModeContext);
  const [headerStyle, setHeaderStyle] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(['cookie-ticket', 'adminToken']);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isPartnersPage = location.pathname === '/partners';
  const isFaq = location.pathname === '/faq';
  const isSpeaksers = location.pathname === '/speakers';
  const isAddToCard = location.pathname === '/tickets/addToCard';
  const isLogin = location.pathname === '/login';
  const isRegister = location.pathname === '/register';
  const isAccount = location.pathname === `/account/${cookie['cookie-ticket']}`
  const isBlog = location.pathname === '/blog';
  const isBlogSingleCard = location.pathname === '/blog/blogSingleCard';
  const isContact = location.pathname === '/contact';
  const isWishlist = location.pathname === '/tickets/wishlist';
  const isCompleteOrder = location.pathname === '/tickets/addToCart/completeOrder';
  const isPreloader = location.pathname === '/preloader';

  useEffect(() => {
    if (isPartnersPage || isFaq || isAddToCard ||
      isLogin || isRegister || isAccount || isBlog ||
      isBlogSingleCard || isContact || isWishlist || isCompleteOrder ||
      isPreloader) {
      setHeaderStyle({
        backgroundColor: 'white',
        color: 'black',
      });
    } else {
      setHeaderStyle({
        backgroundColor: isHomePage ? '' : '#1e1e25',
        color: 'white',
        borderBottom: 'white',
      });
    }
  }, [isHomePage, isPartnersPage, isSpeaksers, isFaq, isAddToCard,
    isLogin, isRegister, isAccount, isBlog,
    isBlogSingleCard, isContact, isWishlist, isCompleteOrder, isPreloader]);

  // ====================================Animation GSAP========================================
  const appRef = useRef();
  const userButtons = useRef();
  const logoRef = useRef();
  const headerRef = useRef();
  const searchNavbarRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".logo , .params-submenu, .responsive-navbar-menu, .user-buttons, .search-navbar-button", {
        delay: .2,
        duration: 1,
        y: -80,
      });

      gsap.from(".nav-links li", {
        delay: .2,
        y: -80,
        stagger: .1
      }, "-=.4");
    });

    return () => ctx.revert();
  }, []);

  // ====================================COOKİE========================================
  const { token } = useParams();
  const user = useSelector(item => item.user)
  const filterUsersData = user.length == 0 ? "" : user.find(item => item.token === cookie['cookie-ticket'])


  // ====================================MODAL========================================
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const domNode = useClickOutside(() => {
    setShowModal(false)
  })

  // ====================================SEARCH========================================
  const [keyword, setKeyword] = useState();
  const [product, setProduct] = useState([]);

  const searchSystem = async () => {
    try {
      const { data, error } = await supabase.from('MewsShopData').select();

      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        const searchData = data.filter(item => item.title);
        if (searchData) {
          setProduct(searchData);
        }
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  useEffect(() => {
    searchSystem();
  }, [keyword]);


  // =============================basketQuantity==========================================
  const [basketQuantity, setBasketQuantity] = useState([0]);

  useEffect(() => {
    const basketFilterQuantity = async () => {
      const { data, error } = await supabase.from('Basket').select();
      if (error) {
        console.log('Data Fetch Error:', error);
      } else {
        const quantities = data.map(item => item.TotalQuantity);
        setBasketQuantity(quantities.length > 0 ? quantities : [0]);
      }
    };

    basketFilterQuantity();
  }, [basketQuantity]);


  // =============================wishlistQuantity==========================================
  const [wishlistFilterQuantity, setWishlistFilterQuantity] = useState([0]);

  useEffect(() => {
    const basketFilterQuantity = async () => {
      const { data, error } = await supabase.from('Wishlist').select();
      const filterUsersWishlist = data.filter(item => item.wishlist_user_token === cookie['cookie-ticket']);
  
      if (error) {
        console.log('Data Fetch Error:', error);
      } else {
          const quantities = filterUsersWishlist.map(item => item.TotalQuantity);
          setWishlistFilterQuantity(quantities.length > 0 ? quantities : [0]);
      }
    };
  
    basketFilterQuantity();
  }, [wishlistFilterQuantity, cookie]);


  // ========================================ReadMore=========================================
  const [readMoreitem, setReadMoreItem] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    const fetchReadMoreData = async () => {
      const { data, error } = await supabase.from('MewsShopData').select();

      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        const foundItem = data.find(item => slugify(item.title) === slug);
        if (foundItem) {
          setReadMoreItem(foundItem);
        }
      }
    };

    fetchReadMoreData();
  }, []);

  // ====================================Language========================================
  const [language, setLanguage] = useContext(LanguageContext);

  return (
    <div>
      <header ref={headerRef} style={{ marginTop: isHomePage ? '40px' : '0', paddingTop: isHomePage ? '0' : '40px', position: isHomePage ? 'absolute' : 'relative', ...headerStyle }}>
        <div className="header-wrapper">
          <div className="header-container">
            <nav>
              <div className='navbar-elements'>
                {isHomePage ? (
                  <div ref={logoRef} className='logo'>
                    <NavLink className="" to='/'>
                      <svg width="120" height="19" viewBox="0 0 141 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M140.902 11.1957C140.408 7.83571 136.491 7.63738 133.898 7.50584C133.898 7.50584 123.2 7.208 122.071 7.15757C121.077 7.11327 119.923 6.9163 119.809 5.77813C119.691 4.58679 120.738 4.03406 121.689 3.82755C123.589 3.41453 125.489 3.38046 127.373 3.38046C131.515 3.38046 135.326 3.84663 139.349 4.60178L139.786 1.28812L139.789 1.26426C136.754 0.684951 132.556 0 128.073 0C125.976 0 124.003 0.122678 122.21 0.364626C120.092 0.650192 117.773 1.14908 116.635 2.67983C115.668 3.97953 115.569 6.17615 116.155 7.67418C117.161 10.2504 120.726 10.3492 122.948 10.4528C122.948 10.4528 133.711 10.7684 134.852 10.8209C135.845 10.8665 136.999 11.0696 137.112 12.2426C137.213 13.2894 136.534 14.0487 135.129 14.3485C133.293 14.7411 131.356 14.7943 129.473 14.7943C124.897 14.7943 120.856 14.3029 116.209 13.5634L115.831 16.9105C118.896 17.5382 123.604 18.2776 128.774 18.2776H128.838C130.811 18.2776 132.801 18.2763 134.758 17.9873C136.484 17.7317 138.294 17.3446 139.654 16.1315C140.992 14.9374 141.15 12.875 140.903 11.1964L140.902 11.1957Z" fill="#1C1D24"></path>
                        <path d="M15.2448 13.7757L4.54477 0.123047H0V18.1615H4.01899V5.65582L12.9253 17.0206C14.1846 18.627 16.3003 18.6331 17.5637 17.0206L26.47 5.65582V18.1615H30.4883V0.123047H25.9435L15.2448 13.7757Z" fill="#1C1D24"></path>
                        <path d="M64.1113 0.123047H40.7402V18.1614H64.3071L64.898 14.5131H44.7592V10.9664H63.3133V7.31809H44.7592V3.77134H64.1113V0.123047Z" fill="#1C1D24"></path>
                        <path d="M102.892 18.1564L110.223 0.123411H106.075L100.464 13.9267L93.8506 1.76525C93.2564 0.704087 92.1551 0.0498047 90.9628 0.0498047C89.7705 0.0498047 88.6692 0.704087 88.075 1.76525L81.4617 13.9267L75.8501 0.123411H71.7017L79.032 18.1564H83.2972L90.9621 3.92847L98.627 18.1564H102.892Z" fill="#1C1D24"></path>
                      </svg>
                    </NavLink>
                  </div>
                ) : (
                  <div className='title-on-other-pages logo' ref={logoRef}>
                    <NavLink to='/' className='' style={{ textDecoration: 'none', color: headerStyle.color }}>
                      <h1 style={{ fontSize: '25px', fontWeight: 'bold' }}>Unfold</h1>
                    </NavLink>
                  </div>
                )}
                <div className={`list-components ${sidebar ? 'active' : ''}`}>
                  <ul ref={appRef} className={`nav-links responsive-navbar-list-elemets ${sidebar ? 'active' : ''}`}>
                    <NavLink onClick={() => setSidebar(false)} to='/' className='responsive-unfold mb-3' style={{ textDecoration: 'none' }}>
                      <h1>Unfold</h1>
                    </NavLink>
                    <li className='list-group-item'><NavLink onClick={() => setSidebar(false)} to='/speakers' className='link-element' style={{ color: headerStyle.color }}>{language === 'AZ' ? 'Spikerlər' : 'Speakers'}</NavLink></li>
                    <li className='list-group-item'><NavLink onClick={() => setSidebar(false)} to='/tickets' className='link-element' style={{ color: headerStyle.color }}>{language === 'AZ' ? 'Biletlər' : 'Tickets'}</NavLink></li>
                    <li className='list-group-item'><NavLink onClick={() => setSidebar(false)} to='/blog' className='link-element' style={{ color: headerStyle.color }}>{language === 'AZ' ? 'Bloq' : 'Blog'}</NavLink></li>
                    <li className='list-group-item'><NavLink onClick={() => setSidebar(false)} to='/partners' className='link-element' style={{ color: headerStyle.color }}>{language === 'AZ' ? 'Tərəfdaşlar' : 'Partners'}</NavLink></li>
                    <li className='list-group-item'><NavLink onClick={() => setSidebar(false)} to='/contact' className='link-element' style={{ color: headerStyle.color }}>{language === 'AZ' ? 'Əlaqə' : 'Contact'}</NavLink></li>
                    <li className='list-group-item'><NavLink onClick={() => setSidebar(false)} to='/faq' className='link-element' style={{ color: headerStyle.color }}>FAQ</NavLink></li>
                  </ul>
                </div>
                <div className={`right-buttons ${sidebar ? 'position-relative' : ''}`}>
                  <div className='d-flex align-items-center' style={{ gap: '10px' }}>
                    <div ref={domNode}>
                      <div className='search-div'>
                        <div onClick={handleOpenModal} style={{ cursor: 'pointer' }} ref={searchNavbarRef} className='search-navbar-button'>
                          <i class="fa-solid fa-magnifying-glass" style={{ color: headerStyle.color }}></i>
                        </div>
                        {showModal && (
                          <div className='modal'>
                            <div className="modal-content">
                              <span className="close" onClick={handleCloseModal}><TfiClose /></span>
                              <div className='input-button-div mt-3'>
                                <input
                                  onChange={e => setKeyword(e.target.value)}
                                  className='search-input mt-3'
                                  type="text"
                                  placeholder={language ==='AZ'? 'Məhsul axtarın': 'Search product'} />
                                <button>
                                  <i class="fa-solid fa-magnifying-glass" style={{ color: 'rgba(0, 0, 0, 0.3)', }}></i>
                                </button>
                              </div>

                              <div>
                                <ul className="list-group">
                                  {!keyword ? (
                                    product.map(item => (
                                      <div className='d-flex align-items-center justify-content-between products-link-div'>
                                        <span key={item.id} data-bs-dismiss="modal" className='d-flex align-items-center'>
                                          <div>
                                            <CiClock2 style={{ fontSize: '20px' }} />
                                          </div>
                                          <Link to={`/tickets/${slugify(item.title)}`} className="list-group-item products-link-button d-flex align-items-center" onClick={() => setShowModal(false)}>
                                            <img style={{ objectFit: "contain", width: '100px', height: '70px' }} src={item.image} alt="img" />
                                            <div>
                                              <div className="ms-3" style={{ fontSize: '13px', color: '#abaaff' }}>{item.category}</div>
                                              <div className="ms-3">{item.title}</div>
                                            </div>
                                          </Link>
                                        </span>
                                        <div>
                                          <Link to={`/tickets/${slugify(item.title)}`}
                                            style={{ padding: '0', margin: '0', border: 'none', background: 'none', textDecoration: 'none' }}
                                            onClick={() => removeEventListener(searchSystem())}>
                                            <CiCircleChevRight className='mx-3' style={{ fontSize: '20px', cursor: 'pointer' }} />
                                          </Link>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    product.filter(p => p.title.toLocaleLowerCase().includes(keyword)).map(item => (
                                      <div className='d-flex align-items-center justify-content-between products-link-div'>
                                        <span key={item.id} data-bs-dismiss="modal" className='d-flex align-items-center'>
                                          <div>
                                            <CiClock2 style={{ fontSize: '20px' }} />
                                          </div>
                                          <Link to={`/tickets/${slugify(item.title)}`} className="list-group-item products-link-button d-flex align-items-center" onClick={() => setShowModal(false)}>
                                            <img style={{ objectFit: "contain", width: '100px', height: '70px' }} src={item.image} alt="img" />
                                            <div>
                                              <div className="ms-3" style={{ fontSize: '13px', color: '#abaaff' }}>{item.category}</div>
                                              <div className="ms-3">{item.title}</div>
                                            </div>
                                          </Link>
                                        </span>
                                        <div>
                                          <Link to={`/tickets/${slugify(item.title)}`}
                                            style={{ padding: '0', margin: '0', border: 'none', background: 'none', textDecoration: 'none' }}
                                            onClick={() => removeEventListener(searchSystem())}>
                                            <CiCircleChevRight className='mx-3' style={{ fontSize: '20px', cursor: 'pointer' }} />
                                          </Link>
                                        </div>
                                      </div>
                                    ))
                                  )}
                                  {/* Render message when no products match the keyword */}
                                  {keyword && product.filter(p => p.title.toLocaleLowerCase().includes(keyword)).length === 0 && (
                                    <div className='d-flex algin-items-center justify-content-center'>
                                      <img src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png?f=webp"
                                        alt=""
                                        style={{ width: '100%' }} />
                                    </div>
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className='d-flex align-items-center user-buttons' style={{ gap: '5px' }} ref={userButtons}>
                      <div>
                        <div className='submenu-navbar'>
                          <div class="btn-group">
                            {cookie['cookie-ticket'] ?
                              <button
                                style={{ color: headerStyle.color, fontSize: '20px' }}
                                type="button"
                                class="dropdown-toggle d-flex align-items-center"
                                data-bs-toggle="dropdown" aria-expanded="false">

                                <img src={filterUsersData.image}
                                  style={{ width: '30px', height: '30px', borderRadius: '50%', border: 'none', objectFit: 'cover' }}
                                  alt="" />
                              </button> : <button type="button" class="dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-regular fa-circle-user" style={{ color: headerStyle.color, fontSize: '30px' }}></i>
                              </button>}

                            <ul class="dropdown-menu" style={{ border: 'none', padding: '10px 10px' }}>
                              <li className='mb-2 mt-2 d-flex align-items-center justify-content-center' style={{ background: '#e6e5ff', borderRadius: '50em', padding: '5px 0px', width: '250px' }}>
                                <li className=' text-center' style={{ paddingTop: '0', paddingBottom: '0px', paddingRight: '0', background: '#e6e5ff', borderRadius: '50em' }}>
                                  <img src={filterUsersData === undefined ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_MSPMMkrHOPpLPvlAfkGLNxnxE94UL0qH7iiPgZXiCSEpO57dSCksqZjHgJnyZHYma_8&usqp=CAU'
                                    : filterUsersData.image
                                  } style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover', border: 'none' }}
                                    alt="" />
                                </li>
                                <li className=''
                                  style={{ paddingTop: '0', paddingBottom: '0', paddingLeft: '10px', background: '#e6e5ff', borderRadius: '50em', fontSize: '14px' }}>
                                  {filterUsersData === undefined ? <li>youremail@gmail.com</li> : filterUsersData.email}
                                </li>
                              </li>
                              <div className='mb-2' style={{ width: '100%', height: '0.1px', background: 'black', opacity: '0.3' }}></div>
                              <li>
                                <button className='fgfgf' onClick={() => {
                                  language === 'EN' ? setLanguage('AZ') : setLanguage('EN');
                                  language === 'EN' ? localStorage.setItem('languageMode', 'AZ') : localStorage.setItem('languageMode', 'EN');
                                }} class=" d-flex align-items-center" style={{ gap: '5px', border: 'none' }}>
                                  <CiGlobe />
                                  {language}
                                </button>
                              </li>

                              <li>
                                <button onClick={() => {
                                  mode === 'Dark' ? setMode('Light') : setMode('Dark');
                                  mode === 'Light' ? localStorage.setItem('mode', 'Dark') : localStorage.setItem('mode', 'Light');
                                }} class=" d-flex align-items-center my-2" style={{ gap: '5px', border: 'none' }}>
                                  <MdOutlineLightMode />
                                  {mode}
                                </button>
                              </li>
                              <li className=''>
                                {cookie['cookie-ticket'] === undefined ?
                                  <div className='d-flex align-items-center mx-2'>
                                    <Link to='/login' className='d-flex align-items-center' style={{ color: 'black', textDecoration: 'none' }}>
                                      <PiShoppingCartSimpleThin style={{ color: 'white', fontSize: '20px' }} />
                                      <div className='count mx-1' style={{ textDecoration: 'none', color: 'black' }}>
                                        (0)
                                      </div>
                                    </Link>
                                    <span className='mx-1'>|</span>
                                    <Link to='/login' className='d-flex align-items-center' style={{ color: 'black', textDecoration: 'none' }}>
                                      <CiHeart style={{ color: 'white', fontSize: '20px' }} />
                                      <div className='count mx-1' style={{ textDecoration: 'none', color: 'black' }}>
                                        (0)
                                      </div>
                                    </Link>
                                  </div> :
                                  <div className='d-flex align-items-center mx-2'>
                                    <Link to='/tickets/addToCard' className='d-flex align-items-center' style={{ color: 'black', textDecoration: 'none' }}>
                                      <PiShoppingCartSimpleThin style={{ color: 'white', fontSize: '20px' }} />
                                      <div className='count mx-1' style={{ textDecoration: 'none', color: 'black' }}>
                                        ({basketQuantity})
                                      </div>
                                    </Link>
                                    <span className='mx-1'>|</span>
                                    <Link to='/tickets/wishlist' className='d-flex align-items-center' style={{ color: 'black', textDecoration: 'none' }}>
                                      <CiHeart style={{ color: 'white', fontSize: '20px' }} />
                                      <div className='count mx-1' style={{ textDecoration: 'none', color: 'black' }}>
                                        ({wishlistFilterQuantity})
                                      </div>
                                    </Link>
                                  </div>}
                              </li>

                              {(cookie['cookie-ticket'] || cookie['adminToken'] === '000000000000') ? <ul style={{ margin: '0', padding: '0' }}>
                                <li className='list-group-item mx-2'>
                                  <Link to={`/account/${cookie['cookie-ticket']}`} style={{ gap: '5px', color: 'black', textDecoration: 'none' }} class=" d-flex align-items-center my-2">
                                    <CiUser />
                                    Hi, {cookie['cookie-ticket'] ? localStorage.getItem('userName') : 'Admin'}
                                  </Link>
                                </li>
                                <li className='list-group-item'>
                                  <button style={{ gap: '5px', color: 'black', textDecoration: 'none', border: 'none' }} class=" d-flex align-items-center my-2"
                                    onClick={() => { removeCookie('cookie-ticket'); removeCookie('adminToken'); window.location.assign('/') }}>
                                    <CiLogout />
                                    {language === 'AZ' ? 'Çıxış' : 'Log out'}
                                  </button>
                                </li>
                              </ul> : <li className='d-flex'>
                                <ul style={{ margin: '0', padding: '0' }}>
                                  <li className='list-group-item mx-2'>
                                    <Link style={{ gap: '5px', color: 'black', textDecoration: 'none' }} to='/login' class=" d-flex align-items-center my-2">
                                      <CiLogin />
                                      {language === 'AZ' ? 'Daxil ol' : 'Login'}
                                    </Link>
                                  </li>
                                  <li className='list-group-item mx-2'>
                                    <Link style={{ gap: '5px', color: 'black', textDecoration: 'none' }} to='/register' class="d-flex align-items-center">
                                      <CiUser />
                                      {language === 'AZ' ? 'Qeydiyyatdan keçin' : 'Register'}
                                    </Link>
                                  </li>
                                </ul>
                              </li>
                              }
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={toggleSidebar}
                      className='responsive-navbar-menu'>
                      {sidebar ? <button className='close-button'><MdClose style={{ color: 'black' }} /></button> :
                        <button className='open-button'><i class="fa-solid fa-bars" style={{ color: headerStyle.color }}></i></button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
