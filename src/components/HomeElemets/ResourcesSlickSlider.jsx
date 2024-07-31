import React from 'react'
import Slider from 'react-slick';

const ResourcesSlickSlider = () => {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "none", background: "red" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "none", background: "green" }}
                onClick={onClick}
            />
        );
    }
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 576,
                settings: {
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>

                <div className="card">
                    <img
                        src="../src/assets/img/1-res-unfold-unpacked_alt-720x-q.png"
                        className="card-img-top one-three-five-img"
                        alt="Image"
                    />
                    <div className="card-body" >
                        <h5 className="card-title mt-4">Unfold Unpacked - 2023 Unfold insights</h5>
                    </div>
                </div>

                <div className="card two-five-img mt-5">
                    <img
                        src="../src/assets/img/3-res-hospitality-insights-720x.png"
                        className="card-img-top two-five-img"
                        alt="Image" />
                    <div className="card-body">
                        <h5 className="card-title mt-4">Hospitality insights with Matt Welle and Leah Anathan</h5>
                    </div>
                </div>

                <div className="card one-three-five-img">
                    <img
                        src="../src/assets/img/4-res-kiosk.1-720x-q72.png"
                        className="card-img-top one-three-five-img"
                        alt="Image" />
                    <div className="card-body">
                        <h5 className="card-title mt-4">Mews Kiosk revolutionizing the guest experience</h5>
                    </div>
                </div>


                <div className="card two-five-img mt-5">
                    <img
                        src="../src/assets/img/5-res-case-study-strawberry-720x.png"
                        className="card-img-top two-five-img"
                        alt="Image" />
                    <div className="card-body">
                        <h5 className="card-title mt-4">Customer story: Strawberry - transforming hotel operations</h5>
                    </div>
                </div>

                <div className="card one-three-five-img">
                    <img
                        src="../src/assets/img/6-res-hospitality-insights-richa.png"
                        className="card-img-top one-three-five-img"
                        alt="Image" />
                    <div className="card-body">
                        <h5 className="card-title mt-4">Hospitality insights with Hotel Tech Report and Mews</h5>
                    </div>
                </div>
            </Slider>
        </div>
    );
}

export default ResourcesSlickSlider