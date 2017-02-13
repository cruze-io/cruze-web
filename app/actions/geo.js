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
      const tripSteps = getState().get('geo').get('tripSteps')
      const currentNavigationStep = getState().get('geo').get('currentNavigationStep')
      const currentStepLat = tripSteps && tripSteps.size ? tripSteps.get(currentNavigationStep).get('maneuver').get('location').get('coordinates').get(0) : null
      const currentStepLng = tripSteps && tripSteps.size ? tripSteps.get(currentNavigationStep).get('maneuver').get('location').get('coordinates').get(1) : null
      const nextStepLat = tripSteps && tripSteps.size ? tripSteps.get(currentNavigationStep + 1) ? tripSteps.get(currentNavigationStep + 1).get('maneuver').get('location').get('coordinates').get(0) : null : null
      const nextStepLng = tripSteps && tripSteps.size ? tripSteps.get(currentNavigationStep + 1) ? tripSteps.get(currentNavigationStep + 1).get('maneuver').get('location').get('coordinates').get(1) : null : null
      let newPosition = {
        type: LOCATION_UPDATED,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
      if (position.coords.speed) {
        newPosition.speed = position.coords.speed
      }
      if (currentStepLat, currentStepLng, nextStepLat, nextStepLng) {
        newPosition.distanceToNextDirection = getDistance(currentStepLat, currentStepLng, nextStepLat, nextStepLng)
      }
      console.log(newPosition)
      dispatch(newPosition)
    }
    const watchPositionOptions = {
      enableHighAccuracy: false,
      timeout: 20000,
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
