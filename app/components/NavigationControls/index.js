import React, {Component, PropTypes} from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import navigationIcons from '../../constants/navigationIcons'
import Slider from 'react-slick'
import Text from '../Text'
import Image from '../Image'
import Button from '../Button'
import styles from './styles'

const PROP_TYPES = {
  distance: PropTypes.number,
  duration: PropTypes.number,
  speed: PropTypes.number,
  tripSteps: ImmutablePropTypes.list,
  tripStarted: PropTypes.bool,
  startTrip: PropTypes.func,
  destinationLoaded: PropTypes.bool,
}

class NavigationControls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contentTop: 0,
      summaryOpacity: 1,
      statusOpacity: 0,
    }
    this.renderTripSummary = this.renderTripSummary.bind(this)
    this.renderTripStatus = this.renderTripStatus.bind(this)
    this.tripStarted = this.tripStarted.bind(this)
    this.renderSteps = this.renderSteps.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.tripStarted) {
      this.tripStarted()
    }
  }
  tripStarted() {
    this.setState({
      contentTop: '-100%',
      summaryOpacity: 0,
      statusOpacity: 1,
      slidesToShow: 1,
    })
  }
  renderTripSummary() {
    const {distance, duration, startTrip, destinationLoaded} = this.props
    const {summaryOpacity} = this.state
    return (
      <div style={{...styles.summaryContainer, ...{opacity: summaryOpacity}}}>
        <div style={styles.infoContainer}>
          <div style={styles.info}>
            <Text
              text={'DISTANCE'}
              size={'xSmall'}
              weight={'regular'}
              styles={styles.infoHeading}
            />
            <p>
              <span style={styles.infoNumber}>
                {Math.round(((distance / 1000) * 100) / 100)}
              </span>
              <span style={styles.infoUnit}>
                MILES
              </span>
            </p>
          </div>
          <div style={styles.info}>
            <Text
              text={'DURATION'}
              size={'xSmall'}
              weight={'regular'}
              styles={styles.infoHeading}
            />
            <p>
              <span style={styles.infoNumber}>
                {Math.ceil(((duration / 60) * 100) / 100)}
              </span>
              <span style={styles.infoUnit}>
                MINUTES
              </span>
            </p>
          </div>
        </div>
        <div style={styles.startNavigationContainer}>
          <Button
            text={'START NAVIGATION'}
            size={'large'}
            color={'white'}
            fontColor={'primary'}
            fontSize={'xSmall'}
            fontWeight={'semiBold'}
            onClick={() => {
              if (destinationLoaded) {
                startTrip()
              }
            }}
          />
        </div>
      </div>
    )
  }
  renderTripStatus() {
    const {statusOpacity} = this.state
    const settings = {
      dots: false,
      infinite: true,
    }
    return (
      <div style={{...styles.statusContainer, ...{opacity: statusOpacity}}}>
        <div style={styles.stepsSlider}>
          <Slider {...settings}>
            {this.renderSteps()}
          </Slider>
        </div>
        <div style={styles.tripLineContainer}>

        </div>
      </div>
    )
  }
  renderSteps() {
    const {tripSteps} = this.props
    return tripSteps.map((step, index) => {
      console.log(step.toJS())
      console.log(step.get('maneuver').get('type'))
      console.log(navigationIcons)
      return (
        <div key={index} style={styles.stepContainer}>
          <div style={styles.iconContainer}>
            <div style={styles.icon}>
              <img
                src={navigationIcons.getIcon(step.get('maneuver').get('type'))}
                style={styles.iconImage}
              />
            </div>
          </div>

          <div style={styles.intersectionContainer}>
            <Text
              text={step.get('maneuver').get('type')}
              size={'small'}
              weight={'light'}
              styles={styles.maneuverType}
            />
            <Text
              text={step.get('way_name')}
              size={step.get('way_name').length > 20 ? 16 : 20}
              weight={'light'}
            />
          </div>

          <div style={styles.tripOverviewContaienr}>

          </div>
        </div>
      )
    })
  }
  render() {
    const {tripStarted, tripSteps} = this.props
    const {contentTop} = this.state
    return (
      <div style={styles.container}>
        <div style={{...styles.content, ...{top: contentTop}}}>
          {this.renderTripSummary()}
          {tripSteps.size ? this.renderTripStatus() : null}
        </div>
      </div>
    )
  }
}

export default NavigationControls
