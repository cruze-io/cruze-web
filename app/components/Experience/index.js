import React, {Component, PropTypes} from 'react'
import Radium from 'radium'
import ScrollAnim from 'rc-scroll-anim'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import Animate from 'rc-animate'
const ScrollOverPack = ScrollAnim.OverPack
const ScrollParallax = ScrollAnim.Parallax
const EventListener = ScrollAnim.Event
import Text from '../Text'
import styles from './styles'

const PROP_TYPES = {
  copy: PropTypes.object,
}

class Experience extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    const {copy} = this.props
    return (
      <div
        style={styles.container}
      >
        <div
          key="1"
          style={styles.animationContainer}
        >
          <ScrollParallax
            animation={{
              translateY: (window.innerHeight + 300),
              ease: 'linear',
              playScale: [0, 5],
              duration: '2s',
            }}
            style={styles.animationContentOneScrollParallax}
          >
            <Text
              text={copy.heading}
              size={'xLarge'}
              weight={'xBold'}
              color={'black'}
            />
            <Text
              text={copy.summary}
              size={'regular'}
              weight={'light'}
              color={'black'}
              styles={styles.summary}
            />
            <div style={styles.seperator} />
            <Text
              text={copy.description}
              size={'medium'}
              weight={'regular'}
              color={'black'}
              styles={styles.description}
            />
          </ScrollParallax>
        </div>
      </div>
    )
  }
}

Experience.propTypes = PROP_TYPES

export default Radium(Experience)
