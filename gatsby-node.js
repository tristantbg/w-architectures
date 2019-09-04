const _ = require('lodash')
const locales = require('./config/i18n')
const { replaceTrailing, localizedSlug, replaceBoth, wrapper } = require('./src/utils/gatsby-node-helpers')
//return
// Take the pages from src/pages and generate pages for all locales, e.g. /index and /en/index
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // Only create one 404 page at /404.html
  // if (page.path.includes('404')) {
  //   return
  // }

  // First delete the pages so we can re-create them
  deletePage(page)

  Object.keys(locales).map(lang => {
    if(lang.active){
      // Remove the trailing slash from the path, e.g. --> /categories
      page.path = replaceTrailing(page.path)

      // Remove the leading AND traling slash from path, e.g. --> categories
      const name = replaceBoth(page.path)
      //console.log(page.path, name)
      // Create the "slugs" for the pages. Unless default language, add prefix àla "/en"
      const localizedPath = locales[lang].default 
      ? page.path 
      : `${locales[lang].path}${page.path}`
      console.log(localizedPath)
      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang
          //name,
        },
      })
    }
    
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // 
  // createPage({
  //   path: "/projects",
  //   component: projectsTemplate,
  //   context: {
  //     //uid: edge.node.uid,
  //     //locale: edge.node.lang,
  //   },
  // })
  const projectTemplate = require.resolve('./src/templates/project.jsx')
  const pageTemplate = require.resolve('./src/templates/page.jsx')
  const projectsTemplate = require.resolve('./src/templates/projects.jsx')
  const contactTemplate = require.resolve('./src/templates/contact.jsx')
  const agencyTemplate = require.resolve('./src/templates/agency.jsx')

  Object.keys(locales).forEach(lang => {
    console.log(lang)
    // if(lang !== "fr-fr")continue
    //////////////////////////////////
    const localizedProjectsPath = locales[lang].default 
    ? '/projects' 
    : `/${locales[lang].path}/projects`
    console.log(localizedProjectsPath)
    createPage({
        path: localizedProjectsPath,
        component: projectsTemplate,
        context: {
            template: 'projects',
            locale: lang,
            locales: locales,
            //i18n: locales[lang]
        },
    })

    //////////////////////////////////
    const localizedAgencePath = locales[lang].default 
    ? '/agence' 
    : `/${locales[lang].path}/agence`
    console.log(localizedAgencePath)
    createPage({
        path: localizedAgencePath,
        component: agencyTemplate,
        context: {
            template: 'agence',
            locale: lang,
            locales: locales,
            //i18n: locales[lang]
        },
    })

    //////////////////////////////////
    const localizedContactPath = locales[lang].default 
    ? '/contact' 
    : `/${locales[lang].path}/contact`
    console.log(localizedProjectsPath)
    createPage({
        path: localizedContactPath,
        component: contactTemplate,
        context: {
            template: 'contact',
            locale: lang,
            locales: locales,
            //i18n: locales[lang]
        },
    })
  })

  const result = await wrapper(
    graphql(`
      {
        projects: allPrismicProject {
          edges {
            node {
              uid
              lang
            }
          }
        }
        pages: allPrismicPage {
          edges {
            node {
              uid
              lang
            }
          }
        }
      }
    `)
  )

  const projectsList = result.data.projects.edges
  const pageList = result.data.pages.edges
  
  const projectsFr = projectsList.filter(function (p) {
    return p.node.lang === "fr-fr";
  });
  // const projectsEn = projectsList.filter(function (p) {
  //   return p.node.lang === "en-gb";
  // });

  const lengthFr = projectsFr.length
  projectsFr.forEach((edge, index) => {
    
    const previous = index === 0 
    ? projectsFr[lengthFr - 1].node 
    : projectsFr[index - 1].node

    const next = index === lengthFr - 1 
    ? projectsFr[0].node 
    : projectsFr[index + 1].node
// console.log(previous)
// console.log(localizedSlug(edge.node))
    createPage({
      path: localizedSlug(edge.node),
      component: projectTemplate,
      context: {
        // Pass the unique ID (uid) through context so the template can filter by it
        uid: edge.node.uid,
        locales: locales,
        locale: edge.node.lang,
        previous: previous,
        next: next,
        template: 'project'
      },
    })
  })

  // if(projectsEn.length){
  //   const lengthEn = projectsEn.length
  //   projectsEn.forEach((edge, index) => {
    
  //     const previous = index === 0 
  //     ? projectsEn[lengthEn - 1].node 
  //     : projectsEn[index - 1].node
  
  //     const next = index === lengthEn - 1 
  //     ? projectsEn[0].node 
  //     : projectsEn[index + 1].node
  // // console.log(previous)
  // // console.log(localizedSlug(edge.node))
  //     createPage({
  //       path: localizedSlug(edge.node),
  //       component: projectTemplate,
  //       context: {
  //         // Pass the unique ID (uid) through context so the template can filter by it
  //         uid: edge.node.uid,
  //         locales: locales,
  //         locale: edge.node.lang,
  //         previous: previous,
  //         next: next,
  //         template: 'project'
  //       },
  //     })
  //   })
  // }
  

  
  pageList.forEach(edge => {
    createPage({
      path: localizedSlug(edge.node),
      component: pageTemplate,
      context: {
        uid: edge.node.uid,
        locale: edge.node.lang,
      },
    })
  })
}
