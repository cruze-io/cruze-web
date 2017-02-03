const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  content: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: 'calc(2 * 100%)',
    transition: '0.8s ease',
  },
  summaryContainer: {
    position: 'relative',
    width: '100%',
    height: '49%',
    transition: '0.3s ease',
  },
  statusContainer: {
    position: 'relative',
    width: '100%',
    height: '49%',
    transition: '0.6s ease',
  },
  infoContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: 300,
    marginRight: 'auto',
    marginLeft: 'auto',
    height: 50,
    textAlign: 'center',
    marginTop: 10,
  },
  info: {
    display: 'inline-block',
    width: '48%',
    height: '100%',
  },
  infoHeading: {
    letterSpacing: '0.15em',
    marginBottom: 5,
  },
  infoNumber: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: 23,
    fontWeight: '600',
    marginRight: 5,
    color: '#FFFFFF',
  },
  infoUnit: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: 10,
    fontWeight: '100',
    color: '#FFFFFF',
  },
  startNavigationContainer: {
    textAlign: 'center',
    paddingTop: 28,
  },
  stepContainer: {
    height: 90,
  },
}

export default styles