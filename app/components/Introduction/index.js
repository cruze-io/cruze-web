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
import NavigationIcon from '../NavigationIcon'
import styles from './styles'

const PROP_TYPES = {
  copy: PropTypes.object,
}

class Introduction extends Component {
  constructor(props) {
    super(props);
  }

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
          <NavigationIcon />
          <ScrollParallax
            animation={{
              translateY: (window.innerHeight),
              ease: 'linear',
              playScale: [0, 5],
              duration: '2s',
            }}
            style={styles.animationContentOneScrollParallax}
          >
            <Text
              text={copy.heading}
              size={'xxLarge'}
              weight={'xBold'}
              color={'black'}
            />
            <Text
              text={copy.summary}
              size={'medium'}
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

Introduction.propTypes = PROP_TYPES

export default Radium(Introduction)
