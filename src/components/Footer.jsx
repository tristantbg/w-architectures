import React from "react";
import { useStaticQuery, graphql } from "gatsby";
// import website from "../../config/website";

// import { LocaleContext } from "./Layout";
import { ContextHoc } from "../context/ContextHoc";
import LocalizedLink from "./LocalizedLink";
import BackToTop from "./ui/BackToTop";
import Social from "./ui/Social"

const Footer = (props) => {
  // console.log(props)
  const { i18n, locale } = props.context;
  const translate = i18n[locale];
  const { options } = useStaticQuery(query);
  return (
    <footer>
      <div className="inner pad b-t">
        <div className="row between-xs">
          <div className="col-xs">
            <div className="footer-left">
              <div className="fl">
                <ul>
                  <li>
                    <a href={`mailto:${options.data.contact.text}`}>
                      {options.data.contact.text}
                    </a>
                  </li>
                </ul>
                
                <Social />
              </div>
            </div>
          </div>
          <div className="col-xs">
            <div className="footer-right">
              <ul className="fl end-xs">
                <li>
                  <BackToTop />
                </li>
                <li>
                  <LocalizedLink to="contact">{translate['contact']}</LocalizedLink>
                </li>
              </ul>
            </div>


          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContextHoc(Footer);

const query = graphql`
  query Options {
    options: prismicOptions {
      data {
        tel {
          text
        }
        contact {
          text
        }
      }
    }
  }
`;
