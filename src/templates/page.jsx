/* eslint react/destructuring-assignment: 0 */
import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Listing, Wrapper, Title, SEO, Header } from "../components";
import website from "../../config/website";
import { LocaleContext } from "../components/Layout";
import LocalizedLink from "../components/LocalizedLink";

const Page = ({ pageContext: { locale }, data: { page }, location }) => {
  const lang = React.useContext(LocaleContext);
  const i18n = lang.i18n[lang.locale];

  const { title } = page.data;

  return (
    <>
      <SEO
        title={`title | ${i18n.defaultTitleAlt}`}
        pathname={location.pathname}
        locale={locale}
      />
      <div className="template-page">
        <h1>{title.text}</h1>
      </div>
    </>
  );
};

export default Page;

export const pageQuery = graphql`
  query PageBySlug($uid: String!, $locale: String!) {
    page: prismicPage(uid: { eq: $uid }, lang: { eq: $locale }) {
      uid
      data {
        title {
          text
        }
      }
    }
  }
`;
