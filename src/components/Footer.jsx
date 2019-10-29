import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import website from "../../config/website";
import BackToTop from "./ui/BackToTop";
// import { LocaleContext } from "./Layout";
import { ContextHoc } from "../context/ContextHoc";
import LocalizedLink from "./LocalizedLink";

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
            <ul className="footer-left">
              {/* <li>{website.title}</li> */}
              <li>
                <a href={`mailto:${options.data.contact.text}`}>
                  {options.data.contact.text}
                </a>
              </li>
              {/* <li>{options.data.tel.text}</li> */}
            </ul>
          </div>
          <div className="col-xs">
            <ul className="footer-right">
              <li>
                <BackToTop />
              </li>
              <li>
                <LocalizedLink to="contact">{translate['contact']}</LocalizedLink>
                {/* <a href={`mailto:${options.data.contact.text}`}>Contact</a> */}
              </li>
            </ul>
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
