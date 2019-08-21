import React, { Component } from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import SEO from "../components/SEO/SEO";
import { TexteImage, Locations } from "../slices";

class Contact extends Component {
  componentDidMount() {
    const headlines = document.querySelectorAll("section h2");
    headlines.forEach(el => {
      el.addEventListener("click", this._toggle);
    });

    headlines[0].click()
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
      switch (slice.slice_type) {
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
    const { data } = this.props.data.page;
    //console.log(this.props);
    return (
      <>
        <SEO
          title={`Contact | ${i18n.defaultTitleAlt}`}
          locale={locale}
          desc={data.texte.text}
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
      ...contact
    }
  }
`;
