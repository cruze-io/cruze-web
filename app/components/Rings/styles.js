import {absoluteCenter, fillContainer} from '../../constants/styles'
const styles = {
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: '0.8',
  },
  ringsContainer: {
    ...fillContainer,
  },
  ring: {
    ...absoluteCenter,
    background: 'rgb(196,111,245)',
    borderRadius: '100%',
  },
}

export default styles
