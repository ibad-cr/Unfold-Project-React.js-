import React from 'react'
import { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import supabase from '../tools/config/connect';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/Language';
import { useContext } from 'react';

const AddToCart = ({ languageInformation }) => {

    const [cookie, setCookie, removeCookie] = useCookies();
    const [basket, setBasket] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('Basket').select();
            if (error) {
                console.log(error);
            } else {
                setBasket(data);
            }
        }
        fetchData();
    }, [])

    const findBasket = basket.find(item => (item.user_token === cookie['cookie-ticket']))

    // ======================================DELETECART=========================================
    const deleteCart = (deleteProductsId, id) => {
        const handleData = findBasket.products.filter((item) => {
            return item.id !== id;
        });

        const updateBasket = async (dataArr) => {
            const { error } = await supabase
                .from("Basket")
                .update({ user_token: cookie["cookie-ticket"], products: dataArr })
                .eq("id", deleteProductsId);
            console.log(error);
        };

        updateBasket(handleData);
    };

    // ======================================quantity, increment, decrement, price=========================================
    const updateProductQuantity = async (productId, newQuantity, basePrice) => {
        const updatedProducts = findBasket.products.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity, price: basePrice * newQuantity } : item
        );

        const totalQuantity = sumQuantities(updatedProducts);

        const { error } = await supabase
            .from('Basket')
            .update({
                user_token: cookie['cookie-ticket'],
                products: updatedProducts,
                TotalQuantity: totalQuantity
            })
            .eq('id', findBasket.id);

        if (!error) {
            setBasket(basket.map(item => item.id === findBasket.id ? { ...item, products: updatedProducts, TotalQuantity: totalQuantity } : item));
        } else {
            console.log(error);
        }
    };

    const sumQuantities = (products) => {
        return products.reduce((acc, obj) => acc + obj.quantity, 0);
    };

    // ============================ReadMore=====================================================================================
    const [accordion, setAccordion] = useState(null);

    const toggle = (i) => {
        if (accordion === i) {
            return setAccordion(null);
        }
        setAccordion(i);
    };

    // ============================TOTALPRICE=====================================================================================
    const totalPrice = () => {
        if (!findBasket) return 0;
        return findBasket.products.reduce((total, item) => {
            return total + item.price;
        }, 0);
    }

    // ====================================Language========================================
    const [language, setLanguage] = useContext(LanguageContext);

    return (
        <div>
            {(findBasket === undefined || findBasket?.products?.length === 0) ? (<div style={{ position: 'relative' }}>
                <div className='d-flex align-items-center justify-content-center'>
                    <img src="https://cdn.dribbble.com/users/1753953/screenshots/3818675/animasi-emptystate.gif" alt="" />
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
                        }}>{language === 'AZ' ? 'Biletlər' : 'Tickets'}</Link>
                </div>
            </div>) :
                <div>
                    <div className='container d-flex justify-content-between align-items-center mb-5 mt-5' style={{ borderBottom: '1px solid black', paddingBottom: '10px' }}>
                        <div>
                            <div>{language === 'AZ' ? 'Ümumi qiymət:' : 'Total price:'} <strong>$</strong><span><strong>{totalPrice().toFixed(2)}</strong></span></div>
                        </div>
                        <div className='d-flex align-items-center' style={{ gap: '20px' }}>
                            <Link to='/tickets/addToCart/completeOrder'
                                style={{ textDecoration: 'none', color: 'black', borderBottom: '1px solid black', padding: '0px 5px' }}>
                                {language === 'AZ' ? 'Sifarişi Tamamla' : 'Complete Order'}
                            </Link>
                            <div className='clear-button' style={{ cursor: 'pointer' }} onClick={() => {
                                const deleteAllData = async () => {
                                    const { data, error } = await supabase
                                        .from('Basket')
                                        .delete()
                                        .match({ user_token: cookie['cookie-ticket'] });

                                    if (error) {
                                        console.log(error);
                                    } else {
                                        window.location.reload();
                                    }
                                };

                                deleteAllData();

                            }}>{language === 'AZ' ? 'Səbəti təmizlə' : 'Clear the basket'}</div>
                        </div>
                    </div>
                    {(findBasket.products.map((item, count) => (
                        <div>
                            <div key={item.id} className='container mt-5 mb-5'>
                                <div>
                                    <div className='cart-information'>
                                        <div className='image-texts'>
                                            <div className='count animate__animated animate__fadeInLeft'>
                                                <p>
                                                    {count + 1}
                                                </p>
                                            </div>
                                            <div className='ticekts-image'>
                                                <img
                                                    src={item.image}
                                                    alt={item.image}
                                                    className='animate__animated animate__fadeInLeft' />
                                            </div>
                                            <div className='content animate__animated animate__fadeInLeft animate__delay-1s'>
                                                <div className='d-flex align-items-center justify-content-between'>
                                                    <p style={{ margin: '0', padding: '0' }}>{item.text}</p>
                                                    <div className='trash-button'>
                                                        <button class="btn" onClick={() => {
                                                            deleteCart(findBasket.id, item.id); window.location.reload();
                                                        }}>
                                                            <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
                                                                <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <h3 className='my-3' style={{ margin: '0', padding: '0' }}>{item.title}</h3>

                                                <div className='add-to-cart-toggle-div mb-2' style={{ padding: '10px' }} onClick={() => toggle(count)}>
                                                    <div className='d-flex justify-content-between' onClick={() => toggle(index)}>
                                                        <button className='add-to-cart-open-button'>
                                                            {language === 'AZ' ? 'Daha ətraflı' : 'Read More'}
                                                            <span className={`add-to-cart-open-button mx-2 ${accordion === count ? 'clicked' : ''}`}><RiArrowDownSLine /></span>
                                                        </button>
                                                    </div>
                                                    <div className='mt-1'>
                                                        <p className={accordion === count ? 'text active' : 'text'}>
                                                            {language === 'AZ' ? item.languageInformation : item.information}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className='number-of-people'>
                                                    <div>
                                                        <div className=''>
                                                            <h6>{language === 'AZ' ? 'İnsan sayı:' : 'Number of people:'}</h6>
                                                        </div>
                                                        <div className='number-of-people-buttons'>
                                                            <button onClick={() => {
                                                                if (item.quantity > 1) {
                                                                    updateProductQuantity(item.id, item.quantity - 1, item.price / item.quantity);
                                                                }
                                                            }} style={{ cursor: 'pointer' }}>-</button>
                                                            <span className='mx-3' style={{ color: 'black' }}>{item.quantity}</span>
                                                            <button style={{ cursor: 'pointer' }} onClick={() => updateProductQuantity(item.id, item.quantity + 1, item.price / item.quantity)}>+</button>
                                                        </div>
                                                        <div>
                                                            <p>{language === 'AZ' ? 'Qiymət:' : 'Price:'} <span style={{ fontSize: '14px' }}>$ {(item.price)}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className='line'></div>
                                                    <div className='mt-2 complete-button'>
                                                        <button class="button">
                                                            {language === 'AZ' ? 'Sifarişi tamamla' : 'Complete the order'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )))}
                </div>
            }
        </div >
    )
}

export default AddToCart;
