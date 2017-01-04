import React, { Component, PropTypes } from 'react'
import Radium, {StyleRoot} from 'radium'
import Text from '../Text'
import COLOR from '../../theme/colors'
import FONT from '../../theme/fonts'
import {SIZE} from '../../theme/buttons'
import buttonStyles from './styles'

type PROP_TYPES = {
  size: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  fontColor: PropTypes.string,
  fontWeight: PropTypes.string,
  fontSize: PropTypes.string,
  styles: PropTypes.object,
  radius: PropTypes.string,
  onClick: PropTypes.func,
}

const Button = (props:PROP_TYPES) => {
  const {size, text, color, fontColor, fontSize, fontWeight, styles, radius, onClick} = props
  const buttonContainerStyles = generateButtonStyles(size, color, radius, styles)
  const buttonTextStyles = generateButtonTextStyles(fontColor, fontSize, fontWeight)
  return (
    <StyleRoot>
      <button style={{...buttonStyles.container, ...buttonContainerStyles}} onClick={onClick}>
        <p
          style={{...buttonTextStyles}}>
          {text || 'NO TEXT'}
        </p>
      </button>
    </StyleRoot>
  )
}

const generateButtonStyles = (size, color, radius, styles) => {
  const buttonSize = SIZE[size] || SIZE.regular
  return {
    backgroundColor: COLOR[color] ? COLOR[color].hex : COLOR.primary.hex,
    borderRadius: radius || 2,
    ...buttonSize,
    ...styles,
  }
}

const generateButtonTextStyles = (color, size, weight) => {
  return {
    fontFamily: "'Open Sans', sans-serif",
    marginBottom: 0,
    marginTop: 0,
    color: COLOR[color] ? COLOR[color].hex : COLOR.white.hex,
    fontWeight: FONT.weight[weight] || FONT.weight.regular,
    fontSize: FONT.size[size] || FONT.size.regular,
  }
}

export default Button
