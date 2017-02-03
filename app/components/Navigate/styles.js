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
  mapOverlayGradient: {
    position: 'absolute',
    top: -30,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to top, rgba(53,107,221,1) 0%,rgba(53,107,221,0) 100%)',
    zIndex: 10,
    transition: '1s',

  }
}

export default styles
