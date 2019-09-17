import React, { Component } from "react";
import Img from "gatsby-image";
import PubSub from "pubsub-js";
import LocalizedLink from "./LocalizedLink";
// import ProjectTitle from "./project-title";
import ProjectInfos from "./project-infos";

class TableTr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      thumbnailHeight: 100
    };

    this._toggle = this._toggle.bind(this);
  }

  componentWillUnmount() {
    PubSub.unsubscribe("TABLE.COLLAPSE", this._onCollapse.bind(this));
  }

  componentDidMount() {
    PubSub.subscribe("TABLE.COLLAPSE", this._onCollapse.bind(this));

    const isTouch = "ontouchstart" in window;
    if (isTouch) {
      this.setState({
        thumbnailHeight: 50
      });
    }
  }
  componentWillReceiveProps() {
    // console.log(this.props)
  }
  _onCollapse(e, d) {
    // console.log(d.status)
    this.setState({
      collapsed: d.status
    });
  }

  _toggle() {
    const collapsed = !this.state.collapsed;
    this.setState({
      collapsed: collapsed
    });

    PubSub.publish("TABLE", { status: collapsed });
  }

  render() {
    const { collapsed, thumbnailHeight } = this.state;
    const { data } = this.props;
    // console.log(data)
    if (!data.visible) {
      return null;
    } else {
      // console.log(data)
      const collapsedClass = collapsed ? "is-collapsed" : "";
      return (
        <div className={"tr b-b " + collapsedClass}>
          <div className="row-header _row" onClick={this._toggle}>
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <div className="row between-xs">
                  <div className="_td col-xs-12 col-md-8">
                    <h2>{data.title.text}</h2>
                  </div>
                  <div className="_td col-xs-4 hidden-xs">
                    {data.localisation.text}
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-md-6 hidden-xs">
                <div className="row between-xs">
                  <div className="_td col-xs year">{data.year.text}</div>
                  <div className="_td col-xs">{data.program}</div>
                  <div className="_td col-xs">{data.type}</div>
                  <div className="_td col-xs">
                    {data.patrimoine && data.patrimoine === "oui" && (
                      <span className="">×</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!collapsed && (
            <div className={"row-content " + (collapsed ? "collapsed" : "")}>
              <div className="images-grid">
                {data.images.map(({ image }, i) => (
                  <LocalizedLink key={i} to={data.uid + "?idx=" + i}>
                    {image.localFile && (
                      <Img
                        fluid={image.localFile.childImageSharp.fluid}
                        style={{
                          width:
                            thumbnailHeight *
                              image.localFile.childImageSharp.fluid
                                .aspectRatio +
                            "px",
                          height: thumbnailHeight + "px"
                        }}
                        Tag="figure"
                      />
                    )}
                    {!image.localFile && <img src={image.url} />}
                  </LocalizedLink>
                ))}
              </div>

              <ProjectInfos data={data} embed={true} />
            </div>
          )}
        </div>
      );
    }
  }
}

export default TableTr;
