import React, {Component, PropTypes} from 'react'
import loadScript from '../../helpers/loadScript'
import Radium from 'radium'
import styles from './styles'
// const mapboxgl = require('mapbox-gl');
// const MapboxDirections = require('@mapbox/mapbox-gl-directions');

const PROP_TYPES = {
  key: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  zoom: PropTypes.number,
  heading: PropTypes.number,
  tilt: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  mapLoaded: PropTypes.func,
}

class Navigate extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.locationUpdated = this.locationUpdated.bind(this)
    this.getMapStyles = this.getMapStyles.bind(this)
    this.mapZoomUpdated = this.mapZoomUpdated.bind(this)
    this.initiateMap = this.initiateMap.bind(this)
    this.initiateNavigation = this.initiateNavigation.bind(this)
  }
  componentDidMount() {
    this.loadMapBox()
  }
  componentWillReceiveProps(nextProps) {
    const {zoom, tilt, heading, latitude, longitude} = this.props
    if (latitude && longitude && (nextProps.latitude !== latitude) || (nextProps.longitude !== longitude)) {
      this.locationUpdated()
    }
    if (nextProps.zoom !== this.props.zoom) {
      this.mapZoomUpdated()
    }
  }
  loadMapBoxDirection() {
    const src = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v3.0.3/mapbox-gl-directions.js'
    loadScript(src, this.initiateMap)
  }
  loadMapBox() {
    const self = this
    const src = 'https://api.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.js'
    loadScript(src, () => {
      self.loadMapBoxDirection()
    })
  }
  getMapBearing(direction) {
    switch(direction) {
      case 'S':
        return 180
        break
      case 'N':
       return 0
       break
      case 'E':
        return 90
        break
      case 'W':
        return 22.5
        break
    }
  }
  getMapConfig() {
    const {zoom, tilt, heading, pitch, latitude, longitude} = this.props
    return {
      center: {lat: latitude, lng: longitude},
      rotateControl: true,
      zoom: zoom || 20,
      heading: heading || 90,
      tilt: tilt || 100,
      pitch: pitch || 38,
    }
  }
  initiateMap() {
    const self = this
    const {latitude, longitude} = this.props
    mapboxgl.accessToken = 'pk.eyJ1IjoiY3J1emUiLCJhIjoiY2l5aHlkcXVnMDU1cTJxbWd5cHVqd2l0YSJ9.LH-4KY27ylehvphxqbrZgg'
    this.directions = new MapboxDirections({
      interactive: false,
      accessToken: 'pk.eyJ1IjoiY3J1emUiLCJhIjoiY2l5aHlkcXVnMDU1cTJxbWd5cHVqd2l0YSJ9.LH-4KY27ylehvphxqbrZgg',
      unit: 'metric',
      profile: 'driving',
      container: 'directions',
      geocode: {
        zoom: 5,
      },
      controls: {
        inputs: false,
        instructions: false,
      }
    })
    this.map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/cruze/ciyi2a07t001u2soclwrzjcmt',
      ...this.getMapConfig(),
    })
    this.map.addControl(this.directions)
    this.map.on('load', this.initiateNavigation)
    this.directions.on('route', (e) => {
      console.log(e)
      setTimeout(() => {
        self.map.flyTo({
          center: [longitude, latitude],
          zoom: 18,
          speed: 1.5,
          curve: 1,
          pitch: 50,
        });
        setTimeout(() => {
          self.map.rotateTo(e.route[0].steps[0].heading)
        }, 3000)
      }, 5000)
    })
  }
  initiateNavigation() {
    const {latitude, longitude, destLatitude, destLongitude} = this.props
    const userLocation = {
      type: 'Point',
      coordinates: [longitude, latitude],
    }
    this.directions.setOrigin([longitude, latitude])
    this.directions.setDestination([destLongitude, destLatitude])
    this.map.addSource('user-location', { type: 'geojson', data: userLocation });
    this.map.addLayer({
      id: 'user-outer-ring',
      type: 'circle',
      source: 'user-location',
      paint: {
        'circle-radius': 30,
        'circle-color': '#FFFFFF',
        'circle-opacity': 0.4,
      }
    })
    this.map.addLayer({
      id: 'user-outer-circle',
      type: 'circle',
      source: 'user-location',
      paint: {
        'circle-radius': 10,
        'circle-color': '#E74FFE',
        'circle-opacity': 1,
      }
    })
    this.map.addLayer({
      id: 'user-inner-cirlce',
      type: 'circle',
      source: 'user-location',
      paint: {
        'circle-radius': 2,
        'circle-color': '#FFFFFF',
        'circle-opacity': 1,
      }
    })
    // this.map.setLayoutProperty('user', 'icon-rotate', direction * (180 / Math.PI));
  }
  locationUpdated() {
    const {latitude, longitude} = this.props
    this.map.setCenter({
      lat: latitude,
      lng: longitude,
    })
  }
  mapZoomUpdated() {
    const {zoom} = this.props
    this.map.setZoom(zoom)
  }
  getMapStyles() {
    const {width, height} = this.props
    return {
      width: width || '100%',
      height: height || '100%',
    }
  }
  render() {
    const {key} = this.props
    return (
      <div style={styles.container}>
        <div
          ref={'mapContainer'}
          id={'map-container'}
          style={[styles.mapContainer, this.getMapStyles()]}
        >
        </div>
      </div>
    )
  }
}

Navigate.propTypes = PROP_TYPES

export default Radium(Navigate)
