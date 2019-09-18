import React, { Component } from "react";
import Img from "gatsby-image";
import LocalizedLink from "./LocalizedLink";
import ProjectTitle from "./project-title";

class HomeCard extends Component {
  render() {
    const { url, title, localisation, year, column, image } = this.props;
    // console.log(title)
    return (
      <div className={"card col-xs col-md-" + column}>
        <LocalizedLink to={url} aria-label="go to project">
          {image.localFile && (
            <Img fluid={image.localFile.childImageSharp.fluid} />
          )}
          {!image.localFile && <img src={image.url} />}
          <h2 className="fM hidden-xs">
            <ProjectTitle
              title={title}
              localisation={localisation}
              year={year}
            />
          </h2>
          <h2 className="fM hidden-m ">
          {title}
          </h2>
        </LocalizedLink>
      </div>
    );
  }
}

export default HomeCard;
