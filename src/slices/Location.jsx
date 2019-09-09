import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet-universal";
// import { Map, Marker, Popup, TileLayer } from "react-leaflet";

class Location extends Component {
  constructor() {
    super();
    this.state = {
      active: false
    };
    this._toggle = this._toggle.bind(this);
  }

  _toggle() {
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    const { active } = this.state;
    const { item } = this.props;

    //https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png
    //const key = "c92f820ec8abcfd7f51b075e3efa157e";
    //const layerUrl = "https://tile.geofabrik.de/" + key + "/${z}/${x}/${y}.png"
    const layerUrl = "http://a.tile.stamen.com/toner/{z}/{x}/{y}.png"
    //console.log(input)
    return (
      <div className={"location " + (active ? "active" : "")}>
        <div className="row">
          <div className={"col-md-12"}>
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
