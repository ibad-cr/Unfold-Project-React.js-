import React, { useRef, useState, useEffect } from 'react';
import supabase from '../tools/config/connect';
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie';

const CompleteOrder = () => {
    const [cookie] = useCookies(['cookie-ticket']);
    const [basket, setBasket] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    // Form refs
    const fullname = useRef(null);
    const email = useRef(null);
    const phone = useRef(null);
    const cartNumber = useRef(null);
    const date = useRef(null);
    const cvv = useRef(null);
    const genderMale = useRef(null);
    const genderFemale = useRef(null);
    const genderOther = useRef(null);
    const country = useRef(null);
    const city = useRef(null);

    // Fetch basket data
    useEffect(() => {
        const fetchBasketData = async () => {
            const { data, error } = await supabase.from('Basket').select();
            if (error) {
                console.error(error);
            } else {
                setBasket(data);
            }
        };
        fetchBasketData();
    }, []);

    const findBasket = basket.find(item => item.user_token === cookie['cookie-ticket']);

    // Update selected products
    useEffect(() => {
        if (findBasket) {
            const productTitles = findBasket.products.map(item => ({
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                totalPrice: item.totalPrice
            }));
            setSelectedProducts(productTitles);
        }
    }, [findBasket]);

    // Handle form submission
    const formCompleteOrder = async (e) => {
        e.preventDefault();

        if (
            !fullname.current.value ||
            !email.current.value ||
            !phone.current.value ||
            !cartNumber.current.value ||
            !date.current.value ||
            !cvv.current.value ||
            !country.current.value ||
            !city.current.value ||
            (!genderMale.current.checked && !genderFemale.current.checked && !genderOther.current.checked)
        ) {
            Swal.fire('Please, fill all inputs', '', 'warning');
            return;
        }

        try {
            const { data, error: selectError } = await supabase.from('CompleteOrder').select();
            if (selectError) throw selectError;

            const findUser = data.find(item => item.complete_order_user_token === cookie['cookie-ticket']);
            // if (findUser) {
            //     Swal.fire('Order already exists', '', 'warning');
            //     return;
            // }

            const { data: userData, error: userError } = await supabase.from('Users').select().eq('email', email.current.value);
            if (!userData.length) {
                Swal.fire('Email is different', '', 'warning');
                return;
            }

            const selectedGender = genderMale.current.checked ? 'Male' : genderFemale.current.checked ? 'Female' : 'Prefer not to say';

            const orderData = {
                fullname: fullname.current.value,
                email: email.current.value,
                phone: phone.current.value,
                cartNumber: cartNumber.current.value,
                date: date.current.value,
                cvv: cvv.current.value,
                gender: selectedGender,
                country: country.current.value,
                city: city.current.value,
                products: selectedProducts,
            };

            const { error } = await supabase.from('CompleteOrder').insert({
                complete_order_user_token: cookie['cookie-ticket'],
                complete_order_products: [orderData],
            });

            if (error) {
                throw error;
            }

            Swal.fire('The product has been received', '', 'success');

            const { error: deleteError } = await supabase.from('Basket')
                .delete()
                .match({ user_token: cookie['cookie-ticket'] });
            if (deleteError) {
                console.error(deleteError);
            } else {
                setTimeout(() => window.location.assign(`/account/${cookie['cookie-ticket']}`), 1500);
            }

        } catch (error) {
            console.error(error);
            Swal.fire('Something went wrong!', '', 'error');
        }
    };

    return (
        <div className='container complete-order my-5 d-flex justify-content-between align-items-center'>
            <section className="mycontainer">
                <div>
                    {findBasket ? (
                        findBasket.products.map((item, index) => (
                            <div key={index} className='d-none'>
                                <li>{item.title}</li>
                                <li>{item.price}</li>
                                <li>{item.quantity}</li>
                            </div>
                        ))
                    ) : (
                        <div>Not found</div>
                    )}
                </div>
                <p className='order-form-title'>Complete Order Form</p>
                <form className="form" onSubmit={formCompleteOrder}>
                    <div className="input-box">
                        <label className='fw-bolder'>Full Name</label>
                        <input required placeholder="Enter full name" type="text" ref={fullname} />
                        <div className='mt-2'>
                            <label className='fw-bolder'>Email</label>
                            <input required placeholder="example@gmail.com" type="email" ref={email} />
                        </div>
                    </div>
                    <div className="column">
                        <div className="input-box">
                            <label className='fw-bolder'>Phone Number</label>
                            <input required placeholder="(+xxx) xxx xx xx" type="telephone" ref={phone} />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <div className="input-box">
                            <label className='fw-bolder'>Cart number</label>
                            <input required placeholder="xxxx xxxx xxxx xxxx" type="text" ref={cartNumber} />
                        </div>
                        <div className='d-flex'>
                            <div className="input-box">
                                <label className='fw-bolder'>Date</label>
                                <input required placeholder="xx/xx" type="text" ref={date} />
                            </div>
                            <div className="input-box ms-4">
                                <label className='fw-bolder'>CVV</label>
                                <input required placeholder="xxx" type="text" ref={cvv} />
                            </div>
                        </div>
                    </div>
                    <div className="gender-box mt-3">
                        <label className='fw-bolder'>Gender</label>
                        <div className="gender-option">
                            <div className="gender">
                                <input name="gender" id="check-male" type="radio" ref={genderMale} />
                                <label htmlFor="check-male">Male</label>
                            </div>
                            <div className="gender">
                                <input name="gender" id="check-female" type="radio" ref={genderFemale} />
                                <label htmlFor="check-female">Female</label>
                            </div>
                            <div className="gender">
                                <input name="gender" id="check-other" type="radio" ref={genderOther} />
                                <label htmlFor="check-other">Prefer not to say</label>
                            </div>
                        </div>
                    </div>
                    <div className="input-box address">
                        <label className='fw-bolder'>Address</label>
                        <div className="column">
                            <div className="select-box">
                                <select ref={country} style={{background: 'none'}}>
                                    <option hidden>Country</option>
                                    <option>Japan</option>
                                    <option>USA</option>
                                    <option>UK</option>
                                    <option>Germany</option>
                                </select>
                            </div>
                            <input required placeholder="Enter your city" type="text" ref={city} />
                        </div>
                    </div>
                    <button className='mt-4'>Submit</button>
                </form>
            </section>
            <div className='complete-order-image'>
                <img src="../../src/assets/img/pngwing.png" alt="" style={{ height: '70vh' }} />
            </div>
        </div>
    );
}

export default CompleteOrder;
