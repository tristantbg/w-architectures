import React from "react";
// import PropTypes from 'prop-types'
import { graphql } from "gatsby";
// import { Listing, Wrapper, Title } from '../components'
// import website from '../../config/website'
import { LocaleContext } from "../components/Layout";
import SEO from "../components/SEO";
import Card from "../components/card";

const Index = ({ data: { homepage }, pageContext: { locale }, location }) => {
  const lang = React.useContext(LocaleContext);
  //console.log(data)
  const i18n = lang.i18n[lang.locale];
  // console.log(location)
  return (
    <div className="template-home">
      <SEO
        title={`${i18n.defaultTitleAlt}`}
        desc={homepage.data.texte.text}
        pathname={location.pathname}
        locale={locale}
      />

      <div className="projects-liste">
        {homepage.data.projects.map(({ column, project }, i) => (
          <div key={i} className="row">
            <Card
              column={column}
              url={project.document[0].uid}
              title={project.document[0].data.title.text}
              image={project.document[0].data.image_featured}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;

export const pageQuery = graphql`
  query IndexQuery($locale: String!) {
    homepage: prismicHomepage(lang: { eq: $locale }) {
      data {
        title {
          text
        }
        texte {
          text
        }
        projects {
          column
          project {
            document {
              uid
              data {
                title {
                  text
                }
                image_featured {
                  url
                  localFile {
                    ...fluidImage
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
