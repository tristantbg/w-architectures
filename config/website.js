module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: 'W-Architectures [Voinchet & Architectes Associés]', // Navigation and Site Title
  titleAlt: 'W-Architectures', // Title for JSONLD
  titleShort: 'W-Architectures', // Title for JSONLD
  titleDetail: 'Voinchet & Architectes Associés',
  description: 'desc here',
  headline: '', // Headline for schema.org JSONLD
  url: 'https://w-architectures.netlify.com/', // Domain of your site. No trailing slash!
  logo: '/logos/logo-1024.png', // Used for SEO
  ogLanguage: 'fr_FR', // Facebook Language

  // JSONLD / Manifest
  favicon: 'src/images/favicon-32_32.png', // Used for manifest favicon generation
  shortName: 'waw', // shortname for manifest. MUST be shorter than 12 characters
  author: 'w-architectures', // Author for schemaORGJSONLD
  themeColor: '#ffffff',
  backgroundColor: '#ffffff',

  twitter: '@w-architectures', // Twitter Username
  facebook: 'w-architectures', // Facebook Site Name
  googleAnalyticsID: 'UA-22167481-1',

  skipNavId: 'reach-skip-nav', // ID for the "Skip to content" a11y feature
}
