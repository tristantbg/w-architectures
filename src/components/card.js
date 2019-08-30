import React, { Component } from "react";
import Img from "gatsby-image";
import LocalizedLink from "./LocalizedLink";
import ProjectTitle from "./project-title";

class Card extends Component {
  render() {
    const { 
      url, 
      title, 
      localisation,
      year,
      column,
      image
    } = this.props;

    return (
      <div className={"card col-xs-" + column}>
        <LocalizedLink to={url} aria-label="go to project">
          <Img fluid={image.localFile.childImageSharp.fluid} />
          <h2 className="fM">
            <ProjectTitle 
              title={title}
              localisation={localisation}
              year={year}
            />
          </h2>
        </LocalizedLink>
      </div>
    );
  }
}

export default Card;
