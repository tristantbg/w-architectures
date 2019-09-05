import React from "react";

const ProjectTitle = ({ title, localisation, year }) => {
  return (
    <div className="project-title">
      <span>{title}</span>, <span>{localisation}</span>, <span>{year}</span>
    </div>
  );
};

export default ProjectTitle;
