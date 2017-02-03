import React, {Component, PropTypes} from 'react'
import loadScript from '../../helpers/loadScript'
import config from '../../config'
import Radium from 'radium'
import styles from './styles'

const PROP_TYPES = {
  key: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  zoom: PropTypes.number,
  pitch: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  mapLoaded: PropTypes.func,
  setTrip: PropTypes.func,
  tripStarted: PropTypes.bool,
}

class Navigate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gradientOpacity: 1,
      hideGradient: false,
    }
    this.locationUpdated = this.locationUpdated.bind(this)
    this.getMapStyles = this.getMapStyles.bind(this)
    this.initiateMap = this.initiateMap.bind(this)
    this.initiateNavigation = this.initiateNavigation.bind(this)
    this.drawUserMarker = this.drawUserMarker.bind(this)
    this.tripStarted = this.tripStarted.bind(this)
    this.destinationLoaded = false
  }
  componentDidMount() {
    this.loadMapBox()
  }
  componentWillReceiveProps(nextProps) {
    const {zoom, latitude, longitude} = this.props
    if (latitude && longitude && (nextProps.latitude !== latitude) || (nextProps.longitude !== longitude)) {
      this.locationUpdated(nextProps.longitude, nextProps.latitude, nextProps.pitch, nextProps.heading)
    }
    if (nextProps.tripStarted) {
      this.tripStarted()
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
  initiateMap() {
    const self = this
    const {latitude, longitude, pitch, zoom, setTrip} = this.props
    mapboxgl.accessToken = config.mapBoxAccessToken
    this.directions = new MapboxDirections({
      interactive: false,
      accessToken: config.mapBoxAccessToken,
      unit: 'metric',
      profile: 'driving',
      container: 'directions',
      geocoder: {
        options: {
          zoom,
          flyTo: false,
        }
      },
      controls: {
        inputs: false,
        instructions: false,
      }
    })
    this.map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/cruze/ciyi2a07t001u2soclwrzjcmt',
    })
    this.map.addControl(this.directions)
    this.map.on('load', () => {
      this.initiateNavigation()
      this.drawUserMarker()
    })
    this.directions.on('route', (e) => {
      console.log("ON ROUTE")
      console.log(e)
      setTrip(e.route[0].distance, e.route[0].duration, e.route[0].steps)
      setTimeout(() => {
        self.map.flyTo({
          center: [longitude, latitude],
          speed: 1.5,
          curve: 1,
          zoom,
          pitch,
        });
        setTimeout(() => {
          self.map.rotateTo(e.route[0].steps[0].heading)
          self.destinationLoaded = true
        }, 3000)
      }, 1200)
    })
  }
  initiateNavigation() {
    const {latitude, longitude, destLatitude, destLongitude} = this.props
    this.directions.setOrigin([longitude, latitude])
    this.directions.setDestination([destLongitude, destLatitude])
  }
  drawUserMarker() {
    const {latitude, longitude} = this.props
    const userLocation = {
      type: 'Point',
      coordinates: [longitude, latitude],
    }
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
  }
  locationUpdated(longitude, latitude, pitch, heading) {
    const point = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };
    if (this.destinationLoaded) {
      console.log("### LOCATION HAS UPDATED, DONE ANIMATING")
      this.map.getSource('user-location').setData(point)
    } else {
      console.log("### LOCATION HAS UPDATED, BUT STILL ANIMATING")
    }
    this.map.flyTo({
      center: [longitude, latitude],
      speed: 2,
      curve: 1,
      pitch,
      heading,
    })
  }
  tripStarted() {
    const self = this
    this.setState({
      gradientOpacity: 0,
    }, () => {
      setTimeout(() => {
        self.setState({
          hideGradient: true,
        })
      }, 1000)
    })
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
    const {gradientOpacity, hideGradient} = this.state
    return (
      <div style={styles.container}>
        <div
          ref={'mapContainer'}
          id={'map-container'}
          style={[styles.mapContainer, this.getMapStyles()]}
        />
        {!hideGradient ? <div style={{...styles.mapOverlayGradient, ...{opacity: gradientOpacity}}} /> : null }
      </div>
    )
  }
}

Navigate.propTypes = PROP_TYPES

export default Radium(Navigate)
