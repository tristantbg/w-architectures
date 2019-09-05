import React from "react";
import { graphql } from "gatsby";
import SEO from "../components/SEO/SEO";
import { LocaleContext } from "../components/Layout";
import Table from "../components/table";

const Projects = ({
  pageContext: { locale },
  data: {
    page: {
      data: { title, texte, projects }
    }
  },
  location
}) => {
  const _LocaleContext = React.useContext(LocaleContext);
  const i18n = _LocaleContext.i18n[locale];

  const _projects = projects.map(el => {
    el.project.document[0].data.uid = el.project.document[0].uid;
    return el.project.document[0].data;
  });
  //console.log(_projects[0])

  return (
    <>
      <SEO
        title={`${title.text} | ${i18n.defaultTitleAlt}`}
        desc={texte.text}
        pathname={location.pathname}
        locale={locale}
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
