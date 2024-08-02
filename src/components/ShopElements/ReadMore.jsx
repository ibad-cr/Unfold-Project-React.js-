import React, { useState, useEffect } from 'react';
import supabase from '../../tools/config/connect';
import slugify from 'slugify';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { PiShoppingCartSimpleThin } from 'react-icons/pi';
import { CiHeart } from 'react-icons/ci';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';
import { FaHeart } from 'react-icons/fa';
import Preloader from '../Preloader';

const ReadMore = () => {
    const [readMoreitem, setReadMoreItem] = useState({});
    const [cookie] = useCookies(['cookie-ticket']);

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
    }, [slug]);


    // =====================ReadMoreAddToBasket============================================================
    const addToBasket = async () => {
        const { data, error } = await supabase.from('Basket').select();
        const findReadMoreUser = data.find(user => user.user_token === cookie['cookie-ticket']);

        if (findReadMoreUser === undefined) {
            const { data, error } = await supabase.from('Basket').insert({
                user_token: cookie['cookie-ticket'],
                products: [readMoreitem]
            });
            if (error) {
                console.log(error);
            } else {
                Swal.fire('Added', '', 'success');
            }
        } else {
            const myReadMoreData = data.find(user => user.user_token === cookie['cookie-ticket']);
            const updatedReadMoreProducts = [...myReadMoreData.products, readMoreitem];
            const { error } = await supabase.from('Basket')
                .update({ products: updatedReadMoreProducts })
                .eq('user_token', cookie['cookie-ticket']);
            if (error) {
                console.log(error);
            } else {
                Swal.fire('Added', '', 'success');
            }
        }
    };

    // =====================ReadMoreAddToWishlist============================================================
    const dataSendToWishlist = async () => {
        const { data, error } = await supabase.from('Wishlist').select();
        const findReadMoreUser = data.find(user => user.user_token === cookie['cookie-ticket']);

        if (findReadMoreUser === undefined) {
            const { data, error } = await supabase.from('Wishlist').insert({
                wishlist_user_token: cookie['cookie-ticket'],
                wishlist_products: [readMoreitem]
            });
            if (error) {
                console.log(error);
            } else {
                Swal.fire('Added', '', 'success');
            }
        } else {
            const myReadMoreData = data.find(user => user.user_token === cookie['cookie-ticket']);
            const updatedReadMoreProducts = [...myReadMoreData.products, readMoreitem];
            const { error } = await supabase.from('Wishlist')
                .update({ wishlist_products: updatedReadMoreProducts })
                .eq('user_token', cookie['cookie-ticket']);

            if (error) {
                console.log(error);
            }
        }
    };

    // ============================CHANGEHEARTICON==================================
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        const checkWishlist = async () => {
            const { data, error } = await supabase
                .from('Wishlist')
                .select()
                .eq('wishlist_user_token', cookie['cookie-ticket']);

            if (data && data.length > 0) {
                const find = data.find(item => item.wishlist_products.find(p => p.id === readMoreitem.id));
                setIsInWishlist(find);
            }
        };

        checkWishlist();
    }, [cookie, readMoreitem]);

    const changeIcon = () => {
        setIsInWishlist(!isInWishlist);
    };


    return (
        <div>
            {readMoreitem.length === 0 ? (
                <h1><Preloader /></h1>
            ) : (
                <div className='read-more-wrapper'>
                    <div className='read-more-container'>
                        <div className="col-xxl-12 px-4 py-5">
                            <div className="row flex-lg-row align-items-center g-5 py-5">
                                <div className="col-6 col-sm-12 col-lg-12">
                                    <img
                                        src={readMoreitem.image}
                                        className="d-block mx-lg-auto img-fluid read-more-image"
                                        alt="Bootstrap Themes"
                                        style={{ width: '100%' }}
                                        height="500"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="col-lg-12">
                                    <h1 className="display-10 lh-1 mb-3 read-more-title">{readMoreitem.title}</h1>
                                    <p className="read-more-paragraph">
                                        {readMoreitem.readMore}
                                    </p>
                                    <div className="d-grid d-md-flex justify-content-md-start">
                                        <button
                                            type="button"
                                            className="read-more-add-to-cart-button me-md-2"
                                            onClick={() => addToBasket()}
                                        >
                                            <PiShoppingCartSimpleThin style={{ color: 'black', fontSize: '20px' }} />
                                        </button>

                                        <button
                                            type="button"
                                            className="read-more-wishlist-button me-md-2"
                                            onClick={() => { dataSendToWishlist(); changeIcon() }}>
                                            {isInWishlist ? <FaHeart style={{ fontSize: '20px', color: 'red' }} /> : <CiHeart style={{ fontSize: '20px' }} />}
                                        </button>
                                    </div>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                        <Link
                                            to='/tickets'
                                            type="button"
                                            className="read-more-back-button me-md-2"
                                            onClick={() => window.location.replace('#top')}
                                        >
                                            <IoIosArrowRoundBack className='me-2 fs-4 read-more-arrow' />
                                            Tickets
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default ReadMore;
