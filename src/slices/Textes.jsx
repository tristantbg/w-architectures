import React from "react";

const Textes = ({ input }) => {
  const column = 12 / input.items.length;
  return (
    <section className="textes">
      <h2 className="headline b-b pad">{input.primary.title1.text}</h2>
      <div className="content pad">
        <div className="row">
          {input.items.map((item, i) => (
            <div className={"col-md-" + column} key={i}>
              <div
                className="texte"
                dangerouslySetInnerHTML={{ __html: item.texte.html }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Textes;
