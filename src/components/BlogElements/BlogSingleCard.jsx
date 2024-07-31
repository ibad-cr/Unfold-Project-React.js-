import React from 'react'
import supabase from '../../tools/config/connect';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Preloader from '../Preloader';
import { LanguageContext } from '../../context/Language';
import { useContext } from 'react';

const BlogSingleCard = () => {
    const [cookie] = useCookies(['cookie-ticket']);
    const [text, setText] = useState('');
    const [category, setCategory] = useState('');

    const blogAddInformation = async () => {
        const { data, error } = await supabase.from('BlogPage').select();
        if (error) {
            console.error(error);
        }

        const findUser = data.find(item => (item.user_token === cookie['cookie-ticket']));

        if (findUser === undefined) {
            const { data, error } = await supabase.from('BlogPage').insert({
                blog_user_token: cookie['cookie-ticket'],
                information: text,
                category: category
            });
            if (error) {
                console.error(error);
            } else {
                Swal.fire('Success', 'Information added successfully', 'success');
                setTimeout(() => {
                    window.location.assign('/blog')
                }, 1500);
            }
        } else {
            Swal.fire('Warning', 'User already exists', 'warning');
        }
    };

    const user = useSelector(item => item.user)
    const filterUsersImage = user.length == 0 ? "" : user.find(item => item.token === cookie['cookie-ticket'])

    // ====================================Language========================================
    const [language, setLanguage] = useContext(LanguageContext);

    return (
        <>
            <div className='blog-single-card container mb-5 mt-5'>
                <div className="blog-single-card-users-items mb-3 mt-4">
                    <div>
                        {filterUsersImage == undefined ? <div><Preloader /></div> :
                            <div className='blog-single-card-add-users-opinion'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className='blog-single-card-users-logo'>
                                        <img src={filterUsersImage.image} alt="" />
                                    </div>
                                    <div className='blog-single-card-users-email mx-2'>
                                        <h6>{filterUsersImage.fullname}</h6>
                                        <h6>{filterUsersImage.email}</h6>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="input-and-textArea mt-4">
                        <input className="mb-3"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder={language === 'AZ' ? 'Bilet kateqoriyası' : 'Tickets category'}
                            style={{ width: '100%' }} />
                        <textarea
                            rows={6}
                            style={{ width: '100%' }}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={language === 'AZ' ? 'Sənin fikirlərin' : 'Your thoughts'}
                        ></textarea>

                        <div className='back-and-add-buttons mt-3'>
                            <Link className='me-3 back-blog-page' to='/blog'> <IoIosArrowRoundBack className='me-2 fs-4 back-arrow' />Blog Page</Link>
                            <button className='' onClick={blogAddInformation}>{language === 'AZ' ? 'Yadda saxla' : 'Save changes'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogSingleCard