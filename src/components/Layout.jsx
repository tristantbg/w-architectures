import React from "react";
import PropTypes from "prop-types";
// import { useStaticQuery, graphql } from "gatsby";
import Transition from "./Transition"
import Header from "./Header";
import Footer from './Footer'
// import SkipNavLink from "./SkipNavLink";
import i18n from "../../config/i18n";

require("../styles/index.scss");

const LocaleContext = React.createContext();

const Layout = ({ children, location, pageContext: { locale, template } }) => {
  
  return (
    <LocaleContext.Provider value={{ locale, i18n }}>
      <>
        <Header />

        {/* <main>{children}</main> */}
        <main>
          <Transition location={location}>{children}</Transition>
        </main>

        {template !== "project" &&
          <Footer />
        }

      </>
    </LocaleContext.Provider>
  );
};

export { LocaleContext, Layout };

// Layout.propTypes = {
//   children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
//   pageContext: PropTypes.shape({
//     locale: PropTypes.string.isRequired
//   }).isRequired
// };
