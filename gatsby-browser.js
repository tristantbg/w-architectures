import React from 'react'
import PubSub from 'pubsub-js';
import Helmet from 'react-helmet'
import LayoutWrap from './wrapPageElement'

export const wrapPageElement = LayoutWrap

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

export const onRouteUpdate = ({ location }) => {
    //console.log('new pathname', location.pathname)
    if(document){
        const header = document.querySelector("header")
        if(header){
            header.classList.add("p-e-n")
            setTimeout(() => {
                header.classList.remove("p-e-n")
            }, 150)
        }
        
    }
    PubSub.publish('ROUTE_UPDATE', {
        location: location
    })
}