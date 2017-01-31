import React, {Component, PropTypes} from 'react'
import Radium, {StyleRoot} from 'radium'
import { connect } from 'react-redux'
import Helmet from '../../components/HelmetContainer'
import * as GeoActions from '../../actions/geo'
import Map from '../../components/Map'
import Navigate from '../../components/Navigate'
import Navigation from '../../components/Navigation'
import styles from './styles'

const PROP_TYPES = {
}

class Geo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.renderMap = this.renderMap.bind(this)
    this.renderMapLoader = this.renderMapLoader.bind(this)
    this.mapLoaded = this.mapLoaded.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(GeoActions.getLocation())
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    console.log(nextProps.geo.toJS())
  }

  mapLoaded() {
    const {dispatch, geo} = this.props
    dispatch(GeoActions.navigateTo())
  }
  renderMap() {
    const {geo} = this.props
    return (
      <Navigate
        latitude={geo.get('latitude')}
        longitude={geo.get('longitude')}
        destLatitude={geo.get('destinationLatitude')}
        destLongitude={geo.get('destinationLongitude')}
        destinationPath={geo.get('destinationPath')}
        navigationGeoJson={geo.get('navigationGeoJson')}
        zoom={geo.get('zoom')}
        tilt={geo.get('tilt')}
        heading={geo.get('heading')}
        mapLoaded={this.mapLoaded}
      />
    )
  }

  renderMapLoader() {
    return (
      <div style={styles.mapLoaderContainer} />
    )
  }

  render() {
    const {geo} = this.props
    return (
      <StyleRoot>
        <Helmet
          title={'Cruze GPS'}
          description={'Gps for cruze app'}
          fonts={['100', '300', '400', '600', '700']}
          iconSet={'fontastic'}
          route={'gps'}
        />
        <div style={styles.container}>
          <div style={styles.mapContainer}>
            {geo.get('latitude') ? this.renderMap() : null}
            {this.renderMapLoader()}
          </div>

        </div>
      </StyleRoot>
    )
  }
}

Geo.propTypes = PROP_TYPES

const mapStateToProps = (state) => {
  return {
    geo: state.get('geo')
  }
}

export default Radium(connect(mapStateToProps)(Geo))
