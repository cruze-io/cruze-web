import {marginAutoAll, absoluteCenter, fillContainer} from '../../constants/styles'

const styles = {
  container: {
    position: 'absolute',
    top: '80%',
    bottom: 0,
    right: 0,
    left: 0,
    ...marginAutoAll,
  },
  iconContainer: {
    ...absoluteCenter,
    width: 70,
    height: 70,
    borderWidth: 5,
    backgroundColor: 'rgba(250,250,250,0.2)',
    borderRadius: '100%',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    cursor: 'pointer',
    transition: '0.4s',
    ':hover': {
      boxShadow: '0 0 20px rgba(0,0,0,0.3)',
    }
  },
  iconBackground: {
    ...absoluteCenter,
    width: 60,
    height: 60,
    borderRadius: '100%',
    backgroundImage: 'linear-gradient(135deg, rgba(248,150,251,1) 0%,rgba(171,92,243,1) 100%)',
    overflow: 'hidden',
  },
  icon: {
    ...absoluteCenter,
    width: 60,
    height: 32,
    textAlign: 'center',
    transition: '0.4s ease',
  }
}

export default styles
