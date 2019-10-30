import React from "react";
import { graphql } from "gatsby";
import { LocaleContext } from "../components/Layout";
import SEO from "../components/SEO";
import HomeCard from "../components/HomeCard";

const HomePage = ({
  data: { homepage },
  pageContext: { locale },
  location
}) => {
  const lang = React.useContext(LocaleContext);
  //console.log(data)
  const i18n = lang.i18n[lang.locale];
  console.log(homepage)
  return (
    <div className="template-home">
      <SEO
        title={homepage.data.title.text}
        description={homepage.data.texte.text}
        banner={homepage.data.poster.url}
        pathname={location.pathname}
        locale={locale}
        homePage={true}
        bodyClass="page-home"
      />

      <div className="projects-liste liste-images">
        {homepage.data.projects.map(({ column, project }, i) => (
          <div key={i} className="row">
            <HomeCard
              column={column}
              url={project.document[0].uid}
              title={project.document[0].data.title.text}
              localisation={project.document[0].data.localisation.text}
              year={project.document[0].data.year.text}
              image={project.document[0].data.image_featured}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

export const pageQuery = graphql`
  query HomePageQuery($locale: String!) {
    homepage: prismicHomepage(lang: { eq: $locale }) {
      data {
        title {
          text
        }
        texte {
          text
        }
        poster{
          url
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
                localisation {
                  text
                }
                year {
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
