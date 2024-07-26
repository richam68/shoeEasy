import React from "react";
import Slider from "react-slick";
import BrandComponent from "./BrandComponent";

const BrandsCarousel = ({ brands }) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 3000,
    autoplay: true,
    pauseOnHover: false,
    slickGoTo: true,
    draggable: false,
    cssEase: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
    dotsClass: "slick-dots",
    appendDots: (dots) => (
      <div
        style={{
          marginBottom: "-10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <Slider {...settings} className="m-0">
      {brands.map((brand) => {
        return (
          <BrandComponent image={brand} key={brand} link="/" />
        );
      })}
    </Slider>
  );
};

export default BrandsCarousel;
