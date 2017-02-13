import {
  GETTING_LOCATION,
  LOCATION_UPDATED,
  GEO_ERROR,
  SET_TRIP,
  START_TRIP,
} from '../actions/geo'

import { List, Map, fromJS } from 'immutable'
import { createReducer } from 'redux-immutablejs'
const woodsideLng = '-122.227648'
const woodsideLat = '37.447353'

const initialState = fromJS({
  gettingLocation: true,
  latitude: null,
  longitude: null,
  zoom: 17,
  pitch: 50,
  speed: 0,
  heading: 90,
  duration: null,
  distance: null,
  message: null,
  destinationLoaded: false,
  navigationPoints: List(),
  // destinationLatitude: 37.466378,
  // destinationLongitude: -122.209813,
  destinationLatitude: 37.3615608,
  destinationLongitude: -122.2474608,
  destinationPath: null,
  navigationGeoJson: null,
  currentNavigationStep: 0,
  navigationSteps: List(),
  tripStarted: false,
  tripSteps: List([]),
  distanceToNextDirection: null,
})

export default createReducer(initialState, {
  [GETTING_LOCATION]: (state, action) => {
    return state.merge({
      gettingLocation: true,
    })
  },
  [LOCATION_UPDATED]: (state, action) => {
    console.log("HERERE")
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
  [SET_TRIP]: (state, action) => {
    return state.merge({
      ...action,
    })
  },
  [START_TRIP]: (state, action) => {
    return state.merge({
      tripStarted: true,
    })
  }
})
