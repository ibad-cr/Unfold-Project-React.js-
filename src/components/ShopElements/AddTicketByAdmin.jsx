import React, { useRef } from 'react';
import { useCookies } from 'react-cookie';
import supabase from '../../tools/config/connect'
import Swal from 'sweetalert2';

const AddTicketByAdmin = () => {
    const [cookie] = useCookies(['adminToken']);

    const price = useRef();
    const image = useRef();
    const text = useRef();
    const title = useRef();
    const information = useRef();
    const category = useRef();
    const readMore = useRef();
    const quantity = useRef();

    const blogAddInformation = async (e) => {
        e.preventDefault();

        if (!price.current.value || !image.current.value || !text.current.value || !title.current.value || !information.current.value || !category.current.value || !readMore.current.value || !quantity.current.value) {
            Swal.fire('Please fill input', '', 'warning');
            return;
        }

        if (cookie.adminToken) {
            const { data, error } = await supabase.from('MewsShopData').insert({
                price: price.current.value,
                image: image.current.value,
                text: text.current.value,
                title: title.current.value,
                information: information.current.value,
                category: category.current.value,
                readMore: readMore.current.value,
                quantity: quantity.current.value
            });

            if (error) {
                Swal.fire('Error adding ticket', error.message, 'error');
                return;
            }

            Swal.fire('Ticket added successfully', '', 'success');
            setTimeout(() => {
                window.location.assign('/tickets');
            }, 1500);
        } else {
            Swal.fire('You are not authorized', '', 'error');
        }
    };

    return (
        <div className='d-flex align-items-center justiyfy-content-center' style={{ background: '#1e1e25', height: '100vh' }}>
            <div className='container'>
                <form onSubmit={blogAddInformation} className='d-grid' style={{ gap: '20px' }}>
                    <div className='d-flex' style={{ gap: '20px' }}>
                        <input type="number" placeholder='Price' ref={price} style={{ borderRadius: '50em', border: '1px solid black', outline: 'none', padding: '5px 15px', width: '100%' }} />
                        <input type="text" placeholder='Image' ref={image} style={{ borderRadius: '50em', border: '1px solid black', outline: 'none', padding: '5px 15px', width: '100%' }} />
                    </div>
                    <div className='d-flex' style={{ gap: '20px' }}>
                        <input type="text" placeholder='Text' ref={text} style={{ borderRadius: '50em', border: '1px solid black', outline: 'none', padding: '5px 15px', width: '100%' }} />
                        <input type="text" placeholder='Title' ref={title} style={{ borderRadius: '50em', border: '1px solid black', outline: 'none', padding: '5px 15px', width: '100%' }} />
                    </div>
                    <div className='d-flex' style={{ gap: '20px' }}>
                        <input type="text" placeholder='Information' ref={information} style={{ borderRadius: '50em', border: '1px solid black', outline: 'none', padding: '5px 15px', width: '100%' }} />
                        <input type="text" placeholder='Information' ref={information} style={{ borderRadius: '50em', border: '1px solid black', outline: 'none', padding: '5px 15px', width: '100%' }} />
                    </div>
                    <div className='d-flex' style={{ gap: '20px' }}>
                        <input type="text" placeholder='Category' ref={category} style={{ borderRadius: '50em', border: '1px solid black', outline: 'none', padding: '5px 15px', width: '100%' }} />
                        <input type="text" placeholder='ReadMore' ref={readMore} style={{ borderRadius: '50em', border: '1px solid black', outline: 'none', padding: '5px 15px', width: '100%' }} />
                    </div>
                    <input type="number" placeholder='Quantity' ref={quantity} style={{ borderRadius: '50em', border: '1px solid black', outline: 'none', padding: '5px 15px', width: '100%' }} />
                    <button type="submit"
                        style={{ border: 'none', borderRadius: '50em', background: '#b3b2fb', padding: '5px 0px', fontSize: '17px' }}>
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddTicketByAdmin;
