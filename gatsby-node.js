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

  page.path = replaceTrailing(page.path)

  // Remove the leading AND traling slash from path, e.g. --> categories
  const name = replaceBoth(page.path)
  //console.log(page.path, name)
  // Create the "slugs" for the pages. Unless default language, add prefix àla "/en"
  const localizedPath = page.path
  console.log(localizedPath)
  return createPage({
    ...page,
    path: localizedPath,
    context: {
      locale: "fr-fr"
      //name,
    },
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const lang = "fr-fr"
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
  // const pageTemplate = require.resolve('./src/templates/page.jsx')
  const projectsTemplate = require.resolve('./src/templates/projects.jsx')
  const contactTemplate = require.resolve('./src/templates/contact.jsx')
  const agencyTemplate = require.resolve('./src/templates/agency.jsx')

  //////////////////////////////////
  const localizedProjectsPath = '/projects' 
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
  const localizedAgencePath = '/agence' 
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
  const localizedContactPath = '/contact' 
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

  // projects: allPrismicProject(filter: {lang: {eq: "fr-fr"}}) {
  //   edges {
  //     node {
  //       uid
  //       lang
  //     }
  //   }
  // }

  const result = await wrapper(
    graphql(`
      {
        projectsFr: prismicProjects(lang: {eq: "fr-fr"}) {
          data {
            projects {
              project {
                uid
                lang
              }
            }
          }
        }
      }
    `)
  )
  const projectsFr = result.data.projectsFr.data.projects
  const lengthFr = projectsFr.length
// console.log(result.data.projectsFr.data.projects)
// console.log(JSON.stringify(projectsFr, null, 4));
//   const projectsFr = result.data.projects.edges
  
  
  
//   // const projectsEn = projectsList.filter(function (p) {
//   //   return p.node.lang === "en-gb";
//   // });

  

  projectsFr.forEach(({project}, index) => {
    if(project){
      const previous = index === 0 
        ? projectsFr[lengthFr - 1].project 
        : projectsFr[index - 1].project

      const next = index === lengthFr - 1 
        ? projectsFr[0].project 
        : projectsFr[index + 1].project
  // console.log(previous)
  // console.log(JSON.stringify(project, null, 4))
  // console.log(localizedSlug(project))
      createPage({
        path: localizedSlug(project),
        component: projectTemplate,
        context: {
          // Pass the unique ID (uid) through context so the template can filter by it
          uid: project.uid,
          locales: locales,
          locale: project.lang,
          previous: previous,
          next: next,
          template: 'project'
        },
      })
    }
    
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
  


}
