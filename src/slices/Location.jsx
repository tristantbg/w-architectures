import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet-universal";
// import { Map, Marker, Popup, TileLayer } from "react-leaflet";
// import L from 'leaflet'
// import JsonLd from '../components/ui/JsonLd'

class Location extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
      icon: null
    };
    this._toggle = this._toggle.bind(this);
  }

  componentDidMount() {
    const L = require("leaflet");
    const pointerIcon = L.icon({
      iconUrl: require("../images/marker-icon.svg"),
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [-3, -76],
      shadowUrl: require("../images/marker-shadow.png"),
      shadowSize: [25, 41],
      shadowAnchor: [5, 41]
    });
    this.setState({
      icon: pointerIcon
    });
  }
  _toggle() {
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    const { active, icon } = this.state;
    const { item } = this.props;

    //const layerUrl = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png"
    // const key = "c92f820ec8abcfd7f51b075e3efa157e";
    // const layerUrl = "https://tile.geofabrik.de/" + key + "/{z}/{x}/{y}.png"
    //const layerUrl = "http://a.tile.stamen.com/toner/{z}/{x}/{y}.png"
    const layerUrl =
      //"https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png";
      "https://stamen-tiles.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png";

    // const data = {
    //   "@context": "https://schema.org",
    //   "@type": "Organization",
    //   "url": "https://www.w-architectures.com/",
    //   "contactPoint": [
    //     { "@type": "ContactPoint",
    //       "telephone": "+1-401-555-1212",
    //       "contactType": "customer service"
    //     }
    //   ]
    // };

    return (
      <div className={"location " + (active ? "active" : "")}>
        <div className="row">
          <div className={"col-xs-12"}>
            <div className="title b-b pad" onClick={this._toggle}>
              {item.title1.text}
            </div>
            <div className="location-content">
              <address
                className="title b-b pad"
                dangerouslySetInnerHTML={{ __html: item.texte1.html }}
              />

              {active && (
                <div className="map-container">
                  <Map
                    id={"map-" + Math.random() * 999}
                    center={[item.geoloc.latitude, item.geoloc.longitude]}
                    zoom={13}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      url={layerUrl}
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker
                      position={[item.geoloc.latitude, item.geoloc.longitude]}
                      icon={icon ? icon : null}
                    >
                      <Popup>
                        {item.title1.text} <br /> {item.texte1.text}
                      </Popup>
                    </Marker>
                  </Map>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Location;
