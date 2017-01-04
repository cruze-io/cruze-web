import React, {Component, PropTypes} from 'react'
import Radium from 'radium'
import styles from './styles'

const PROP_TYPES = {
  width: PropTypes.number,
}

class Rings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentRing: 1,
    }
  }

  componentDidMount() {
    this.generateRingsDimension = this.generateRingsDimension.bind(this)
  }

  generateRingsDimension() {
    const {width} = this.props
    const ringsLength = 7
    const ringsDimensions = []
    const initialWidthHeight = 50
    const initialSpaceBetween = 50
    const initialOpacity = 0.4
    const multiplyer = width / 8
    for (let i = 0; i < ringsLength; i++) {
      const spaceBetween = initialSpaceBetween + (multiplyer * i)
      let dimension = initialWidthHeight + (i * multiplyer)
      let opacity = initialOpacity - (i * 0.05)
      if (dimension > width - 200) {
        dimension = width - 200
        opacity = 0
      }
      ringsDimensions.push({
        width: dimension,
        height: dimension,
        opacity: opacity,
      })
    }
    return ringsDimensions
  }

  renderRings(rings) {
    return rings.map((ring, index) => {
      const pulseKeyFrame = Radium.keyframes({
        '0%': {opacity: ring.opacity},
        '50%': {opacity: ring.opacity / 4},
        '100%': {opacity: ring.opacity},
      }, 'pulse')
      const style = {
        width: ring.width,
        height: ring.height,
        animation: 'x 5s infinite',
        animationName: pulseKeyFrame,

      }
      return (
        <div
          key={'ring_' + index}
          style={{...styles.ring, ...style}}>
        </div>
      )
    })
  }

  continuousPulsation(ring) {

  }

  render() {
    const self = this
    const rings = this.generateRingsDimension()
    return (
      <div style={styles.container}>
        {self.renderRings(rings)}
      </div>
    )
  }
}

Rings.propTypes = PROP_TYPES

export default Radium(Rings)
