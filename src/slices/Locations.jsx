import React from "react";
import Location from "./Location";

const Locations = ({ input }) => {
  //const {input} = this.props
  //console.log(input)
  return (
    <section className="locations">
      <h2 className="headline b-b pad">{input.primary.title1.text}</h2>
      <div className="content">
        {input.items.map((item, i) => (
          <Location item={item} key={i} />
        ))}
      </div>
    </section>
  );
};

export default Locations;
