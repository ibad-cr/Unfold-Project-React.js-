import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { CiLogout } from 'react-icons/ci';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import supabase from '../../tools/config/connect';
import OrderRecommedProductsSlickSlide from './OrderRecommedProductsSlickSlide';
import Aos from 'aos';

const Account = ({ index }) => {
    const { token } = useParams();
    const user = useSelector(state => state.user);
    const filterUsers = user.find(item => item.token === token);

    const [cookie, setCookie, removeCookie] = useCookies(['cookie-ticket']);

    // Accordion state
    const [accordion, setAccordion] = useState(null);

    const toggle = (i) => {
        if (accordion === i) {
            setAccordion(null);
        } else {
            setAccordion(i);
        }
    };

    // Order state
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const receipt = async () => {
            const { data, error } = await supabase.from('CompleteOrder').select();
            if (error) {
                console.log(error);
            } else {
                setOrder(data);
            }
        };
        receipt();
    }, []);

    const filterCompleteOrderUsers = order.filter(item => item.complete_order_user_token === cookie['cookie-ticket']);

    // Basket state
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
    }, []);

    const findBasket = basket.find(item => item.user_token === cookie['cookie-ticket']);

    // Total Price
    const totalPrice = () => {
        if (!filterCompleteOrderUsers || filterCompleteOrderUsers.length === 0) return 0;

        return filterCompleteOrderUsers.flatMap(orderItem =>
            orderItem.complete_order_products.flatMap(product =>
                product.products.map(item => item.price)
            )
        ).reduce((total, price) => total + price, 0);
    }

    // =======================================MEWSSHOPDATA===========================================================
    const shop = useSelector(state => state.shop);

    const [filteredShop, setFilteredShop] = useState([]);

    useEffect(() => {
        setFilteredShop(shop);
    }, [shop]);

    // ======================AOS======================================================================
    useEffect(() => {
        Aos.init();
    }, [])

    return (
        <>
            {!filterUsers ? <div>Loading...</div> :
                <div className='account-page container'>
                    <div className='account-page-elements'>
                        <div className='d-flex justify-content-center' data-aos="zoom-in-down" data-aos-duration="1000">
                            <div className='users-image'>
                                <img src={filterUsers.image} alt="User" />
                                <div className='ms-4'>
                                    <h2>Hi, <span style={{ color: '#b3b2fb' }}>{filterUsers.fullname}</span></h2>
                                    <h6>{filterUsers.email}</h6>
                                </div>
                            </div>
                        </div>
                        <div className='users-information mt-3'  data-aos="zoom-in-up" data-aos-duration="1000">
                            <h5>Fullname: {filterUsers.fullname}</h5>
                            <h5>Lastname: {filterUsers.lastname}</h5>
                            <h5>Email: {filterUsers.email}</h5>
                            <h5>
                                {filterCompleteOrderUsers.length > 0 ? (
                                    filterCompleteOrderUsers.map((orderItem, idx) => (
                                        <div key={idx} className='account-order-accordion'>
                                            <div className='account-order-toggle-div'>
                                                <div onClick={() => toggle(index)} className='d-flex align-items-center justify-content-between' style={{ cursor: 'pointer' }}>
                                                    <span>Order</span>
                                                    <span className={`open-button ${accordion === index ? 'clicked' : ''}`}><RiArrowDownSLine /></span>
                                                </div>
                                                <div className={accordion === index ? 'text active' : 'text'}>
                                                    <div>
                                                        {orderItem.complete_order_products.map((product, productIdx) => (
                                                            <div key={productIdx} className='mt-4'>
                                                                <div className='account-basket-information my-4' style={{ border: '1px solid #bdbcff', borderRadius: '6px', padding: '10px', fontSize: '17px' }}>
                                                                    {product.products.map((item, key) => (
                                                                        <div key={key} className='d-flex justify-content-between'>
                                                                            <div className='d-flex justify-content-between mb-2'>
                                                                                {item.title}
                                                                                <span className='mx-2'>({item.quantity})</span>
                                                                            </div>
                                                                            <div>
                                                                                $ {item.price}
                                                                            </div>
                                                                        </div>
                                                                    ))}

                                                                    <div className='d-flex justify-content-end mt-3'
                                                                        style={{ borderTop: '1px solid #bdbcff', width: '100%', fontSize: '17px' }}>
                                                                        <span className='mt-1'>Total Price: $ {totalPrice()} </span>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className='d-flex text-center' style={{ gap: '10px', fontSize: '17px' }}>
                                                                        <div
                                                                            style={{ width: '100%', border: '1px solid #bdbcff', borderRadius: '6px' }}>
                                                                            Email: {product.email}
                                                                        </div>
                                                                        <div style={{ width: '100%', border: '1px solid #bdbcff', borderRadius: '6px' }}>
                                                                            Phone: {product.phone}
                                                                        </div>
                                                                    </div>
                                                                    <div className='d-flex text-center mt-3' style={{ gap: '10px', fontSize: '17px' }}>
                                                                        <div
                                                                            style={{ width: '100%', border: '1px solid #bdbcff', borderRadius: '6px' }}>
                                                                            Country: {product.country}
                                                                        </div>
                                                                        <div
                                                                            style={{ width: '100%', border: '1px solid #bdbcff', borderRadius: '6px' }}>
                                                                            City: {product.city}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='order-cart-information my-3'>
                                                                    <div className="visa-card">
                                                                        <div className="logoContainer">
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                x="0px"
                                                                                y="0px"
                                                                                width="23"
                                                                                height="23"
                                                                                viewBox="0 0 48 48"
                                                                                className="svgLogo"
                                                                            >
                                                                                <path
                                                                                    fill="#ff9800"
                                                                                    d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                                                                                ></path>
                                                                                <path
                                                                                    fill="#d50000"
                                                                                    d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                                                                                ></path>
                                                                                <path
                                                                                    fill="#ff3d00"
                                                                                    d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                                                                                ></path>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="number-container">
                                                                            <label className="input-label" htmlFor="cardNumber">CARD NUMBER</label>
                                                                            <input
                                                                                className="inputstyle"
                                                                                id="cardNumber"
                                                                                placeholder={product.cartNumber}
                                                                                name="cardNumber"
                                                                                type="text"
                                                                            />
                                                                        </div>
                                                                        <div className="name-date-cvv-container">
                                                                            <div className="name-wrapper">
                                                                                <label className="input-label" htmlFor="holderName">CARD HOLDER</label>
                                                                                <input
                                                                                    className="inputstyle"
                                                                                    id="holderName"
                                                                                    placeholder={product.fullname}
                                                                                    type="text"
                                                                                />
                                                                            </div>
                                                                            <div className="expiry-wrapper">
                                                                                <label className="input-label" htmlFor="expiry">VALID THRU</label>
                                                                                <input className="inputstyle" id="expiry" placeholder={product.date} type="text" />
                                                                            </div>
                                                                            <div className="cvv-wrapper">
                                                                                <label className="input-label" htmlFor="cvv">CVV</label>
                                                                                <input
                                                                                    className="inputstyle"
                                                                                    placeholder={product.cvv}
                                                                                    maxLength="3"
                                                                                    id="cvv"
                                                                                    type="password"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className='Recommended products mt-5 mb-3'>
                                                        <h5 className='text-center'>
                                                            <div className='mb-3' style={{
                                                                color: '#000',
                                                                fontSize: '18px',
                                                                border: '1px solid #bdbcff',
                                                                padding: '5px 0px 5px 10px',
                                                                borderRadius: '50em'
                                                            }}>Recommended products</div>
                                                            <div className='mt-4'>
                                                                <OrderRecommedProductsSlickSlide alldata={filteredShop} key={index} />
                                                            </div>
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>No orders found.</div>
                                )}
                            </h5>
                            <h5>
                                <div className='account-log-out-button d-flex align-items-center justify-content-end'>
                                    <button style={{ cursor: 'pointer', fontSize: '17px', border: 'none' }} className='d-flex align-items-center'
                                        onClick={() => {
                                            removeCookie('cookie-ticket');
                                            setTimeout(() => window.location.assign('/'), 1500);
                                        }}>
                                        <CiLogout style={{ marginRight: '5px' }} /> Logout
                                    </button>
                                </div>
                            </h5>
                        </div>
                    </div>
                </div>}
        </>
    );
}

export default Account;
