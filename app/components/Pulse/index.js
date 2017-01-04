import React, {Component, PropTypes} from 'react'
import Radium from 'radium'
import styles from './styles'
import {Motion, spring} from 'react-motion'

const PROP_TYPES = {
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.number,
  cx: PropTypes.number,
  cy: PropTypes.number,
  stiffness: PropTypes.number,
}

class Pulse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isResting: false,
    }
    this.handleRest = this.handleRest.bind(this)
  }

  handleRest() {
    this.setState({
      isResting: true,
    }, () => {
      requestAnimationFrame(() => {
        this.setState({
          isResting: false,
        })
      })
    })
  }

  render() {
    const {width, height, cx, cy, radius, stiffness, damping} = this.props
    const {isResting} = this.state

    return (
      <svg width={width} height={height} style={styles.pulseContainer}>
        <g>
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill={'rgba(0,0,0,0)'}
          />
          <Motion
            defaultStyle={{ s: 0 }}
            style={{
              s: this.state.isResting ? 0 : spring(1, {stiffness: stiffness, damping: damping})
            }}
            ease={'linear'}
            onRest={this.handleRest}
          >
            {({ s }) =>
                <circle
                  className="pulse"
                  cx={cx}
                  cy={cy}
                  r={radius + radius * s}
                  fill={"rgba(237, 93, 243, 0.2)"}
                  style={{
                    opacity: 0.75 - s * 0.75,
                  }}
                />
            }
          </Motion>
        </g>
      </svg>
    )
  }
}

Pulse.propTypes = PROP_TYPES

export default Radium(Pulse)
