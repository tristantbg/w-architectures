import React, { Component } from "react";
import Img from "gatsby-image";

class Distinction extends Component {
  constructor() {
    super();
    this.state = {
      active: false
    };
    this._toggle = this._toggle.bind(this);
  }

  _toggle() {
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    const { active } = this.state;
    const { item } = this.props;
    //console.log(input)
    return (
      <div className={"distinction " + (active ? "active" : "")}>
        <div className="row">
          <div className={"col-md-12"}>
            <div className="title b-b pad" onClick={this._toggle}>
              {item.title1.text}
            </div>
            <div className="distinction-content">
              <div
                className="texte pad"
                dangerouslySetInnerHTML={{ __html: item.texte1.html }}
              />
              {item.image && (
                <figure>
                  <Img fluid={item.image.localFile.childImageSharp.fluid} />
                </figure>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Distinction;
