import React, { Component, PropTypes } from 'react'
import Radium from 'radium'
import LazyLoad from 'react-lazy-load'
import styles from './styles'

const PROP_TYPES = {
	width: PropTypes.number,
	height: PropTypes.number,
  offsetVertical: PropTypes.number,
  offsetHorizontal: PropTypes.number,
  throttle: PropTypes.number,
  src: PropTypes.string,
  duration: PropTypes.number,
  blur: PropTypes.string,
  radius: PropTypes.string,
  displayOffsetTime: PropTypes.number,
  customStyles: PropTypes.object,
}

class Image extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageLoadSuccess: false,
    }
    this.mounted = false
    this._imageLoaded = this._imageLoaded.bind(this)
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  _generateImageDimensions(w, h) {
    return {
      width: w ? w : '100%',
      height: h ? h : '100%',
    }
  }

  _imageLoaded() {
    const {displayOffsetTime} = this.props
    const timeoutTime = displayOffsetTime || 400
    setTimeout(() => {
      if (this.mounted) {
        this.setState({
          imageLoadSuccess: true,
        })
      }
    }, timeoutTime)
  }

  _generateCustomStyles(blur, radius, customStyles) {
    return {
      filter: blur ? 'blur(' + blur + ')' : 'none',
      borderRadius: radius ? radius : 0,
      ...customStyles,
    }
  }

  render() {
    const {width, height, offsetVertical, offsetHorizontal, throttle, src, duration, blur, radius, customStyles} = this.props
    const {imageLoading, imageLoadSuccess, imageLoadFail, mounted} = this.state
    const imageDimensions = this._generateImageDimensions(width, height)
    const imageUrl = src ? src : 'https://dff2h0hbfv6w4.cloudfront.net/images/stanza/global/stanza-placeholer.png'
    const opacityStyle = {opacity: imageLoadSuccess ? 1 : 0}
    const transitionStyle = {transition: duration ? duration : '0.5s'}
    const backgroundImageStyle = {backgroundImage: 'url(' + imageUrl + ')'}
    const generatedStyles = this._generateCustomStyles(blur, radius, customStyles)

    return (
      <div style={[styles.container, imageDimensions, opacityStyle, transitionStyle]}>
        <LazyLoad
          height={height || '100%'}
          onContentVisible={this._imageLoaded}
        >
          <div style={[styles.image, backgroundImageStyle, generatedStyles]} />
        </LazyLoad>
      </div>
    );
  }
}

export default Radium(Image)
