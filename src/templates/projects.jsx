/* eslint react/destructuring-assignment: 0 */
import React from "react";
// import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { SEO } from "../components";
import { LocaleContext } from "../components/Layout";
// import LocalizedLink from "../components/LocalizedLink";
import Table from "../components/table";

const Projects = ({
  pageContext: { locale },
  data: { projects },
  location
}) => {
  const lang = React.useContext(LocaleContext);
  const i18n = lang.i18n[lang.locale];

  //const { title } = projects.data;

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
