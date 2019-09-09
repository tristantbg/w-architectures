import React, { Component } from "react";
import BackgroundImage from "gatsby-background-image";
import Slider from "react-slick";

class Carousel extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   idx: 0
    // };

  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this._onKeyboard);
  }
  componentDidMount() {
    document.addEventListener("keyup", this._onKeyboard);

    //const idx = window.location.search.split('idx')
    if(window.location.search){
      console.log(this.slider)
      const searchParams = new URLSearchParams(window.location.search);
      const idx = parseInt(searchParams.get('idx'))
      this.slider.slickGoTo(idx)
      // console.log(idx, typeof idx)
      // this.setState({
      //   idx: idx
      // })
    }
  }

  _onKeyboard(e) {
    const key = e.key || e.keyCode;
    // console.log(key)
    switch (key) {
      case "ArrowRight":
        document.querySelector("button.slick-next").click();
        break;

      case "ArrowLeft":
        document.querySelector("button.slick-prev").click();
        break;

      default:
        break;
    }
  }
  render() {
    // const { idx } = this.state;
    const { images } = this.props;
    const settings = {
      fade: true,
      dots: false,
      //autoplay: false,
      //autoplaySpeed: 5000,
      //accessibility: true,
      infinite: true,
      speed: 0,
      //initialSlide: idx,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: "progressive"
    };

    // const style = {
    //   backgroundPosition: "center top",
    //   backgroundSize: "cover"
    // };

    return (
      <div className="carousel">
        <Slider 
        ref={slider => (this.slider = slider)}
        {...settings}>
          {images.map(({ image }, i) => {
            if (image.localFile) {
              //const isPortrait = image.localFile.childImageSharp.fluid.aspectRatio < 1
              return (
                <div key={i} className="slide">
                  <BackgroundImage
                    fluid={image.localFile.childImageSharp.fluid}
                    fadeIn={false}
                    style={{
                      backgroundPosition: "left top",
                      backgroundSize: "contain"
                    }}
                  />
                </div>
              );
            }
          })}
        </Slider>
      </div>
    );
  }
}

export default Carousel;
