import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet-universal";

class Location extends Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      active: false
    };
    this._toggle = this._toggle.bind(this);
  }

  componentDidMount(){
    this.setState({
      ready: true
    })
  }

  _toggle(e) {
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    const { active, ready } = this.state;
    const { item } = this.props;
    //console.log(input)
    return (
      <div className={"location " + (active ? "active" : "")}>
        <div className="row">
          <div className={"col-md-12"}>
            <div className="title b-b pad" onClick={e => this._toggle(e)}>
              {item.title1.text}
            </div>
            <div className="location-content">
              <address
                className="title b-b pad"
                dangerouslySetInnerHTML={{ __html: item.texte1.html }}
              />

              {ready && active && (
                <div className="map-container">
                  {/* <Map
                    id={"map-" + Math.random() * 999}
                    center={[item.geoloc.latitude, item.geoloc.longitude]}
                    zoom={13}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker
                      position={[item.geoloc.latitude, item.geoloc.longitude]}
                    >
                      <Popup>
                        {item.title1.text} <br /> {item.texte1.text}
                      </Popup>
                    </Marker>
                  </Map> */}
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
