import React from "react";
import Distinction from "./Distinction";

const Distinctions = ({ input }) => {
  //const {input} = this.props
  //console.log(input)
  return (
    <section className="distinctions">
      <h2 className="headline b-b pad">{input.primary.title1.text}</h2>
      <div className="content">
        {input.items.map((item, i) => (
          <Distinction item={item} key={i} />
          // <pre key={i}>{JSON.stringify(item)}</pre>
        ))}
      </div>
    </section>
  );
};

export default Distinctions;
