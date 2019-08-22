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
      fluid(maxWidth: 1000, quality: 100) {
        ...GatsbyImageSharpFluid_withWebp
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

  fragment sharp on File {
    childImageSharp {
      fluid(maxWidth: 1280, quality: 80) {
        ...GatsbyImageSharpFluid
      }
    }
  }

  fragment project on PrismicProjects {
    data {
      title {
        text
      }
      texte {
        html
      }
      year {
        text
      }
      localisation {
        text
      }
      program
      type
      fiche_technique {
        label {
          text
        }
        value {
          text
        }
      }
      download {
        url
      }
      image_featured {
        localFile {
          ...fluidImage
        }
      }
      images {
        image {
          localFile {
            ...fluidImage
            ...thumbnail
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
            }
          }
          ... on PrismicAgencyBodyImages {
            slice_type
            primary {
              title1 {
                text
              }
            }
            items {
              column
              image {
                localFile {
                  ...fluidImage
                }
              }
            }
          }
          ... on PrismicAgencyBodyTexteImage {
            slice_type
            primary {
              title1 {
                text
              }
              texte {
                html
              }
              image {
                localFile {
                  ...fluidImage
                }
              }
            }
          }
          ... on PrismicAgencyBodyDistinctions {
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
              image {
                localFile {
                  ...fluidImage
                }
              }
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
        ... on PrismicContactBodyTexteImage {
          slice_type
          primary {
            title1 {
              text
            }
            texte {
              html
            }
            image {
              url
              localFile {
                ...fluidImage
              }
            }
          }
        }
      }
    }
  }
`;
