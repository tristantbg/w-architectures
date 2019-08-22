/* eslint react/destructuring-assignment: 0 */
import React, { Component } from "react";
// import PropTypes from "prop-types";
import { graphql } from "gatsby";
import SEO from "../components/SEO/SEO";
import { LocaleContext } from "../components/Layout";
// import LocalizedLink from "../components/LocalizedLink";
import Table from "../components/table";

const Projects = ({
  pageContext: { locale },
  data: { projects },
  location
}) => {
  const _LocaleContext = React.useContext(LocaleContext);
  const i18n = _LocaleContext.i18n[locale];

  return (
    <>
      <SEO
        title={`Projects | ${i18n.defaultTitleAlt}`}
        desc="Project liste"
        pathname={location.pathname}
        locale={locale}
      />
      <div className="template-projects">
        <Table data={projects.edges} />
      </div>
    </>
  );
};

// class Projects extends Component {
//   render(){
//     const {locales,locale} = this.props.pageContext
//     const i18n = locales[locale]
//     console.log(i18n)
//     //const lang = React.useContext(LocaleContext);
//     //const i18n = lang.i18n[lang.locale];

//     const {projects} = this.props.data
//     console.log(this.props)
//     return (
//       <>
//         <SEO
//           title={`Projects | ${i18n.defaultTitleAlt}`}
//           desc="Project liste"
//           //pathname={location.pathname}
//           locale={locale}
//         />
//         <div className="template-projects">
//           <Table data={projects.edges} />
//         </div>
//       </>
//     );
//   }
// }

export default Projects;

export const pageQuery = graphql`
  query AllProjects($locale: String!) {
    projects: allPrismicProjects(filter: { lang: { eq: $locale } }) {
      edges {
        node {
          uid
          ...project
        }
      }
    }
  }
`;
