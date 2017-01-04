import request from 'superagent'
import config from '../config'
const skrobblerApiUrl = 'http://' + config.skrobblerApiKey + '.tor.skobbler.net/tor/RSngx/calcroute/json/20_5/en/' + config.skrobblerApiKey

export const navigate = (startLat, startLng, destLat, destLng) => {
  const startParams = '?start=' + 37.4664557 + ',' + -122.209864
  const destParams = '&dest=' + 37.447327 + ',' + -122.227669
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
