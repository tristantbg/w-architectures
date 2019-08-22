import React from "react";
import { Link } from "gatsby";
import website from "../../config/website";
import locales from "../../config/i18n";
import { LocaleContext } from "./Layout";
import LocalizedLink from "./LocalizedLink";

const Header = () => {
  const lang = React.useContext(LocaleContext);
  const i18n = lang.i18n[lang.locale];
  
  return(
    <header>
      <div className="inner">
        <div className="top-header b-b ">
          <div className="row between-xs">
            <div className="col-xs">
              <LocalizedLink 
              to="/" 
              aria-label="Back to Home"
              className="pad">
                {website.title} [+]
              </LocalizedLink>
            </div>
            <div className="col-xs text-right">
              <ul className="locale-switcher">
                {Object.values(locales).map((value,i) => (
                  <li key={i}><Link hrefLang={value.locale} to={"/"+(value.default ? '' : value.path)}>{value.localeName}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <nav className="nav-wrap  headline">
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
  )
}

export default Header;
