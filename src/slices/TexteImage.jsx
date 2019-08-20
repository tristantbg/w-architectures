import React from "react";
import Img from "gatsby-image";

const TexteImage = ({ input }) => {
  return (
    <section className="texte-image">
      <h2 className="headline b-b pad">{input.primary.title1.text}</h2>
      <div className="content pad">
        <div className="row">
          <div className="col-md-6">
            <div
              dangerouslySetInnerHTML={{ __html: input.primary.texte.html }}
            />
          </div>
          <div className="col-md-6">
            <Img fluid={input.primary.image.localFile.childImageSharp.fluid} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TexteImage;
