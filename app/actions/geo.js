import {navigate} from '../services/navigation'
import {getDistance, getHeading} from '../helpers/geo'
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
      const {latitude, longitude, speed} = position.coords
      let newPosition = {
        type: LOCATION_UPDATED,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
      let prevLatitude = getState().get('geo').get('latitude')
      let prevLongitude = getState().get('geo').get('longitude')
      if (speed) {
        newPosition.speed = speed
      }
      if (prevLatitude && prevLongitude) {
        newPosition.heading = getHeading(latitude, longitude, prevLatitude, prevLongitude)
      }
      dispatch(newPosition)
    }
    const watchPositionOptions = {
      enableHighAccuracy: true,
      timeout: 3000,
    }
    if (navigator.geolocation && !(window.location.search.indexOf('example') > -1)) {
      navigator.geolocation.watchPosition(success, err, watchPositionOptions)
    } else if (window.location.search.indexOf('example') > -1) {
      dispatch({
        latitude: '37.4664161',
        longitude: '-122.2098085',
        type: 'LOCATION_UPDATED',
      })
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
