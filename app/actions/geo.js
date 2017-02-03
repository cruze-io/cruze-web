import {navigate} from '../services/navigation'
export const GETTING_LOCATION = 'GETTING_LOCATION'
export const LOCATION_UPDATED = 'LOCATION_UPDATED'
export const GEO_ERROR = 'GEO_ERROR'
export const SET_TRIP = 'SET_TRIP'
export const START_TRIP = 'START_TRIP'

export const getLocation = () => {
  return (dispatch) => {
    dispatch({
      type: GETTING_LOCATION,
    })
    let fetchingLocation = false
    const err = (msg) => {
      console.log("### ERROR")
      console.log(msg)
    }
    const success = (position) => {
      console.log(position)
      fetchingLocation = false
      dispatch({
        type: LOCATION_UPDATED,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    }
    const getCurrentPositionOptions = {
      timeout: 5000,
      enableHighAccuracy: true,
    }
    if (navigator.geolocation) {
      setInterval(() => {
        if (!fetchingLocation) {
         fetchingLocation = true
         navigator.geolocation.getCurrentPosition(success, err, getCurrentPositionOptions)
        }
      }, 500)
    } else {
      dispatch({
        type: GEO_ERROR,
        message: 'No Geo Location Permissions',
      })
    }
  }
}

export const setTrip = (distance, duration, tripSteps) => {
  const heading = tripSteps[0].heading
  return (dispatch, getState) => {
    dispatch({
      type: SET_TRIP,
      distance,
      duration,
      tripSteps,
      heading,
    })
  }
}

export const startTrip = () => {
  return (dispatch, getState) => {
    dispatch({
      type: START_TRIP,
    })
  }
}
