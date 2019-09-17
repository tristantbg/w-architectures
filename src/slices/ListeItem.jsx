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
    // console.log(item.image)
    return (
      <div className={"liste-item " + (active ? "active" : "")}>
        <div className="row">
          <div className={"col-xs-12"}>
            <div className="title b-b pad" onClick={this._toggle}>
              {item.title1.text}
            </div>
            <div className="item-content">
              <div
                className="texte pad"
                dangerouslySetInnerHTML={{ __html: item.texte1.html }}
              />
              {item.image && item.image.localFile && (
                <Img
                  style={{
                    maxWidth: item.image.dimensions.width
                  }}
                  fluid={item.image.localFile.childImageSharp.fluid}
                  Tag="figure"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Distinction;
