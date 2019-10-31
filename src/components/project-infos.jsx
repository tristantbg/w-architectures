import React, { Component } from "react";
import LocalizedLink from "./LocalizedLink";
import { LocaleContext } from "./Layout";

const ProjectInfos = ({ data, embed }) => {
  const lang = React.useContext(LocaleContext);
  const i18n = lang.i18n[lang.locale];
  const columns = ["localisation", "year", "program", "type"];
  console.log(data)
  // const hasDl = (data.download && data.download.url) ? "has-dl" : ""
  return (
    <div className="project-infos ">
      <div className="infos">
        <div className="row">
          <div className="col-xs-12">
            <div className="b-t b-b pad">
              {embed && (
                <LocalizedLink to={data.uid}>
                  {i18n["openProject"]}
                </LocalizedLink>
              )}
              {embed && data.download && data.download.url && (
                <span className="sep">|</span>
              )}
              {data.download && data.download.url && (
                <a href={data.download.url} target="_blank">
                  {i18n["download"]}
                </a>
              )}
              
            </div>

            {!embed && !data.download.url &&
              <div className="b-t"></div>
            }

            {!embed && data.prix &&
              <div className="b-b pad">
                <div className="row">
                  {data.prix.map(({item},i) => (
                    <div key={i} className="col-md-6">{item.text}</div>
                  ))}
                </div>
              </div>
            }
          </div>

          <div className="col-xs-12 col-md-6">
            <div
              className="texte"
              dangerouslySetInnerHTML={{ __html: data.texte.html }}
            />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="fiche_technique">
              {!embed &&
                columns.map((col, i) => (
                  <div className="row" key={i}>
                    <div className="col-xs label">{i18n[col]}</div>
                    <div className="col-xs value">
                      {data[col] && typeof data[col] === "string" && (
                        <span>{data[col]}</span>
                      )}
                      {data[col] && typeof data[col] === "object" && (
                        <span>{data[col].text}</span>
                      )}
                    </div>
                    <div className="col-xs hidden-xs"></div>
                    <div className="col-xs hidden-xs"></div>
                  </div>
                ))}
              
                <div className="xs-only">
                {columns.map((col, i) => (
                <div className="row " key={i}>
                  <div className="col-xs label">{i18n[col]}</div>
                  <div className="col-xs value">
                    {data[col] && typeof data[col] === "string" && (
                      <span>{data[col]}</span>
                    )}
                    {data[col] && typeof data[col] === "object" && (
                      <span>{data[col].text}</span>
                    )}
                  </div>
                  <div className="col-xs hidden-xs"></div>
                  <div className="col-xs hidden-xs"></div>
                </div>
                ))}
                </div>
              

              {data.fiche_technique.map((item, i) => (
                <div className="row" key={i}>
                  <div className="col-xs label">{item.label.text}</div>
                  <div className="col-xs value">{item.value.text}</div>
                  {/* <div className="col-xs hidden-xs"></div>
                  <div className="col-xs hidden-xs"></div> */}
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
