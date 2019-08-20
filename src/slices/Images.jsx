import React from "react";
import Img from "gatsby-image";

const Images = ({ input }) => {
  const column = 12 / input.items.length;
  //console.log(input);
  return (
    <section className="images">
      <h2 className="headline b-b pad">{input.primary.title1.text}</h2>
      <div className="content ">
        {input.items.map((item, i) => (
          <div className="row" key={i}>
            <div className={"col-md-" + item.column}>
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
