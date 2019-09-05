//import React from "react";
import React, { Component } from "react";
import { Link } from "gatsby";
import website from "../../config/website";
import locales from "../../config/i18n";
//import { LocaleContext } from "./Layout";
import { ContextHoc } from "../context/ContextHoc";
import LocalizedLink from "./LocalizedLink";

class Header extends Component {
  constructor(props) {
    super(props);

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
    //console.log(this)
    const { locale } = this.props.context;
    const i18n = this.props.context.i18n[locale];
    const { active } = this.state;

    const _headerClass = active ? "active" : "";
    return (
      <header
        className={_headerClass}
        onMouseEnter={this._toggle}
        onMouseLeave={this._toggle}
      >
        <div className="inner">
          <div className="top-header b-b ">
            <div className="row between-xs">
              <div className="col-xs">
                <LocalizedLink
                  to="/"
                  aria-label="Back to Home"
                  className="site-title "
                >
                  <div className="title">{website.title}</div>
                  <div className="title-detail">
                    <div className="plus">+</div>
                    <div className="detail">
                      <span>{website.titleDetail}</span>
                    </div>
                  </div>
                </LocalizedLink>
              </div>
              <div className="col-xs text-right">
                {/* <ul className="locale-switcher">
                  {Object.values(locales).map((value, i) => (
                    <li key={i}>
                      <Link
                        hrefLang={value.locale}
                        to={"/" + (value.default ? "" : value.path)}
                      >
                        {value.localeName}
                      </Link>
                    </li>
                  ))}
                </ul> */}
              </div>
            </div>
          </div>

          <nav className="nav-wrap headline">
            <ul>
              <li className="b-b pad">
                <LocalizedLink to="/projects">{i18n["projects"]}</LocalizedLink>
              </li>
              <li className="b-b pad">
                <LocalizedLink to="/agence">{i18n["agency"]}</LocalizedLink>
              </li>
              <li className="b-b pad">
                <LocalizedLink to="/contact">{i18n["contact"]}</LocalizedLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default ContextHoc(Header);

/*
const Header = () => {
  const lang = React.useContext(LocaleContext);
  const i18n = lang.i18n[lang.locale];

  return (
    <header>
      <div className="inner">
        <div className="top-header b-b ">
          <div className="row between-xs">
            <div className="col-xs">
              <LocalizedLink to="/" aria-label="Back to Home" className="site-title ">
                <div className="title">{website.title}</div>
                <div className="title-detail">
                  <div className="plus">+</div>
                  <div className="detail"><span>{website.titleDetail}</span></div>
                </div>  
              </LocalizedLink>
            </div>
            <div className="col-xs text-right">
              <ul className="locale-switcher">
                {Object.values(locales).map((value, i) => (
                  <li key={i}>
                    <Link
                      hrefLang={value.locale}
                      to={"/" + (value.default ? "" : value.path)}
                    >
                      {value.localeName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <nav className="nav-wrap headline">
          <ul>
            <li className="b-b pad">
              <LocalizedLink to="/projects">{i18n["projects"]}</LocalizedLink>
            </li>
            <li className="b-b pad">
              <LocalizedLink to="/agence">{i18n["agency"]}</LocalizedLink>
            </li>
            <li className="b-b pad">
              <LocalizedLink to="/contact">{i18n["contact"]}</LocalizedLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
*/
