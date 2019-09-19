import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Facebook from './Facebook'
import Twitter from './Twitter'
import i18n from '../../../config/i18n'

// Complete tutorial: https://www.gatsbyjs.org/docs/add-seo-component/

const SEO = ({ title, description, banner, bodyClass, datePublished, pathname, homePage=false, locale, article, liste, items }) => {
  const { site } = useStaticQuery(query)
  const { defaultTitle, defaultDescription, siteLanguage } = i18n[locale]
// console.log("siteLanguage", siteLanguage)
// console.log("datePublished", datePublished)
// console.log("homePage", homePage)
  const {
    buildTime,
    siteMetadata: { siteUrl, defaultBanner, ogLanguage, author, twitter, facebook },
  } = site

  // const localizedPath = i18n[locale].default ? '' : `/${i18n[locale].path}`
  // const homeURL = `${siteUrl}${localizedPath}`

  const seo = {
    title: homePage ? defaultTitle: title+" - "+defaultTitle,
    description: description,
    image: article ? banner : `${siteUrl}${defaultBanner}`,
    url: `${siteUrl}${pathname || ''}`,
  }
// console.log(seo.url)
  // schema.org in JSONLD format
  // https://developers.google.com/search/docs/guides/intro-structured-data
  // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')

  let schemaOrgWebPage = null
  if(homePage){
    schemaOrgWebPage = {
      '@context': 'http://schema.org',
      '@type': 'WebPage',
      url: seo.url,
      inLanguage: siteLanguage,
      mainEntityOfPage: seo.url,
      description: seo.description,
      name: seo.itle,
      author: {
        '@type': 'Person',
        name: author,
      },
      copyrightHolder: {
        '@type': 'Person',
        name: author,
      },
      copyrightYear: new Date().getFullYear(),
      creator: {
        '@type': 'Person',
        name: author,
      },
      publisher: {
        '@type': 'Person',
        name: author,
      },
      datePublished: '2019-01-18T10:30:00+01:00',
      dateModified: buildTime,
      image: {
        '@type': 'ImageObject',
        url: seo.image,
      },
    }
  }

  //console.log(schemaOrgWebPage)
  
  let schemaArticle = null
  if (article) {
    schemaArticle = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      author: {
        '@type': 'Person',
        name: author,
      },
      copyrightHolder: {
        '@type': 'Person',
        name: author,
      },
      copyrightYear: new Date().getFullYear(),
      creator: {
        '@type': 'Person',
        name: author,
      },
      publisher: {
        '@type': 'Organization',
        name: author,
        // logo: {
        //   '@type': 'ImageObject',
        //   url: `${siteUrl}${defaultBanner}`,
        // },
      },
      datePublished: datePublished,
      dateModified: buildTime,
      description: seo.description,
      headline: seo.title,
      inLanguage: siteLanguage,
      url: seo.url,
      name: seo.title,
      image: {
        '@type': 'ImageObject',
        url: seo.image,
      },
      mainEntityOfPage: seo.url,
    }
  }

  let schemaListe = null
  if (liste) {
    //console.log(items)
    const itemListElement = items.map((el, i) => {
      return {
        "@type": "ListItem",
        "position": i,
        "url": `${siteUrl}${el.uid}`
      }
    })
    schemaListe = {
      "@context":"https://schema.org",
      "@type":"ItemList",
      "itemListElement": itemListElement
    }
    //console.log(itemList)
  }

  if(!homePage && !article && !liste){
    schemaOrgWebPage = {
      '@context': 'http://schema.org',
      '@type': 'WebPage',
      url: seo.url,
      inLanguage: siteLanguage,
      mainEntityOfPage: seo.url,
      description: seo.description,
      name: seo.itle,
      author: {
        '@type': 'Person',
        name: author,
      },
      copyrightHolder: {
        '@type': 'Person',
        name: author,
      },
      copyrightYear: new Date().getFullYear(),
      creator: {
        '@type': 'Person',
        name: author,
      },
      publisher: {
        '@type': 'Person',
        name: author,
      },
      datePublished: '2019-01-18T10:30:00+01:00',
      dateModified: buildTime,
      image: {
        '@type': 'ImageObject',
        url: seo.image,
      },
    }
  }

  // const breadcrumb = {
  //   '@context': 'http://schema.org',
  //   '@type': 'BreadcrumbList',
  //   description: 'Breadcrumbs list',
  //   name: 'Breadcrumbs',
  //   itemListElement,
  // }
  // console.log(schemaArticle)
  return (
    <>
      <Helmet title={seo.title}>
        <html lang={siteLanguage} />
        <meta name="description" content={seo.description} />
        <meta name="image" content={seo.image} />
        <meta name="gatsby-starter" content="Gatsby Starter Prismic i18n" />
        {/* Insert schema.org data conditionally (webpage/article) + everytime (breadcrumbs) */}
        {homePage && <script type="application/ld+json">{JSON.stringify(schemaOrgWebPage)}</script>}
        {article && <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>}
        {liste && <script type="application/ld+json">{JSON.stringify(schemaListe)}</script>}
        {!homePage && !article && !liste && <script type="application/ld+json">{JSON.stringify(schemaOrgWebPage)}</script>}
        {/* <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script> */}
        <body className={bodyClass} />
      </Helmet>
      <Facebook
        desc={seo.description}
        image={seo.image}
        title={seo.title}
        type={article ? 'article' : 'website'}
        url={seo.url}
        locale={ogLanguage}
        name={facebook}
      />
      <Twitter 
      title={seo.title} 
      image={seo.image} 
      desc={seo.description} 
      username={twitter} />
    </>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  banner: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
  node: PropTypes.object,
  locale: PropTypes.string,
}

SEO.defaultProps = {
  title: null,
  desc: null,
  banner: null,
  pathname: null,
  article: false,
  node: null,
  locale: 'fr-fr',
}

const query = graphql`
  query SEO {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        siteUrl
        defaultBanner: banner
        ogLanguage
        author
        twitter
        facebook
      }
    }
  }
`
