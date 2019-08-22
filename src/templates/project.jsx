import React, { Component } from "react";

import { graphql } from "gatsby";
import LocalizedLink from "../components/LocalizedLink";
import SEO from "../components/SEO/SEO";
import ProjectFooter from "../components/project-footer";
import Carousel from "../components/carousel";

class Project extends Component {
  render() {
    const { project } = this.props.data;
    const { locales, locale, previous, next } = this.props.pageContext;
    const i18n = locales[locale];

    const { title, image_featured, images } = project.data;

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
              <h1 className="col-xs fM fP">{title.text}</h1>
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
            <Carousel image_featured={image_featured} images={images} />
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
    project: prismicProjects(uid: { eq: $uid }, lang: { eq: $locale }) {
      uid
      ...project
    }
  }
`;
