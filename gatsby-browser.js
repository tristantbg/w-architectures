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

export const onClientEntry = () => {
  console.log("We've started!")
  // callAnalyticsAPI()
  const isTouch = 'ontouchstart' in window ? true : false;
  console.log(isTouch)
  if(isTouch){
    document.documentElement.classList.add("touch")
  }else{
    document.documentElement.classList.add("no-touch")
  }
}

export const onRouteUpdate = ({ location }) => {
  //console.log("")
    //console.log('new pathname', location.pathname)
    // if(document){
    //     const header = document.querySelector("header")
    //     const footer = document.querySelector("footer")
        
    //     if(header){
    //         header.classList.add("p-e-n")
    //         setTimeout(() => {
    //             header.classList.remove("p-e-n")
    //         }, 500)
    //     }
    //     //if(footer)footer.blur()
    // }
    PubSub.publish('ROUTE_UPDATE', {
        location: location
    })
}