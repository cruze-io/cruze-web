import {SECONDARY_HEX, PRIMARY_HEX} from '../../theme/colors'

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: PRIMARY_HEX,
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 'calc(100% - 120px)',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 150,
    backgroundColor: PRIMARY_HEX,
    zIndex: 30,
  }
}

export default styles
