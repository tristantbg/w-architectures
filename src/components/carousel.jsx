import React, { Component } from "react";
import BackgroundImage from "gatsby-background-image";
import Slider from "react-slick";

class Carousel extends Component {
  render() {
    const { images } = this.props;
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
      backgroundSize: "cover"
    }

    return (
      <div className="carousel">
        <Slider {...settings}>
        
          {images.map(({ image }, i) => {
            if(image.localFile){
              return(
                <div key={i} className="slide">
                  <BackgroundImage
                    fluid={image.localFile.childImageSharp.fluid}
                    style={style}
                  />
                </div>
              )
            }
          })}
          {/* {images.map(({ image }, i) => (
            <div key={i} className="slide">
              <BackgroundImage
                fluid={image.localFile.childImageSharp.fluid}
                style={style}
              />
            </div>
          ))} */}
        </Slider>
      </div>
    );
  }
}

export default Carousel;
