import React, { Component } from "react";
import Img from "gatsby-image";
import ProjectInfos from "./project-infos";

class Tr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };

    this._toggle = this._toggle.bind(this);
  }

  _toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { collapsed } = this.state;
    const { data } = this.props;

    if (!data.visible) {
      return null;
    } else {
      return (
        <div className={"tr b-b " + (collapsed ? "is-collapsed" : "")}>
          <div className="row-header _row" onClick={this._toggle}>
            <div className="row">
              <div className="col-md-6">
                <div className="row between-xs">
                  <div className="_td col-xs-8">{data.title.text}</div>
                  <div className="_td col-xs-4">{data.localisation.text}</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row between-xs">
                  <div className="_td col-xs">{data.year.text}</div>
                  <div className="_td col-xs">{data.program}</div>
                  <div className="_td col-xs">{data.type}</div>
                </div>
              </div>
            </div>
          </div>

          {!collapsed && (
            <div className={"row-content " + (collapsed ? "collapsed" : "")}>
              <div className="images-grid">
                {data.images.map(({ image }, i) => (
                  <Img
                    key={i}
                    fixed={image.localFile.childImageSharp.fixed}
                    Tag="figure"
                  />
                ))}
              </div>
              <ProjectInfos data={data} />
            </div>
          )}
        </div>
      );
    }
  }
}

export default Tr;
