import React, { Component } from "react";
import BackgroundImage from "gatsby-background-image";
import Slider from "react-slick";

class Carousel extends Component {
  render() {
    const { image_featured, images } = this.props;
    const settings = {
      fade: true,
      dots: false,
      autoplay: false,
      autoplaySpeed: 5000,
      accessibility: true,
      infinite: true,
      speed: 150,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: 'progressive'
    };

    const style = {
      backgroundPosition: "center top",
      backgroundSize: "contain"
    }

    return (
      <div className="carousel">
        <Slider {...settings}>
          <div className="slide">
            <BackgroundImage
              fluid={image_featured.localFile.childImageSharp.fluid}
              style={style}
            />
          </div>

          {images.map(({ image }, i) => (
            <div key={i} className="slide">
              <BackgroundImage
                fluid={image.localFile.childImageSharp.fluid}
                style={style}
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default Carousel;
