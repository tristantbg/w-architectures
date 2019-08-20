import React, { Component } from "react";
import Img from "gatsby-image";
import LocalizedLink from "./LocalizedLink";

class Card extends Component {
  render() {
    const { url, title, image, column } = this.props;

    return (
      <div className={"card col-xs-" + column}>
        <LocalizedLink to={url} aria-label="go to project">
          <Img fluid={image.localFile.childImageSharp.fluid} />
          <h2 className="fM">{title}</h2>
        </LocalizedLink>
      </div>
    );
  }
}

export default Card;
