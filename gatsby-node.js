const _ = require('lodash')
const locales = require('./config/i18n')
const { replaceTrailing, localizedSlug, replaceBoth, wrapper } = require('./src/utils/gatsby-node-helpers')
//return
// Take the pages from src/pages and generate pages for all locales, e.g. /index and /en/index
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // Only create one 404 page at /404.html
  if (page.path.includes('404')) {
    return
  }

  // First delete the pages so we can re-create them
  deletePage(page)

  page.path = replaceTrailing(page.path)

  // Remove the leading AND traling slash from path, e.g. --> categories
  //const name = replaceBoth(page.path)
  //console.log(page.path, name)
  // Create the "slugs" for the pages. Unless default language, add prefix àla "/en"
  Object.keys(locales).map(lang => {
    //const localizedPath = page.path

    const localizedPath = locales[lang].default 
      ? '/' 
      : `/${locales[lang].path}`

    // console.log("onCreatePage",localizedPath)
    // console.log(JSON.stringify(page))
    return createPage({
      ...page,
      //path: localizedPath,
      path: localizedPath,
      context: {
        locale: lang
        //name,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const projectTemplate = require.resolve('./src/templates/project.jsx')
  const projectsTemplate = require.resolve('./src/templates/projects.jsx')
  const contactTemplate = require.resolve('./src/templates/contact.jsx')
  const agencyTemplate = require.resolve('./src/templates/agency.jsx')


  Object.keys(locales).map(lang => {
    // console.log(lang)
    //////////////////////////////////
    //////////////////////////////////
    const localizedProjectsPath = locales[lang].default 
      ? '/projects' 
      : `/${locales[lang].path}/projects`
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

    //////////////////////////////////
    //////////////////////////////////
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
                document {
                  data {
                    title {
                      text
                    }
                  }
                }
              }
            }
          }
        }
        projectsEn: prismicProjects(lang: {eq: "en-gb"}) {
          data {
            projects {
              project {
                uid
                lang
                document {
                  data {
                    title {
                      text
                    }
                  }
                }
              }
            }
          }
        }
        projectsDe: prismicProjects(lang: {eq: "de-de"}) {
          data {
            projects {
              project {
                uid
                lang
                document {
                  data {
                    title {
                      text
                    }
                  }
                }
              }
            }
          }
        }
        
      }
    `)
  )
  const {projectsFr, projectsEn, projectsDe} = result.data

  const projectsAll = [projectsFr, projectsEn, projectsDe]

  projectsAll.forEach((_projects, _index) => {
  
    const {projects} = _projects.data
    const length = projects.length

    _projects.data.projects.forEach(({project}, index) => {
      if(project){
        const previous = index === 0 
          ? projects[length - 1].project 
          : projects[index - 1].project
  
        const next = index === length - 1 
          ? projects[0].project 
          : projects[index + 1].project
  
        createPage({
          path: localizedSlug(project),
          component: projectTemplate,
          context: {
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
  })
  

  // projectsFr.forEach(({project}, index) => {
  //   if(project){
  //     const previous = index === 0 
  //       ? projectsFr[lengthFr - 1].project 
  //       : projectsFr[index - 1].project

  //     const next = index === lengthFr - 1 
  //       ? projectsFr[0].project 
  //       : projectsFr[index + 1].project

  //     createPage({
  //       path: localizedSlug(project),
  //       component: projectTemplate,
  //       context: {
  //         uid: project.uid,
  //         locales: locales,
  //         locale: project.lang,
  //         previous: previous,
  //         next: next,
  //         template: 'project'
  //       },
  //     })
  //   }
    
  // })

  // projectsEn.forEach(({project}, index) => {
  //   if(project){
  //     const previous = index === 0 
  //       ? projectsEn[lengthFr - 1].project 
  //       : projectsEn[index - 1].project

  //     const next = index === lengthFr - 1 
  //       ? projectsEn[0].project 
  //       : projectsEn[index + 1].project

  //     createPage({
  //       path: localizedSlug(project),
  //       component: projectTemplate,
  //       context: {
  //         uid: project.uid,
  //         locales: locales,
  //         locale: project.lang,
  //         previous: previous,
  //         next: next,
  //         template: 'project'
  //       },
  //     })
  //   }
    
  // })



}
