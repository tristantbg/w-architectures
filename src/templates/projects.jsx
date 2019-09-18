import React from "react";
import { graphql } from "gatsby";
import SEO from "../components/SEO/SEO";
import { LocaleContext } from "../components/Layout";
import Table from "../components/table";

const Projects = ({
  pageContext: { locale },
  data: {
    page: {
      uid,
      data: { title, texte, projects }
    }
  },
  location
}) => {
  const _LocaleContext = React.useContext(LocaleContext);
  const i18n = _LocaleContext.i18n[locale];
// console.log(projects)
  const _projectsF = projects.filter(el => {
    return el.project !== null;
  });

  const _projects = _projectsF.map(el => {
    el.project.document[0].data.uid = el.project.document[0].uid;
    return el.project.document[0].data;
  });

  return (
    <>
      <SEO
        title={`${title.text} | ${i18n.defaultTitleAlt}`}
        description={texte.text}
        pathname={uid}
        locale={locale}
        liste={true}
        items={_projects}
      />
      <div className="template-projects">
        <h1 className="b-b pad">{title.text}</h1>
        <Table data={_projects} />
      </div>
    </>
  );
};

export default Projects;

export const pageQuery = graphql`
  query Projects($locale: String!) {
    page: prismicProjects(lang: { eq: $locale }) {
      uid
      data {
        title {
          text
        }
        texte {
          text
        }
        projects {
          project {
            document {
              uid
              ...project
            }
          }
        }
      }
    }
  }
`;
