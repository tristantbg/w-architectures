import React from "react";
import Img from "gatsby-image";

const TexteImage = ({ input }) => {
  return (
    <section className="slice texte-image">
      <h2 className="headline b-b pad">{input.primary.title1.text}</h2>
      <div className="content pad">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div
              className="texte"
              dangerouslySetInnerHTML={{ __html: input.primary.texte.html }}
            />
          </div>
          <div className="col-xs-12 col-md-6">
            {input.primary.image &&
              <Img 
              fluid={input.primary.image.localFile.childImageSharp.fluid} 
              Tag="figure" />
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default TexteImage;
