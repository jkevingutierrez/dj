import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import RaisedButton from './Button/RaisedButton';
import { success as mapSuccess } from '../actions/map';
import localitiesGeoJSON from '../assets/data/localidades.geojson';
import gmapsStyles from '../assets/data/gmaps-styles.json';

const style = {
  width: '100%',
  height: '100%'
};

const GOOGLE_MAPS_API_KEY = 'AIzaSyBYuNcKCVqlkr-le0gxLDYwq-EWBt5Jbvg';

export class MapComponent extends Component {
  state = {
    showingInfoWindow: false,
    positionInfoWindow: null,
    activeMarker: {},
    selectedPlace: {}
  };

  // onMarkerClick = (props, marker, e) => {
  //   this.setState({
  //     selectedPlace: props,
  //     showingInfoWindow: true
  //   });
  // };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.state.selectedPlace._feature.setProperty('isClicked', false);
      this.setState({
        showingInfoWindow: false,
        selectedPlace: {}
      });
    }
  };

  onMapDragend = (mapProps, map) => {
    // ...
  };

  onInfoWindowClose = (...args) => {
    if (this.state.showingInfoWindow) {
      this.state.selectedPlace._feature.setProperty('isClicked', false);
      this.setState({
        showingInfoWindow: false,
        selectedPlace: {}
      });
    }
  };

  renderInfoWindowContent = () => {
    ReactDOM.render(
      <div>
        <RaisedButton onClick={this.onInfoWindowButtonClick}>Seleccionar</RaisedButton>
        {/* <button onClick={this.onInfoWindowButtonClick}>Seleccionar</button> */}
      </div>,
      document.getElementById('iw-content')
    );
  };

  onInfoWindowButtonClick = (event) => {
    console.log('onInfoWindowButtonClick()', event);
  };

  onReady = (mapProps, map) => {
    // const { google } = mapProps;
    // const service = new google.maps.places.PlacesService(map);
    this.props.dispatch(mapSuccess({ mapProps, map }));
    map.data.loadGeoJson(localitiesGeoJSON);
    map.data.setStyle((feature) => {
      let fillColor = '#00bcd4';
      let strokeColor = '#0097a7';
      let strokeWeight = 1;
      let fillOpacity;
      let zIndex;
      if (feature.getProperty('isOver')) {
        fillOpacity = 0.5;
        strokeWeight = 2;
        zIndex = 999;
      }
      if (feature.getProperty('isClicked')) {
        fillColor = '#0097a7';
        fillOpacity = 0.7;
        strokeWeight = 4;
        zIndex = 999;
      }
      return {
        fillColor,
        fillOpacity,
        strokeColor,
        strokeWeight,
        zIndex
      };
    });
    map.data.addListener('mouseover', (event) => {
      event.feature.setProperty('isOver', true);
    });
    map.data.addListener('mouseout', (event) => {
      event.feature.setProperty('isOver', false);
    });
    map.data.addListener('click', (event) => {
      if (this.state.selectedPlace._feature !== void 0) {
        this.state.selectedPlace._feature.setProperty('isClicked', false);
      }
      event.feature.setProperty('isClicked', true);
      this.setState(
        () => ({
          showingInfoWindow: true,
          positionInfoWindow: event.latLng,
          selectedPlace: {
            name: event.feature.getProperty('NOMBRE'),
            _feature: event.feature
          }
        }),
        this.renderInfoWindowContent
      );
    });
  };

  render() {
    return (
      <Map
        google={this.props.google}
        style={style}
        styles={gmapsStyles}
        initialCenter={{
          lat: 4.60971,
          lng: -74.08175
        }}
        zoom={10}
        onClick={this.onMapClicked}
        onDragend={this.onMapDragend}
        onReady={this.onReady}
      >
        {/* <Marker onClick={this.onMarkerClick} name={'Current location'} /> */}
        <InfoWindow
          // marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          position={this.state.positionInfoWindow}
          onClose={this.onInfoWindowClose}
        >
          <div>
            <h3>{this.state.selectedPlace.name}</h3>
            <div id="iw-content" />
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({ apiKey: GOOGLE_MAPS_API_KEY })(connect()(MapComponent));
