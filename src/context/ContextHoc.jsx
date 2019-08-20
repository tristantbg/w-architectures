import React from "react";
import { LocaleContext } from "../components/Layout";

export function ContextHoc(Component) {
  return function WrapperComponent(props) {
    return (
      <LocaleContext.Consumer>
        {state => <Component {...props} context={state} />}
      </LocaleContext.Consumer>
    );
  };
}
