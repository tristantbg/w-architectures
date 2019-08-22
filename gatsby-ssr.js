import React from 'react'
import Helmet from 'react-helmet'
import LocaleWrap from './wrapPageElement'

export const wrapPageElement = LocaleWrap

export const wrapRootElement = ({ element }) => {
    return (
      <>
        <Helmet>
        <script src="https://unpkg.com/pace-js@1.0.2/pace.min.js"></script>
        </Helmet>
        {element}
      </>
    );
}