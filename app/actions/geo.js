import {navigate} from '../services/navigation'
export const GETTING_LOCATION = 'GETTING_LOCATION'
export const LOCATION_UPDATED = 'LOCATION_UPDATED'
export const GEO_ERROR = 'GEO_ERROR'
export const GETTING_ROUTE = 'GETTING_ROUTE'
export const GET_ROUTE_SUCCESS = 'GET_ROUTE_SUCCESS'
export const GET_ROUTE_ERROR = 'GET_ROUTE_ERROR'

export const getLocation = () => {
  return (dispatch) => {
    dispatch({
      type: GETTING_LOCATION,
    })
    const err = (msg) => {
      console.log("### ERROR")
      console.log(msg)
    }
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        console.log(position)
        dispatch({
          type: LOCATION_UPDATED,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      }, err, {
        enableHighAccuracy: true,
        timeout: 5000,
      });
    } else {
      dispatch({
        type: GEO_ERROR,
        message: 'No Geo Location Permissions',
      })
    }
  }
}

export const navigateTo = () => {
  return (dispatch, getState) => {
    const startLatitude = getState().get('geo').get('latitude')
    const startLongitude = getState().get('geo').get('longitude')
    const destLatitude = getState().get('geo').get('destinationLatitude')
    const destLongitude = getState().get('geo').get('destinationLongitude')
    dispatch({
      type: GETTING_ROUTE
    })
    navigate(startLatitude, startLongitude, destLatitude, destLongitude).then((response) => {
      console.log(response)

      let path = []
      let geoJsonPath = []
      if (!response.data.route) {
        dispatch({
          type: GET_ROUTE_ERROR,
          message: 'Unable to calculate route',
        })
      } else {
        response.data.route.advisor.forEach((advice, index) => {
          path.push({
            lat: advice.coordinates.y,
            lng: advice.coordinates.x,
          })
          geoJsonPath.push([advice.coordinates.x, advice.coordinates.y])
        })
        console.log(path)
        console.log(geoJsonPath)
        dispatch({
          type: GET_ROUTE_SUCCESS,
          destinationPath: path,
          navigationGeoJson: geoJsonPath,
        })
      }
      console.log(response)
    })
  }
}
