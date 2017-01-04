import {
  GETTING_LOCATION,
  LOCATION_UPDATED,
  GEO_ERROR,
} from '../actions/geo'

import { List, Map, fromJS } from 'immutable'
import { createReducer } from 'redux-immutablejs'
const woodsideLng = '-122.227648'
const woodsideLat = '37.447353'

const initialState = fromJS({
  gettingLocation: true,
  latitude: 37.447353,
  longitude: -122.227648,
  zoom: 1,
  tilt: 45,
  heading: 90,
  message: null,
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
  }
})
