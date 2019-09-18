import React from "react";

const Textes = ({ input }) => {
  const column = 12 / input.items.length;
  //const texteClass = item.column === 1 ? "" : "column-"+item.column
  console.log(input)
  return (
    <section className="slice textes">
      <h2 className="headline b-b pad">{input.primary.title1.text}</h2>
      <div className="content pad">
        <div className="row">
          {input.items.map((item, i) => (
            <div className={"col-xs-12 col-md-" + column} key={i}>
              {item.texte && (
                <div
                  className={"texte "+ (item.column === 1 ? "" : "column-"+item.column)}
                  dangerouslySetInnerHTML={{ __html: item.texte.html }}
                />
              )}
              {item.texte1 && (
                <div
                  className="texte"
                  dangerouslySetInnerHTML={{ __html: item.texte1.html }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Textes;
