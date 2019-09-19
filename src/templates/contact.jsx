import React, { Component } from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import SEO from "../components/SEO/SEO";
import { Textes, TexteImage, Locations } from "../slices";

class Contact extends Component {
  componentDidMount() {
    const headlines = document.querySelectorAll("section h2");
    headlines.forEach(el => {
      el.addEventListener("click", this._toggle);
    });

    const isTouch = ('ontouchstart' in window);
    if(!isTouch)headlines[0].click();
  }

  componentWillUnmount() {
    const headlines = document.querySelectorAll("section h2");
    headlines.forEach(el => {
      el.removeEventListener("click", this._toggle);
    });
  }

  _toggle(e) {
    const parent = e.target.parentNode;
    parent.classList.toggle("active");
  }

  _sliceZone(slices) {
    //const slice = "slice"
    const slice = slices.map((slice, i) => {
      //console.log(slice.slice_type)
      switch (slice.slice_type) {
        case "textes":
          return <Textes key={i} input={slice} />;
        case "location":
          return <Locations key={i} input={slice} />;
        case "texte_image":
          return <TexteImage key={i} input={slice} />;
        default:
          return null;
      }
    });
    return <div>{slice}</div>;
  }

  render() {
    const { locales, locale } = this.props.pageContext;
    const i18n = locales[locale];
    const { uid, data, datePublished } = this.props.data.page;

    return (
      <>
        <SEO
          title={`Contact | ${i18n.defaultTitleAlt}`}
          locale={locale}
          pathname={uid}
          description={data.texte.text}
          datePublished={datePublished}
          bodyClass="page-contact"
        />
        <Helmet>
          <link
            rel="stylesheet"
            type="text/css"
            href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.css"
          />
        </Helmet>
        <div className="template-contact">
          <h1 className="b-b pad">Contact</h1>
          {this._sliceZone(data.body)}
        </div>
      </>
    );
  }
}

export default Contact;

export const pageQuery = graphql`
  query ContactQuery($locale: String!) {
    page: prismicContact(lang: { eq: $locale }) {
      uid
      datePublished: first_publication_date(formatString: "YYYY-MM-DD")
      ...contact
    }
  }
`;
