import {navigate} from '../services/navigation'
export const GETTING_LOCATION = 'GETTING_LOCATION'
export const LOCATION_UPDATED = 'LOCATION_UPDATED'
export const GEO_ERROR = 'GEO_ERROR'
export const GETTING_ROUTE = 'GETTING_ROUTE'

export const getLocation = () => {
  return (dispatch) => {
    dispatch({
      type: GETTING_LOCATION,
    })
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        dispatch({
          type: LOCATION_UPDATED,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      });
    } else {
      dispatch({
        type: GEO_ERROR,
        message: 'No Geo Location Permissions',
      })
    }
  }
}

export const navigateTo = (startLatitude, startLongitude, destLatitude, destLongitude) => {
  return (dispatch) => {
    dispatch({
      type: GETTING_ROUTE
    })
    navigate(startLatitude, startLongitude, destLatitude, destLongitude).then((response) => {
      console.log(response)
    })
  }
}
