import React, { useState, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import supabase from '../../tools/config/connect';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import Swal from 'sweetalert2';
import { LanguageContext } from '../../context/Language';
import Aos from 'aos';

const ShopSingleCard = ({ id, image, text, title, information, price, alldata, languageText, languageInformation }) => {
    const [cookie] = useCookies(['cookie-ticket', 'adminToken']);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [blog, setBlog] = useState([]);
    const [language, setLanguage] = useContext(LanguageContext);

    useEffect(() => {
        const fetchBlogData = async () => {
            const { data, error } = await supabase.from('MewsShopData').select();
            if (error) console.error('Error fetching blog data:', error);
            else setBlog(data);
        };

        fetchBlogData();
    }, []);

    useEffect(() => {
        Aos.init();
    }, []);

    useEffect(() => {
        const checkWishlist = async () => {
            const { data, error } = await supabase
                .from('Wishlist')
                .select()
                .eq('wishlist_user_token', cookie['cookie-ticket']);

            if (data && data.length > 0) {
                const find = data.some(item => item.wishlist_products.some(p => p.id === alldata.id));
                setIsInWishlist(find);
            }
        };

        if (cookie['cookie-ticket']) checkWishlist();
    }, [cookie, alldata]);

    const dataSendToBasket = async () => {
        try {
            const { data, error } = await supabase
                .from('Basket')
                .select()
                .eq('user_token', cookie['cookie-ticket']);

            if (error) throw error;

            const basket = data[0];
            if (!basket) {
                const { error } = await supabase
                    .from('Basket')
                    .insert({ user_token: cookie['cookie-ticket'], products: [alldata] });

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('Basket')
                    .update({ products: [...basket.products, alldata] })
                    .eq('user_token', cookie['cookie-ticket']);

                if (error) throw error;
            }

            Swal.fire('Added', '', 'success');
        } catch (error) {
            console.error('Error adding to basket:', error);
        }
    };

    const dataSendToWishlist = async () => {
        try {
            const { data, error } = await supabase
                .from('Wishlist')
                .select()
                .eq('wishlist_user_token', cookie['cookie-ticket']);
    
            if (error) throw error;
    
            const wishlist = data[0];
            const quantityToAdd = 1;
            const currentTotalQuantity = wishlist?.TotalQuantity || 0;
    
            if (!wishlist) {
                const { error } = await supabase
                    .from('Wishlist')
                    .insert({ 
                        wishlist_user_token: cookie['cookie-ticket'], 
                        wishlist_products: [alldata], 
                        TotalQuantity: quantityToAdd
                    });
    
                if (error) throw error;
            } else {
                const updatedProducts = [...wishlist.wishlist_products, alldata];
                const newTotalQuantity = currentTotalQuantity + quantityToAdd;
    
                const { error } = await supabase
                    .from('Wishlist')
                    .update({ 
                        wishlist_products: updatedProducts,
                        TotalQuantity: newTotalQuantity 
                    })
                    .eq('wishlist_user_token', cookie['cookie-ticket']);
    
                if (error) throw error;
            }
    
            setIsInWishlist(true);
            Swal.fire('Added', '', 'success');
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    };

    
    // ======================================Admin===================================================================
    const deleteInformation = async (id) => {
        try {
            const { error } = await supabase
                .from('MewsShopData')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setBlog(prevBlog => prevBlog.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting blog post:', error);
        }
    };

    return (
        <div className='singleCard'>
            <div className="col">
                <div className="card">
                    <div className='hover-buttons d-flex'>
                        <div className="hover-information" style={{ fontSize: '18px' }}>$ {price}</div>
                        <div>
                            {cookie['cookie-ticket'] === undefined ? (
                                <Link to='/login'>
                                    <FaRegHeart style={{ fontSize: '20px', color: 'red' }} />
                                </Link>
                            ) : (
                                <button className='wishlist-button' onClick={() => {
                                    dataSendToWishlist();
                                    setIsInWishlist(!isInWishlist);
                                }}>
                                    {isInWishlist ? <FaHeart style={{ fontSize: '20px', color: 'red' }} /> : <FaRegHeart style={{ fontSize: '20px', color: 'red' }} />}
                                </button>
                            )}
                        </div>
                    </div>
                    <img src={image} className="card-img-top" alt={image} />
                    <div className="card-body">
                        <p className="text my-3 ms-2">{language === 'AZ' ? languageText : text}</p>
                        <h5 className="title" style={{ color: 'white' }}>{title}</h5>
                        <p className="information my-3">{language === 'AZ' ? languageInformation : information}</p>
                        <div className='buttons mb-3'>
                            <Link to={`/tickets/${slugify(alldata.title)}`} onClick={() => window.location.replace('#top')} className="btn">
                                {language === 'AZ' ? 'Daha ətraflı' : 'Read More'}
                            </Link>
                            {cookie['cookie-ticket'] === undefined ? (
                                <Link to='/login' className="btn" style={{ textDecoration: 'none' }}>
                                    {language === 'AZ' ? 'Səbətə əlavə et' : 'Add to cart'}
                                </Link>
                            ) : (
                                <button className="btn" onClick={dataSendToBasket}>
                                    {language === 'AZ' ? 'Səbətə əlavə et' : 'Add to cart'}
                                </button>
                            )}
                        </div>
                    </div>
                    {cookie['adminToken'] === '000000000000' && (
                        <div className='text-start mb-3 mt-1 mx-4'>
                            <button className='btn btn-info' style={{ cursor: 'pointer', border: '1px solid red', background: 'red' }} onClick={() => deleteInformation(id)}>
                                Delete Ticket
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShopSingleCard;
