export const deg2rad = (deg) => {
  return deg * (Math.PI/180)
}

export const getHeading = (lat1, lng1, lat2, lng2) => {
  const p1 = {x: lng1, y: lat1}
  const p2 = {x: lng2, y: lat2}
  console.log(p1, p2)
  console.log(Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI)
  return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI
}

export const getDistance = (lat1,lng1,lat2,lng2) => {
  const R = 6371
  const dLat = deg2rad(lat2-lat1)
  const dLon = deg2rad(lng2-lng1)
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  const d = R * c
  return d
}

