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
    // console.log(previous)
    // console.log(next)
    const { title, localisation, year, image_featured, images } = project.data;

    return (
      <>
        <SEO
          title={`${title.text} | ${i18n.defaultTitleAlt}`}
          //pathname={location.pathname}
          locale={locale}
          desc={title.text}
          banner={image_featured.url}
          node={project}
          article
        />
        <div className="template-project">
          <div className="project-header b-b pad">
            <div className="row between-xs">
              <h1 className="col-xs fM fP">
                <ProjectTitle
                  title={title.text}
                  localisation={localisation.text}
                  year={year.text}
                />
              </h1>
              <div className="col-xs ">
                <ul className="related">
                  <li>
                    <LocalizedLink to={previous.uid}>
                      {i18n["prev"]}
                    </LocalizedLink>
                  </li>{" "}
                  /{" "}
                  <li>
                    <LocalizedLink to={next.uid}>{i18n["next"]}</LocalizedLink>
                  </li>
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
      ...project
    }
  }
`;
