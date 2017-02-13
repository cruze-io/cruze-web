import React, {Component, PropTypes} from 'react'
import loadScript from '../../helpers/loadScript'
import config from '../../config'
import mapBox from '../../constants/mapBox'
import Text from '../Text'
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
  destinationLoaded: PropTypes.bool,
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
    this.renderDestinationInformation = this.renderDestinationInformation.bind(this)
    this.startTrackingUserHeading = this.startTrackingUserHeading.bind(this)
  }
  componentDidMount() {
    this.loadMapBox()
  }
  componentWillReceiveProps(nextProps) {
    const {zoom, latitude, longitude, heading, destinationLoaded} = this.props
    if (latitude && longitude && (nextProps.latitude !== latitude) || (nextProps.longitude !== longitude)) {
      this.locationUpdated(nextProps.longitude, nextProps.latitude, nextProps.pitch, nextProps.heading)
    }
    if (heading && (nextProps.heading !== heading)) {
      this.locationUpdated(nextProps.longitude, nextProps.latitude, nextProps.pitch, nextProps.heading)
    }
    if (nextProps.tripStarted) {
      this.tripStarted()
    }
  }
  loadMapBoxDirection() {
    const src = mapBox.mapBoxDirectionsSrc
    loadScript(src, this.initiateMap)
  }
  loadMapBox() {
    const self = this
    const src = mapBox.mapBoxGlSrc
    loadScript(src, () => {
      self.loadMapBoxDirection()
    })
  }
  initiateMap() {
    const self = this
    const {latitude, longitude, pitch, zoom, setTrip, heading} = this.props
    mapboxgl.accessToken = config.mapBoxAccessToken
    this.directions = new MapboxDirections({
      ...mapBox.gpsDirectionsConfig,
    })
    this.map = new mapboxgl.Map({
      ...mapBox.gpsMapConfig,
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
    })
  }
  initiateNavigation() {
    const {latitude, longitude, destLatitude, destLongitude} = this.props
    const self = this
    this.directions.setOrigin([longitude, latitude])
    this.directions.setDestination([destLongitude, destLatitude])
  }
  drawUserMarker() {
    const {latitude, longitude} = this.props
    const userLocation = {
      type: 'Point',
      coordinates: [longitude, latitude],
    }
    this.map.addSource('user-location', { type: 'geojson', data: userLocation })
    mapBox.gpsUserLocationMarker.forEach((layer) => {
      this.map.addLayer(layer)
    })
  }
  locationUpdated(longitude, latitude, pitch, heading) {
    const self = this
    const {tripStarted} = this.props
    const point = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };
    if (tripStarted) {
      this.mapUpdating = true
      this.map.getSource('user-location').setData(point)
      this.map.flyTo({
        center: [longitude, latitude],
        speed: 2,
        curve: 1,
        heading,
      })
      setTimeout(() => {
        self.mapUpdating = false
      }, 2000)
    }
  }
  startTrackingUserHeading() {
    const handleOrientation = (event) => {
      if (event && event.alpha) {
        this.map.rotateTo(event.alpha)
      }
    }
    window.addEventListener("deviceorientation", handleOrientation, true);
  }
  tripStarted() {
    const self = this
    const {longitude, latitude, zoom, pitch, heading, destinationLoaded} = this.props
    this.mapUpdating = true
    if (destinationLoaded) {
      this.setState({
        gradientOpacity: 0,
      }, () => {
        setTimeout(() => {
          self.setState({
            hideGradient: true,
          })
          self.map.flyTo({
            center: [longitude, latitude],
            speed: 2,
            curve: 1,
            zoom,
            pitch,
          })
          setTimeout(() => {
            self.map.rotateTo(heading)
            self.startTrackingUserHeading()
          }, 2000)
        }, 1000)
      })
    } else {
      console.log("### SHIT AINT EVEN LOAD YET")
    }
  }
  getMapStyles() {
    const {width, height} = this.props
    return {
      width: width || '100%',
      height: height || '100%',
    }
  }
  renderDestinationInformation() {
    const {gradientOpacity} = this.state
    return (
      <div style={{...styles.destinationInformationContainer, ...{opacity: gradientOpacity}}}>
        <div style={styles.mapOverlayGradient} />
        <div style={styles.infoContainer}>
          <Text
            text={'NAVIGATING TO'}
            size={'xSmall'}
            weight={'regular'}
            styles={styles.heading}
          />
          <Text
            text={'PAGE MILL RD'}
            size={'large'}
            weight={'light'}
            styles={styles.destinationName}
          />
        </div>
      </div>
    )
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
        {!hideGradient ? this.renderDestinationInformation() : null }
      </div>
    )
  }
}

Navigate.propTypes = PROP_TYPES

export default Radium(Navigate)
