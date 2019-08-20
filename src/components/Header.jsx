import React from "react";

import LocalizedLink from "./LocalizedLink";
import { Link } from "gatsby";
import website from "../../config/website";
// const StyledHeader = styled.nav`
//   padding-bottom: 2rem;
//   a {
//     color: ${props => (props.invert ? props.theme.colors.greyLight : props.theme.colors.greyDark)};
//     font-weight: 400;
//     font-style: normal;
//     font-family: 'Source Sans Pro', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial',
//       sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
//   }
// `

const Header = ({ invert }) => (
  <header>
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
            <li><Link hrefLang="fr-fr" to="/">Fr</Link></li>
            <li><Link hrefLang="en-gb" to="/en">En</Link></li>
            <li><Link hrefLang="de-de" to="/de">De</Link></li>
          </ul>
        </div>
      </div>
    </div>

    <nav className="nav-wrap  headline">
      <ul>
        <li className="b-b pad">
          <LocalizedLink to="/projects">Projects</LocalizedLink>
        </li>
        <li className="b-b pad">
          <LocalizedLink to="/agence">Agence</LocalizedLink>
        </li>
        <li className="b-b pad">
          <LocalizedLink to="/contact">Contact</LocalizedLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
