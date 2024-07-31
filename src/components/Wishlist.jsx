import React, { useState, useEffect } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import supabase from '../tools/config/connect';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Wishlist = ({ quantity }) => {
  const [cookie, setCookie, removeCookie] = useCookies();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlistData = async () => {
      const { data, error } = await supabase.from('Wishlist').select();
      if (error) {
        console.log(error);
      } else {
        setWishlist(data);
      }
    };
    fetchWishlistData();
  }, []);

  const findWishlist = wishlist.find(item => item.wishlist_user_token === cookie['cookie-ticket']);

  // ======================================DELETE CART=========================================
  const deleteWishlistCart = (deleteWishlistProductsId, id) => {
    const handleData = findWishlist.wishlist_products.filter(item => item.id !== id);

    const updateWishlist = async (dataWishlistArr) => {
      const { error } = await supabase
        .from('Wishlist')
        .update({ wishlist_user_token: cookie['cookie-ticket'], wishlist_products: dataWishlistArr })
        .eq('id', deleteWishlistProductsId);
      if (error) {
        console.log(error);
      }
    };

    updateWishlist(handleData);
  };


  // ====================================addToBasket==========================================================
  const addToBasket = async (item) => {
    const { data, error } = await supabase.from('Basket').select();
    const findUser = data.find(user => user.user_token === cookie['cookie-ticket']);

    if (findUser === undefined) {
      const { data, error } = await supabase.from('Basket').insert({
        user_token: cookie['cookie-ticket'],
        products: [item]
      });
      if (error) {
        console.log(error);
      } else {
        Swal.fire('Added', '', 'success');
      }
    } else {
      const myData = data.find(user => user.user_token === cookie['cookie-ticket']);
      const updatedProducts = [...myData.products, item];
      const { error } = await supabase.from('Basket')
        .update({ products: updatedProducts })
        .eq('user_token', cookie['cookie-ticket']);
      if (error) {
        console.log(error);
      } else {
        Swal.fire('Added', '', 'success');
      }
    }
  };

  // ============================ReadMore=====================================================================================
  const [accordion, setAccordion] = useState(null);

  const toggle = (i) => {
    if (accordion === i) {
      return setAccordion(null);
    }
    setAccordion(i);
  };


  return (
    <div>
      {(findWishlist === undefined || findWishlist?.wishlist_products?.length === 0) ? (
        <div style={{ position: 'relative' }}>
          <div className='d-flex align-items-center justify-content-center'>
            <img src="https://cdn.dribbble.com/users/1753953/screenshots/3818675/animasi-emptystate.gif" alt="Empty Wishlist" />
          </div>
          <div className=''
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}>
            <Link to='/tickets'
              style={{
                textDecoration: 'none',
                color: 'white',
                border: 'none',
                borderRadius: '50em',
                padding: '5px 60px',
                background: '#b3b2fb'
              }}>Tickets</Link>
          </div>
        </div>
      ) : (
        <div className='wishlist-scss'>
          <div className='container d-flex justify-content-between align-items-center mb-5 mt-5' style={{ borderBottom: '1px solid black', paddingBottom: '10px' }}>
            <div>Wishlist</div>
            <div className='wishlist-clear-button' style={{ cursor: 'pointer' }} onClick={() => {
              const deleteWishlistAllData = async () => {
                const { error } = await supabase
                  .from('Wishlist')
                  .delete()
                  .match({ wishlist_user_token: cookie['cookie-ticket'] });

                if (error) {
                  console.log(error);
                } else {
                  window.location.reload();
                }
              };

              deleteWishlistAllData();
            }}>Clear the Wishlist</div>
          </div>
          <div className='container mt-5 mb-5'>
            {findWishlist.wishlist_products.map((item, count) => (
              <div>
                <div className='wishlist-cart-information'>
                  <div className='wishlist-image-texts'>
                    <div className='wishlist-count animate__animated animate__fadeInLeft'>
                      <p>
                        {count + 1}
                      </p>
                    </div>
                    {item && (
                      <>
                        <div className='wishlist-ticekts-image'>
                          <img
                            src={item.image}
                            alt={item.image}
                            className='animate__animated animate__fadeInLeft' />
                        </div>
                        <div className='content animate__animated animate__fadeInLeft animate__delay-1s'>
                          <div className='d-flex align-items-center justify-content-between'>
                            <p style={{ margin: '0', padding: '0' }}>{item.text}</p>
                            <div className='wishlist-trash-button'>
                              <button className="btn" onClick={() => {
                                deleteWishlistCart(findWishlist.id, item.id); window.location.reload();
                              }}>
                                <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" className="icon">
                                  <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                          <h3 className='my-3' style={{ margin: '0', padding: '0' }}>{item.title}</h3>

                          <div className='wishlist-toggle-div mb-2' style={{ padding: '10px' }} onClick={() => toggle(count)}>
                            <div className='d-flex justify-content-between'>
                              <button className='wishlist-open-button'>
                                Read More
                                <span className={`wishlist-open-button mx-2 ${accordion === count ? 'clicked' : ''}`}><RiArrowDownSLine /></span>
                              </button>
                            </div>
                            <div className='mt-1'>
                              <p className={accordion === count ? 'text active' : 'text'}>
                                {item.information}
                              </p>
                            </div>
                          </div>

                          <div className='wishlist-complete-button'>
                            <button className='button' onClick={() => addToBasket(item)}>Add to card</button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
