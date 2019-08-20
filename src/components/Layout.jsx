/* eslint no-unused-expressions: 0 */
/* eslint react/destructuring-assignment: 0 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
//import Footer from './Footer'
import SkipNavLink from "./SkipNavLink";
import i18n from "../../config/i18n";

require("../styles/index.scss");

const LocaleContext = React.createContext();

const Layout = ({ children, pageContext: { locale } }) => {
  //const data = useStaticQuery(query)
  // const footer = data.allPrismicHomepage.edges
  //   .filter(edge => edge.node.lang === locale)
  //   .map(r => r.node.data.footer.html)
  //   .toString()

  return (
    <LocaleContext.Provider value={{ locale, i18n }}>
      <>
        <Header />
        {/*<SkipNavLink />*/}

        <main>{children}</main>

        {/* <Footer>
            <div dangerouslySetInnerHTML={{ __html: footer }} />
          </Footer> */}
      </>
    </LocaleContext.Provider>
  );
};

export { LocaleContext, Layout };

// const query = graphql`
//   query LayoutQuery {
//     allPrismicHomepage {
//       edges {
//         node {
//           lang
//           data {
//             title {
//               text
//             }
//           }
//         }
//       }
//     }
//   }
// `;

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired
  }).isRequired
};
