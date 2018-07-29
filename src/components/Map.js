import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { success as mapSuccess } from '../actions/map';

const style = {
  width: '100%',
  height: '100%'
};

const GOOGLE_MAPS_API_KEY = 'AIzaSyBYuNcKCVqlkr-le0gxLDYwq-EWBt5Jbvg';

export class MapComponent extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onMapDragend(mapProps, map) {
    // ...
  }

  onReady = (mapProps, map) => {
    // const { google } = mapProps;
    // const service = new google.maps.places.PlacesService(map);
    this.props.dispatch(mapSuccess({ mapProps, map }));
  };

  render() {
    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 40.854885,
          lng: -88.081807
        }}
        zoom={15}
        onClick={this.onMapClicked}
        onDragend={this.onMapDragend}
        onReady={this.onReady}
      >
        <Marker onClick={this.onMarkerClick} name={'Current location'} />
        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({ apiKey: GOOGLE_MAPS_API_KEY })(connect()(MapComponent));
