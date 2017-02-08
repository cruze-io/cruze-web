const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    position: 'absolute',
  },
  destinationInformationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
    transition: '1s',
  },
  mapOverlayGradient: {
    position: 'absolute',
    top: -30,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to top, rgba(53,107,221,1) 0%,rgba(53,107,221,0) 100%)',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 100,
    textAlign: 'center',
    zIndex: 1,
  },
  heading: {
    letterSpacing: '0.2em',
    marginBottom: 5,
  },
  destinationName: {

  }
}

export default styles
