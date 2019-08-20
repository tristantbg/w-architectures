const website = require('./website')

module.exports = {
  'fr-fr': {
    default: true,
    path: 'fr',
    locale: 'fr-fr',
    siteLanguage: 'fr',
    ogLang: 'fr_FR',
    defaultTitle: website.title,
    defaultTitleAlt: website.titleAlt,
    prev: 'Projet précédent',
    next: 'Projet suivant',
    infos: 'Informations',
    close: 'Fermer',
    download: 'Télécharger la fiche projet',
    localisation: 'Localisation',
    year: 'Année',
    program: 'Programme',
    type: 'Type',
    backToTop: 'Haut de page'
  },
  'en-gb': {
    default: false,
    path: 'en',
    locale: 'en-gb',
    siteLanguage: 'en',
    ogLang: 'en_GB',
    defaultTitle: website.title,
    defaultTitleAlt: website.titleAlt,
    prev: 'Previous project',
    next: 'Next project',
    infos: 'Informations',
    close: 'Close',
    download: 'Download la fiche projet',
    localisation: 'Localisation',
    year: 'Year',
    program: 'Program',
    type: 'Type',
    backToTop: 'Back to top'
  },
}
