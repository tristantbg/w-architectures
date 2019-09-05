// import React from "react";
// import { graphql } from "gatsby";
// import SEO from "../components/SEO/SEO";
// import website from "../../config/website";
// import { LocaleContext } from "../components/Layout";
// import LocalizedLink from "../components/LocalizedLink";

// const Page = ({ pageContext: { locale }, data: { page }, location }) => {
//   const lang = React.useContext(LocaleContext);
//   const i18n = lang.i18n[lang.locale];

//   const { title, texte } = page.data;

//   return (
//     <>
//       <SEO
//         title={`${title.text} | ${i18n.defaultTitleAlt}`}
//         desc={texte.text}
//         pathname={location.pathname}
//         locale={locale}
//       />
//       <div className="template-page">
//         <h1 className="b-b pad">{title.text}</h1>
//         <div className="row">
//           <div className="cl-xs-12 col-md-6">
//             <div
//               className="texte pad"
//               dangerouslySetInnerHTML={{ __html: texte.html }}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Page;

// export const pageQuery = graphql`
//   query PageBySlug($uid: String!, $locale: String!) {
//     page: prismicPage(uid: { eq: $uid }, lang: { eq: $locale }) {
//       uid
//       data {
//         title {
//           text
//         }
//         texte {
//           text
//           html
//         }
//       }
//     }
//   }
// `;
