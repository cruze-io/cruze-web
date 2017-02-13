import React, {Component, PropTypes} from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Radium, {StyleRoot} from 'radium'
import { connect } from 'react-redux'
import Helmet from '../../components/HelmetContainer'
import * as GeoActions from '../../actions/geo'
import Map from '../../components/Map'
import Navigate from '../../components/Navigate'
import NavigationControls from '../../components/NavigationControls'
import Navigation from '../../components/Navigation'
import styles from './styles'

const PROP_TYPES = {
  geo: ImmutablePropTypes.map,
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
  mapLoaded() {
    const {dispatch, geo} = this.props
  }
  renderMap() {
    const {geo, dispatch} = this.props
    return (
      <Navigate
        latitude={geo.get('latitude')}
        longitude={geo.get('longitude')}
        destLatitude={geo.get('destinationLatitude')}
        destLongitude={geo.get('destinationLongitude')}
        destinationPath={geo.get('destinationPath')}
        zoom={geo.get('zoom')}
        pitch={geo.get('pitch')}
        heading={geo.get('heading')}
        mapLoaded={this.mapLoaded}
        tripStarted={geo.get('tripStarted')}
        setTrip={(distance, duration, tripSteps) => {dispatch(GeoActions.setTrip(distance, duration, tripSteps))}}
        destinationLoaded={geo.get('destinationLoaded')}
      />
    )
  }
  renderMapLoader() {
    return (
      <div style={styles.mapLoaderContainer} />
    )
  }
  render() {
    const {geo, dispatch} = this.props
    console.log(this.props.geo.toJS())
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
          <div style={styles.controlsContainer}>
            <NavigationControls
              duration={geo.get('duration')}
              distance={geo.get('distance')}
              tripSteps={geo.get('tripSteps')}
              tripStarted={geo.get('tripStarted')}
              startTrip={() => {dispatch(GeoActions.startTrip())}}
              destinationLoaded={geo.get('destinationLoaded')}
            />
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
