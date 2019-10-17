import React, { Component } from "react";
import { graphql } from "gatsby";
import LocalizedLink from "../components/LocalizedLink";
import SEO from "../components/SEO/SEO";
import ProjectFooter from "../components/project-footer";
import Carousel from "../components/carousel";
import ProjectTitle from "../components/project-title";

class Project extends Component {
  render() {
    const { project } = this.props.data;
    const { locales, locale, previous, next } = this.props.pageContext;
    const i18n = locales[locale];

    // console.log("i18n",i18n.prev)
    const {
      title,
      texte,
      localisation,
      year,
      program,
      type,
      image_featured,
      images
    } = project.data;
    //console.log(project.data)
    return (
      <>
        <SEO
          title={`${title.text} | ${i18n.defaultTitleAlt}`}
          pathname={project.uid}
          locale={locale}
          description={texte.text}
          banner={image_featured.url}
          node={project}
          article
          datePublished={project.datePublished}
          bodyClass="page-projet"
        />
        <div className="template-project">
          <div className="project-header b-b pad">
            <div className="row between-xs">
              <h1 className="col-xs fM fP hidden-xs">
                <ProjectTitle
                  title={title.text}
                  localisation={localisation.text}
                  year={year.text}
                />
              </h1>
              <h1 className="col-xs fM fP xs-only ">
                <div className="b-b pad">{title.text}</div>
              </h1>
              <div className="col-xs xs-only metas ">
                <div className="b-b pad">
                  <span>{localisation.text}</span>, <span>{year.text}</span>, <span>{program}</span>, <span>{type}</span>
                </div>
              </div>
              <div className="col-xs ">
                <ul className="related">
                  {previous &&
                  <li>
                  <LocalizedLink to={previous.uid} >
                    <span className="label">{i18n["prev"]}</span>
                    <span className="value">{previous.document[0].data.title.text}</span>
                  </LocalizedLink>
                  </li>
                  }
                  
                  {next &&
                  <li>
                    <LocalizedLink to={next.uid}>
                      <span className="label">{i18n["next"]}</span>
                      <span className="value">{next.document[0].data.title.text}</span>
                    </LocalizedLink>
                  </li>
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className="project-images carousel">
            <Carousel images={images} />
          </div>

          <ProjectFooter i18n={i18n} data={project.data} />
        </div>
      </>
    );
  }
}

export default Project;

export const pageQuery = graphql`
  query ProjectBySlug($uid: String!, $locale: String!) {
    project: prismicProject(uid: { eq: $uid }, lang: { eq: $locale }) {
      uid
      datePublished: first_publication_date(formatString: "YYYY-MM-DD")
      ...project
    }
  }
`;
