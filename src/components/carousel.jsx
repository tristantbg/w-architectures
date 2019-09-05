import React, { Component } from "react";
import BackgroundImage from "gatsby-background-image";
import Slider from "react-slick";

class Carousel extends Component {
  componentWillUnmount(){
    document.removeEventListener('keyup', this._onKeyboard)
  }
  componentDidMount(){
    document.addEventListener('keyup', this._onKeyboard)
  }

  _onKeyboard(e){
    const key = e.key || e.keyCode;
    switch(key){
      case "ArrowRight":
          document.querySelector("button.slick-next").click()
        break;

      case "ArrowLeft":
          document.querySelector("button.slick-prev").click()
        break;

      default:
        break;
    }  
    
  }
  render() {
    const { images } = this.props;
    const settings = {
      fade: true,
      dots: false,
      //autoplay: false,
      autoplaySpeed: 5000,
      //accessibility: true,
      infinite: true,
      speed: 0,
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
                    fadeIn={false}
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
