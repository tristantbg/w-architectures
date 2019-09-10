import React from "react";
import ListeItem from "./ListeItem";

const Liste = ({ input }) => {
  //const {input} = this.props
  //console.log(input)
  return (
    <section className="slice liste">
      <h2 className="headline b-b pad">{input.primary.title1.text}</h2>
      <div className="content">
        {input.items.map((item, i) => (
          <ListeItem item={item} key={i} />
        ))}
      </div>
    </section>
  );
};

export default Liste;
