import React, { Component } from "react";
import Img from "gatsby-image";
import PubSub from "pubsub-js";
import ProjectTitle from "./project-title";
import ProjectInfos from "./project-infos";

class TableTr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };

    this._toggle = this._toggle.bind(this);
  }

  componentWillUnmount(){
    PubSub.unsubscribe("TABLE.COLLAPSE", this._onCollapse.bind(this));
  }

  componentDidMount(){
    PubSub.subscribe("TABLE.COLLAPSE", this._onCollapse.bind(this));
  }
  componentWillReceiveProps(){
    console.log(this.props)
  }
  _onCollapse(e,d){
    console.log(d.status)
    this.setState({
      collapsed: d.status
    });
  }

  _toggle() {
    const collapsed = !this.state.collapsed
    this.setState({
      collapsed: collapsed
    });
    
    PubSub.publish("TABLE", {status: collapsed})
  }

  render() {
    const { collapsed } = this.state;
    const { data } = this.props;
//console.log(data)
    if (!data.visible) {
      return null;
    } else {
      //const isSelection = (data.selection === 'true')
      const collapsedClass = collapsed ? "is-collapsed" : ""
      return (
        <div className={"tr b-b " + collapsedClass} >
          <div className="row-header _row" onClick={this._toggle}>
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <div className="row between-xs">
                  <div className="_td col-xs-12 col-md-8">
                    <h2>{data.title.text}</h2>
                  </div>
                  <div className="_td col-xs-4 hidden-xs">{data.localisation.text}</div>
                </div>
              </div>
              <div className="col-xs-12 col-md-6">
                <div className="row between-xs">
                  <div className="_td col-xs">{data.year.text}</div>
                  <div className="_td col-xs">{data.program}</div>
                  <div className="_td col-xs">{data.type}</div>
                  <div className="_td col-xs">
                    {data.patrimoine && data.patrimoine === "true" &&
                      <span className="">×</span>
                    }
                  </div>
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

export default TableTr;
