import config from '../config'

export const mapBoxGlSrc = 'https://api.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.js'
export const mapBoxDirectionsSrc = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v3.0.3/mapbox-gl-directions.js'

export const gpsMapConfig = {
  container: 'map-container',
  style: 'mapbox://styles/cruze/ciyi2a07t001u2soclwrzjcmt',
}

export const gpsDirectionsConfig = {
  interactive: false,
  accessToken: config.mapBoxAccessToken,
  unit: 'metric',
  profile: 'driving',
  container: 'directions',
  controls: {
    inputs: false,
    instructions: false,
  },
}

export const gpsUserLocationMarker = [{
  id: 'user-outer-ring',
  type: 'circle',
  source: 'user-location',
  paint: {
    'circle-radius': 30,
    'circle-color': '#FFFFFF',
    'circle-opacity': 0.4,
  }
}, {
  id: 'user-outer-circle',
  type: 'circle',
  source: 'user-location',
  paint: {
    'circle-radius': 10,
    'circle-color': '#E74FFE',
    'circle-opacity': 1,
  },
}, {
  id: 'user-inner-cirlce',
  type: 'circle',
  source: 'user-location',
  paint: {
    'circle-radius': 2,
    'circle-color': '#FFFFFF',
    'circle-opacity': 1,
  },
}]

const mapBox = {
  gpsMapConfig,
  gpsDirectionsConfig,
  gpsUserLocationMarker,
  mapBoxGlSrc,
  mapBoxDirectionsSrc,
}

export default mapBox
