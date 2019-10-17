import React from "react";
import { Link } from "gatsby";
import { LocaleContext } from "../Layout";
import locales from "../../../config/i18n";

const LocaleSwitcher = () => {
    const { locale } = React.useContext(LocaleContext);
// console.log(locale)
    return (
        <ul className="locale-switcher">
        {Object.values(locales).map((value, i) => {
            // console.log(value)
            const _liClassName = value.locale === locale ? 'active' : ''
            return(
                <li key={i} className={_liClassName}>
                    <Link
                    hrefLang={value.locale}
                    to={"/" + (value.default ? "" : value.path)}
                    >
                    {value.localeName}
                    </Link>
                </li>
            )
        }
            
        )}
        </ul>
    );
  };
  
  export default LocaleSwitcher;