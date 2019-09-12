import { Link } from "gatsby";
//import { LocaleContext } from "./Layout";
import locales from "../../config/i18n";

const LocaleSwitcher = () => {
    //const { locale } = React.useContext(LocaleContext);

    return (
        <ul className="locale-switcher">
        {Object.values(locales).map((value, i) => (
            <li key={i}>
                <Link
                hrefLang={value.locale}
                to={"/" + (value.default ? "" : value.path)}
                >
                {value.localeName}
                </Link>
            </li>
        ))}
        </ul>
    );
  };
  
  export default LocaleSwitcher;