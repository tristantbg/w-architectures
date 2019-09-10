import React from "react";
import Img from "gatsby-image";

const Images = ({ input }) => {
  const column = 12 / input.items.length;
  //console.log(input);
  return (
    <section className="slice images">
      <h2 className="headline b-b pad">{input.primary.title1.text}</h2>
      <div className="content liste-images">
        {input.items.map((item, i) => (
          <div className="row" key={i}>
            <div className={"col-xs-12 col-md-" + item.column}>
              <Img
                fluid={item.image.localFile.childImageSharp.fluid}
                Tag="figure"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Images;
