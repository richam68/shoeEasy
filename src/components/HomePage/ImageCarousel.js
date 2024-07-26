import React from "react";
import Slider from "react-slick";

const ImageCarousel = ({ images }) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 5000,
    autoplay: true,
    pauseOnHover: false,
    slickGoTo: true,
    draggable: false,
    easing: "easeOutElastic",
    dotsClass: "slick-dots",
    appendDots: (dots) => (
      <div
        style={{
          marginBottom: "35px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <Slider {...settings} className="m-0">
      {images.map((image) => {
        return (
          <div key={image} className={"overflow-hidden h-[30vh] bg-gray-300"}>
            <img
              src={image}
              alt={"carousel-banner"}
              className="h-full w-full object-cover"
            />
          </div>
        );
      })}
    </Slider>
  );
};

export default ImageCarousel;
