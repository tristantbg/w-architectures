/* eslint react/destructuring-assignment: 0 */
import React, { Component } from "react";
import { graphql } from "gatsby";
// import { Listing, Wrapper, Title, SEO, Header } from "../components";
// import website from "../../config/website";
// import { LocaleContext } from "../components/Layout";
// import LocalizedLink from "../components/LocalizedLink";
import SEO from "../components/SEO/SEO";
import { Textes, Images, TexteImage, Distinctions } from "../slices";

class Agency extends Component {
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
    console.log(parent)
    parent.classList.toggle("active");
  }

  _sliceZone(slices) {
    const slice = slices.map((slice, i) => {
      switch (slice.slice_type) {
        case "textes":
          return <Textes key={i} input={slice} />;
        case "images":
          return <Images key={i} input={slice} />;
        case "texte_image":
          return <TexteImage key={i} input={slice} />;
        case "distinctions":
          return <Distinctions key={i} input={slice} />;
        default:
          return null;
      }
    });
    return <div>{slice}</div>;
  }

  render() {
    const {locales,locale} = this.props.pageContext
    const i18n = locales[locale]
    
    const { data } = this.props.data.page;

    return (
      <>
        <SEO
          title={`${data.title.text} | ${i18n.defaultTitleAlt}`}
          desc={data.texte.text}
          //pathname={location.pathname}
          locale={locale}
        />
        <div className="template-agency">{this._sliceZone(data.body)}</div>
      </>
    );
  }
}

export default Agency;

export const pageQuery = graphql`
  query AgencyQuery($locale: String!) {
    page: prismicAgency(lang: { eq: $locale }) {
      ...agency
    }
  }
`;
