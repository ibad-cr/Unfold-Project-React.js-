import React from "react";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const OrderRecommedProductsSlickSlide = ({ alldata }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={35}
            slidesPerView={4}
            loop={true}
            autoplay={{
                delay: 1000,
                disableOnInteraction: false,
            }}
            breakpoints={{
                320: {
                    slidesPerView: 1,
                },
                576: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                992: {
                    slidesPerView: 4,
                },
            }}
        >
            {alldata.map((item, index) => (
                <SwiperSlide key={index} className="d-flex !important" style={{ width: '100%' }}>
                    <div>
                        <Link to={`/tickets/${slugify(item.title)}`} style={{ color: 'black', textDecoration: 'none' }}>
                            <img src={item.image} alt="" style={{ width: '200px', borderRadius: '10px' }} />
                            <div className="mt-2 text-center">
                                <h6 style={{ fontSize: '13px' }}>{item.title}</h6>
                            </div>
                        </Link>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default OrderRecommedProductsSlickSlide;
