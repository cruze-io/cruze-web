import {
  GETTING_LOCATION,
  LOCATION_UPDATED,
  GEO_ERROR,
  GETTING_ROUTE,
  GET_ROUTE_SUCCESS,
  GET_ROUTE_ERROR,
} from '../actions/geo'

import { List, Map, fromJS } from 'immutable'
import { createReducer } from 'redux-immutablejs'
const woodsideLng = '-122.227648'
const woodsideLat = '37.447353'

const initialState = fromJS({
  gettingLocation: true,
  latitude: null,
  longitude: null,
  zoom: 30,
  tilt: 45,
  heading: 90,
  message: null,
  navigationPoints: List(),
  destinationLatitude: 37.3615608,
  destinationLongitude: -122.2474608,
  destinationPath: null,
  navigationGeoJson: null,
})

export default createReducer(initialState, {
  [GETTING_LOCATION]: (state, action) => {
    return state.merge({
      gettingLocation: true,
    })
  },
  [LOCATION_UPDATED]: (state, action) => {
    return state.merge({
      gettingLocation: false,
      latitude: action.latitude,
      longitude: action.longitude,
    })
  },
  [GEO_ERROR]: (state, action) => {
    return state.merge({
      gettingLocation: false,
      message: action.message,
    })
  },
  [GETTING_ROUTE]: (state, action) => {
    return state.merge({
      gettingRoute: true,
    })
  },
  [GET_ROUTE_SUCCESS]: (state, action) => {
    return state.merge({
      gettingRoute: false,
      destinationPath: action.destinationPath,
      navigationGeoJson: action.navigationGeoJson,
    })
  },
})
