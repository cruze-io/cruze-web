import request from 'superagent'
import config from '../config'
const googleMapApiUrl = 'https://maps.googleapis.com/maps/api/directions/json'
const skrobblerApiUrl = 'http://' + config.skrobblerApiKey + '.tor.skobbler.net/tor/RSngx/calcroute/json/20_5/en/' + config.skrobblerApiKey

export const navigate = (startLat, startLng, destLat, destLng) => {
  const startParams = '?start=' + startLat + ',' + startLng
  const destParams = '&dest=' + destLat + ',' + destLng
  const profileParams = '&profile=carFastest'
  const adviceParams = '&advice=yes'
  const url = skrobblerApiUrl + startParams + destParams + profileParams + adviceParams
  const navigateTo = new Promise((resolve, reject) => {
    request
      .get(url)
      .set('Accept', 'application/json')
      .end(function(err, res){
        resolve({error: err, data: res.body || null})
      })
  })
  return navigateTo
}


export const navigateGoogle = (startLat, startLng, destLat, destLng) => {
  const startParams = '?origin=' + startLat + ',' + startLng
  const destParams = '&destination=' + destLat + ',' + destLng
  const apiKeyParams = '&key=' + config.googleMapsApiKey
  const url = googleMapApiUrl + startParams + destParams + apiKeyParams
  const navigateTo = new Promise((resolve, reject) => {
    request
      .get(url)
      .set('Accept', 'application/json')
      .end(function(err, res){
        console.log(res)
        resolve({error: err, data: res.body || null})
      })
  })
  return navigateTo
}
