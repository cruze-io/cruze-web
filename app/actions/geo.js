import {navigate} from '../services/navigation'
import {getDistance} from '../helpers/geo'
export const GETTING_LOCATION = 'GETTING_LOCATION'
export const LOCATION_UPDATED = 'LOCATION_UPDATED'
export const GEO_ERROR = 'GEO_ERROR'
export const SET_TRIP = 'SET_TRIP'
export const START_TRIP = 'START_TRIP'

export const getLocation = () => {
  return (dispatch, getState) => {
    dispatch({
      type: GETTING_LOCATION,
    })
    const err = (msg) => {
      console.log("### ERROR")
      console.log(msg)
    }
    const success = (position) => {
      let newPosition = {
        type: LOCATION_UPDATED,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
      if (position.coords.speed) {
        newPosition.speed = position.coords.speed
      }
      dispatch(newPosition)
    }
    const watchPositionOptions = {
      enableHighAccuracy: true,
      timeout: 3000,
    }
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(success, err, watchPositionOptions)
    } else {
      dispatch({
        type: GEO_ERROR,
        message: 'No Geo Location Permissions',
      })
    }
  }
}

export const getHeading = () => {
  return (dispatch) => {
    const handleOrientation = (event) => {
      var absolute = event.absolute;
      var alpha    = event.alpha;
      var beta     = event.beta;
      var gamma    = event.gamma;
      console.log(absolute, alpha, beta, gamma)
      if (alpha) {
        dispatch({
          type: LOCATION_UPDATED,
          heading: e.alpha,
        })
      }
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
      heading: tripSteps[0].heading,
      destinationLoaded: true,
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
