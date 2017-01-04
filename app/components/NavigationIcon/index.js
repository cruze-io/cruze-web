import React, {Component, PropTypes} from 'react'
import Radium from 'radium'
import Icon from '../Icon'
import Pulse from '../Pulse'
import Rings from '../Rings'
import styles from './styles'

const PROP_TYPES = {
}

class NavigationIcon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      windowWidth: window.innerWidth - 200
    }
  }

  componentDidMount() {
    this.updateDimensions = this.updateDimensions.bind(this)
    window.addEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      windowWidth: (window.innerWidth - 100 > 0) ? window.innerWidth - 100 : window.innerWidth,
    })
  }

  render() {
    const {windowWidth} = this.state
    const containerStyles = {
      width: windowWidth,
      height: windowWidth,
    }
    const iconPositionStyle = {
      top: Radium.getState(this.state, 'iconContainer', ':hover') ? 100 : 0,
    }
    const directionIconPositionStyle = {
      top: Radium.getState(this.state, 'iconContainer', ':hover') ? 10 : '-100px',
    }
    return (
      <div style={{...styles.container, ...containerStyles}}>
        {/*<Pulse
          cx={370}
          cy={370}
          width={800}
          height={800}
          radius={200}
          stiffness={60}
          damping={40}
        />*/}
        <div style={styles.ringsContainer}>
          <Rings
            width={windowWidth}
          />
        </div>
        <div
          key={'iconContainer'}
          style={styles.iconContainer}>
          <div style={styles.iconBackground}>
            <div style={{...styles.icon, ...iconPositionStyle}}>
              <Icon
                type={'mouse'}
                size={'xLarge'}
                color={'white'}
              />
            </div>
            <div style={{...styles.icon, ...directionIconPositionStyle}}>
              <Icon
                type={'downArrow'}
                size={'large'}
                color={'white'}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

NavigationIcon.propTypes = PROP_TYPES

export default Radium(NavigationIcon)
