import React, { Component } from "react";
import { useStaticQuery, graphql } from "gatsby";
// import website from "../../config/website";

// import { LocaleContext } from "./Layout";
import { ContextHoc } from "../context/ContextHoc";
import LocalizedLink from "./LocalizedLink";
import BackToTop from "./ui/BackToTop";
import Social from "./ui/Social"

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };

    
  }

  componentDidMount(){
    
    const { hostname } = window.location
    // console.log(hostname)
    let email = this.props.context.options.data.contact.text
    if(hostname.indexOf(".ch") > -1){
      email = email.replace(".com", ".ch")
    }
    this.setState({
      email: email
    })
  }

  render() {
    const { email } = this.state
    
    const { i18n, locale } = this.props.context;
    const translate = i18n[locale];
    // const { options } = useStaticQuery(query);
    return (
      <footer>
        <div className="inner pad b-t">
          <div className="row between-xs">
            <div className="col-xs">
              <div className="footer-left">
                <div className="fl">
                  <ul>
                    <li>
                      <a href={`mailto:${email}`}>
                        {email}
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
  }
};

export default ContextHoc(Footer);

// const query = graphql`
//   query Options {
//     options: prismicOptions {
//       data {
//         tel {
//           text
//         }
//         contact {
//           text
//         }
//       }
//     }
//   }
// `;
