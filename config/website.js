module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: 'W-Architectures', // Navigation and Site Title
  titleAlt: 'W-Architectures', // Title for JSONLD
  titleDetail: 'Voinchet & Architectes Associés',
  description: 'desc here',
  headline: '', // Headline for schema.org JSONLD
  url: 'https://www.w-architectures.com/', // Domain of your site. No trailing slash!
  logo: '/logos/logo-1024.png', // Used for SEO
  ogLanguage: 'fr_FR', // Facebook Language

  // JSONLD / Manifest
  favicon: 'src/favicon.png', // Used for manifest favicon generation
  shortName: 'Website', // shortname for manifest. MUST be shorter than 12 characters
  author: 'aeai', // Author for schemaORGJSONLD
  themeColor: '#ffff00',
  backgroundColor: '#ffffff',

  twitter: '@aeai', // Twitter Username
  facebook: 'aeai', // Facebook Site Name
  googleAnalyticsID: 'UA-XXXXXX-X',

  skipNavId: 'reach-skip-nav', // ID for the "Skip to content" a11y feature
}
