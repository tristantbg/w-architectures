import React, { Component } from "react";
import { ContextHoc } from "../context/ContextHoc";
import ProjectInfos from "./project-infos";

class ProjectFooter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true
    };

    this._toggle = this._toggle.bind(this);
  }

  _toggle() {
    //console.log("toggle")
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    //console.log(this.props);
    const { collapsed } = this.state;
    const { data } = this.props;

    const { i18n, locale } = this.props.context;
    const lang = i18n[locale];

    return (
      <div className={"project-footer " + (collapsed ? "is-collapsed" : "")}>
        <div className="detail">
          <ProjectInfos data={data} />
        </div>
        <div className="toggle b-t pad" onClick={this._toggle}>
          {collapsed ? lang["infos"] : lang["close"]}
        </div>
      </div>
    );
  }
}

export default ContextHoc(ProjectFooter);
