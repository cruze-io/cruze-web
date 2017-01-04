import React, {Component, PropTypes} from 'react'
import Radium from 'radium'
import loadScript from '../../helpers/loadScript'
import styles from './styles'

const PROP_TYPES = {
  longitude: PropTypes.number,
  latitude: PropTypes.number,
  heading: PropTypes.number,
  speed: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  mapLoaded: PropTypes.func,
}

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.generateMapStyles = this.generateMapStyles.bind(this)
    this.renderMap = this.renderMap.bind(this)
    this.mapScriptLoaded = this.mapScriptLoaded.bind(this)
    this.skobblerPluginLoaded = this.skobblerPluginLoaded.bind(this)
  }
  componentDidMount() {
    this.loadLeafLetMap()
  }
  loadLeafLetMap() {
    loadScript('https://unpkg.com/leaflet@1.0.2/dist/leaflet.js', this.mapScriptLoaded)
  }
  loadSkrobblerPlugin() {
    loadScript('/assets/skobbler-2.0.min.js', this.skobblerPluginLoaded)
  }
  mapScriptLoaded(error, response) {
    this.L = L
    this.loadSkrobblerPlugin()
  }
  skobblerPluginLoaded() {
    console.log("### SKOBBLER PLUGIN LOADED")
    this.renderMap()
  }
  generateMapStyles() {
    const {width, height} = this.props
    return {
      width: width || '100%',
      height: height || '100%',
    }
  }
  renderMap() {
    const {latitude, longitude, mapLoaded} = this.props
    this.map = this.L.skobbler.map('map', {
      apiKey: 'e3bc4c8919ba94eae9c6f37f41da31b7',
      mapStyle: 'day',
      onewayArrows: true,
      pois: 'all',
      primaryLanguage: 'en',
      fallbackLanguage: 'en',
      mapLabels: 'localNaming',
      retinaDisplay: 'auto',
      zoomControl: false,
      center: [latitude, longitude],
      zoom: 12,
    })
    console.log(this.map)
    mapLoaded()

  }
  render() {
    return (
      <div
        id={'map'}
        style={[styles.container, this.generateMapStyles()]}>
      </div>
    )
  }
}

Navigation.propTypes = PROP_TYPES

export default Radium(Navigation)
