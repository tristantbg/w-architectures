import React, { Component } from "react";
import { LocaleContext } from "./Layout";

const ProjectInfos = ({ data }) => {
  const lang = React.useContext(LocaleContext);
  const i18n = lang.i18n[lang.locale];
  const columns = ["localisation","year","program","type"]
  
  return (
    <div className="project-infos ">
      <div className="infos b-t">
        <div className="row">
          {data.download && data.download.url && (
            <div className="col-xs-12">
              <div className="b-b pad">
                <a href={data.download.url} target="_blank">
                  {i18n["download"]}
                </a>
              </div>
            </div>
          )}
          <div className="col-xs-12 col-md-6">
            <div
              className="texte"
              dangerouslySetInnerHTML={{ __html: data.texte.html }}
            />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="fiche_technique">
              {columns.map((col, i) => (
                <div className="row" key={i}>
                <div className="col-xs label">{i18n[col]}</div>
                <div className="col-xs value">
              
                  {data[col] && typeof data[col] === "string" &&
                    <span>{data[col]}</span>
                  }
                  {data[col] && typeof data[col] === "object" &&
                    <span>{data[col].text}</span>
                  }
                </div>
                <div className="col-xs"></div>
                <div className="col-xs"></div>
                </div>
              ))}

              {data.fiche_technique.map((item, i) => (
                <div className="row" key={i}>
                  <div className="col-xs label">{item.label.text}</div>
                  <div className="col-xs value">{item.value.text}</div>
                  <div className="col-xs"></div>
                  <div className="col-xs"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfos;
