import React, { Component } from "react";
import BackgroundImage from "gatsby-background-image";
import Slider from "react-slick";

class Carousel extends Component {
  render() {
    const { image_featured, images } = this.props;
    const settings = {
      fade: true,
      dots: false,
      autoplay: true,
      autoplaySpeed: 5000,
      accessibility: true,
      infinite: true,
      //speed: 50,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div className="carousel">
        <Slider {...settings}>
          <div className="slide">
            <BackgroundImage
              fluid={image_featured.localFile.childImageSharp.fluid}
              style={{
                backgroundPosition: "left center",
                backgroundSize: "auto"
              }}
            />
          </div>

          {images.map(({ image }, i) => (
            <div key={i} className="slide">
              <BackgroundImage
                fluid={image.localFile.childImageSharp.fluid}
                style={{
                  backgroundPosition: "left center",
                  backgroundSize: "auto"
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default Carousel;
