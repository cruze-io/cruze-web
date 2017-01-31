import React, {Component, PropTypes} from 'react'
import loadScript from '../../helpers/loadScript'
import Radium from 'radium'
import styles from './styles'

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

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.mapsScriptLoaded = this.mapsScriptLoaded.bind(this)
    this.locationUpdated = this.locationUpdated.bind(this)
    this.getMapStyles = this.getMapStyles.bind(this)
    this.mapZoomUpdated = this.mapZoomUpdated.bind(this)
    this.drawPathOnMap = this.drawPathOnMap.bind(this)
  }
  componentDidMount() {
    this.loadGoogleMaps()
  }
  componentWillReceiveProps(nextProps) {
    const {zoom, tilt, heading, latitude, longitude} = this.props
    if (latitude && longitude && (nextProps.latitude !== latitude) || (nextProps.longitude !== longitude)) {
      this.locationUpdated()
    }
    if (nextProps.zoom !== this.props.zoom) {
      this.mapZoomUpdated()
    }
    if (nextProps.destinationPath && !this.props.destinationPath) {
      this.drawPathOnMap(nextProps.destinationPath)
    }
  }
  loadGoogleMaps() {
    const src ='https://maps.googleapis.com/maps/api/js?key=AIzaSyDKtzlprtCZG6DtLjl7_AIwS5OjtEe3iFo'
    loadScript(src, this.mapsScriptLoaded)
  }
  getMapConfig() {
    const {zoom, tilt, heading, latitude, longitude} = this.props
    return {
      center: {lat: latitude, lng: longitude},
      rotateControl: true,
      zoom: zoom || 30,
      heading: heading || 90,
      tilt: tilt || 100,
    }
  }
  mapsScriptLoaded() {
    const self = this
    const {mapLoaded} = this.props
    const mapContainer = this.refs.mapContainer
    this.map = new google.maps.Map(mapContainer, this.getMapConfig())
    mapLoaded()
    this.mapLoaded = true
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
  drawPathOnMap(destinationPath) {
    console.log(destinationPath.toJS())
    const path = new google.maps.Polyline({
      path: destinationPath.toJS(),
      gedesic: true,
      strokeColor: '#C927FC',
      strokeOpacity: 1,
      strokeWeight: 3,
    })
    path.setMap(this.map)
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
      <div
        ref={'mapContainer'}
        id={'map-container'}
        style={[styles.mapContainer, this.getMapStyles()]}
      >
      </div>
    )
  }
}

Map.propTypes = PROP_TYPES

export default Radium(Map)
