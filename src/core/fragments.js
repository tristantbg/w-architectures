import { graphql } from "gatsby";

//https://github.com/gatsbyjs/gatsby/blob/26582d31ab14f7bac6d5738e4245ceca2e6d411d/packages/gatsby-transformer-sharp/src/fragments.js#L6

export const query = graphql`
  fragment fixedImage on File {
    childImageSharp {
      fixed {
        ...GatsbyImageSharpFixed
      }
    }
  }

  fragment thumbnail on File {
    childImageSharp {
      fixed(height: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }

  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 2500, quality: 80) {
        # ...GatsbyImageSharpFluid_withWebp
        ...GatsbyImageSharpFluid_noBase64
      }
    }
  }

  fragment homeFixedImage on File {
    childImageSharp {
      fixed(height: 1000) {
        ...GatsbyImageSharpFixed
      }
    }
  }

  # fragment sharp on File {
  #   childImageSharp {
  #     fluid(maxWidth: 1280, quality: 80) {
  #       ...GatsbyImageSharpFluid
  #     }
  #   }
  # }

  fragment project on PrismicProject {
    data {
      title {
        text
      }
      texte {
        html
        text
      }
      selection
      year {
        text
      }
      localisation {
        text
      }
      program
      type
      patrimoine
      fiche_technique {
        label {
          text
        }
        value {
          text
        }
      }
      prix{
        item{
          text
        }
      }
      download {
        url
      }
      image_featured {
        url
        localFile {
          ...fluidImage
        }
      }
       images {
         image {
           localFile {
             ...fluidImage
             # ...thumbnail
           }
         }
       }
    }
  }

  fragment agency on PrismicAgency {
    data {
      title {
        text
      }
      texte {
        text
      }
      images {
        column
        image {
          dimensions {
            width
          }
          localFile {
            ...fluidImage
          }
        }
      }
      body {
        ... on Node {
          ... on PrismicAgencyBodyTextes {
            slice_type
            primary {
              title1 {
                text
              }
            }
            items {
              texte {
                html
              }
              column
            }
          }
          # ... on PrismicAgencyBodyImages {
          #   slice_type
          #   primary {
          #     title1 {
          #       text
          #     }
          #   }
          #   items {
          #     column
          #     image {
          #       localFile {
          #         ...fluidImage
          #       }
          #     }
          #   }
          # }
          ... on PrismicAgencyBodyTexteImage {
            slice_type
            primary {
              title1 {
                text
              }
              texte {
                html
              }
              column
              image {
                dimensions {
                  width
                }
                localFile {
                  ...fluidImage
                }
              }
            }
          }
          ... on PrismicAgencyBodyListe {
            slice_type
            primary {
              title1 {
                text
              }
            }
            items {
              title1 {
                text
              }
              texte1 {
                html
              }
              column
              # image {
              #   dimensions {
              #     width
              #   }
              #   localFile {
              #     ...fluidImage
              #   }
              # }
            }
          }
        }
      }
    }
  }

  fragment contact on PrismicContact {
    data {
      title {
        text
      }
      texte {
        text
      }
      body {
        ... on Node {
          ... on PrismicContactBodyLocation {
            slice_type
            primary {
              title1 {
                text
              }
            }
            items {
              title1 {
                text
              }
              texte1 {
                html
                text
              }
              geoloc {
                longitude
                latitude
              }
            }
          }

          ... on PrismicContactBodyTextes {
            slice_type
            primary {
              title1 {
                text
              }
            }
            items {
              texte1 {
                html
              }
            }
          }
          # ... on PrismicContactBodyTexteImage {
          #   slice_type
          #   primary {
          #     title1 {
          #       text
          #     }
          #     texte {
          #       html
          #     }
          #     image {
          #       url
          #       localFile {
          #         ...fluidImage
          #       }
          #     }
          #   }
          # }
        }
      }
    }
  }

  fragment _prismicProjects on PrismicProjects{
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
`;
