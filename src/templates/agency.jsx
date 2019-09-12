import React, { Component } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import SEO from "../components/SEO/SEO";
import { Textes, Images, TexteImage, Liste } from "../slices";

class Agency extends Component {
  componentDidMount() {
    const headlines = document.querySelectorAll("section h2");
    headlines.forEach(el => {
      el.addEventListener("click", this._toggle);
    });

    headlines[0].click();
  }

  componentWillUnmount() {
    const headlines = document.querySelectorAll("section h2");
    headlines.forEach(el => {
      el.removeEventListener("click", this._toggle);
    });
  }

  _toggle(e) {
    const parent = e.target.parentNode;
    //console.log(parent);
    parent.classList.toggle("active");
  }

  _renderSlices(slices) {
    const slice = slices.map((slice, i) => {
      //console.log(slice.slice_type)
      switch (slice.slice_type) {
        case "textes":
          return <Textes key={i} input={slice} />;
        case "images":
          return <Images key={i} input={slice} />;
        case "texte_image":
          return <TexteImage key={i} input={slice} />;
        case "liste":
          return <Liste key={i} input={slice} />;
        default:
          return null;
      }
    });
    return slice;
  }

  render() {
    const { locales, locale } = this.props.pageContext;
    const i18n = locales[locale];

    const { uid, data, datePublished } = this.props.data.page;
    //console.log(this.props.data)
    return (
      <>
        <SEO
          title={`${data.title.text} | ${i18n.defaultTitleAlt}`}
          description={data.texte.text}
          pathname={uid}
          locale={locale}
          datePublished={datePublished}
        />
        <div className="template-agency">
          <h1 className="b-b pad">{data.title.text}</h1>

          {this._renderSlices(data.body)}

          {data.images && (
            <section className="featured-images images liste-images">
              <div className="content">
                {data.images.map(({ image, column }, i) => (
                  <div className="row" key={i}>
                    <div className={"col-xs-12 col-md-" + column}>
                      <Img
                        fluid={image.localFile.childImageSharp.fluid}
                        Tag="figure"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </>
    );
  }
}

export default Agency;

export const pageQuery = graphql`
  query AgencyQuery($locale: String!) {
    page: prismicAgency(lang: { eq: $locale }) {
      uid
      datePublished: first_publication_date(formatString: "YYYY-MM-DD")
      ...agency
    }
  }
`;
