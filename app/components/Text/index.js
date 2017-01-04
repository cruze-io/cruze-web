/**
 * Text Component
 * Renders text with styles
 */

import React, { Component, PropTypes } from 'react'
import Helmet from '../../components/HelmetContainer'
import Radium from 'radium'
import Truncate from 'react-truncate'
import textStyles from './styles'
import COLOR from '../../theme/colors'
import FONT from '../../theme/fonts'
import Linkify from 'react-linkify'
import reactStringReplace from 'react-string-replace'

const PROP_TYPES = {
	text: PropTypes.string,
  size: PropTypes.string,
  weight: PropTypes.string,
  styles: PropTypes.object,
  containerStyles: PropTypes.object,
  hoverStyle: PropTypes.object,
  transition: PropTypes.string,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  lines: PropTypes.number,
  ellipsis: PropTypes.element,
}

class Text extends Component {
  constructor(props) {
    super(props);
    this._clickHandler = this._clickHandler.bind(this);
  }
  _generateStyle() {
    const {color, size, weight, styles} = this.props
    return {
      color: COLOR[color] ? COLOR[color].hex : COLOR.white.hex,
      fontSize: FONT.size[size] ? FONT.size[size] : size,
      fontWeight: FONT.weight[weight] ? FONT.weight[weight] : FONT.weight.regular,
      ...FONT.defaultStyles,
      ...styles,
    }
  }

  _generateHoverStyle() {
    const {hoverStyle} = this.props;
    return {
      ':hover': {
        ...hoverStyle,
      }
    }
  }

  _setTransition() {
    const {transition} = this.props;
    return {
      transition: transition || '0s',
    }
  }

  _clickHandler(e) {
    const {onClick} = this.props
    if (onClick) {
      onClick(e);
    }
  }

  render() {
    const {text, onClick, onDoubleClick, onMouseEnter, onMouseLeave, lines, ellipsis, containerStyles} = this.props;
    const style = this._generateStyle()
    const hoverStyle = this._generateHoverStyle()
    const transitions = this._setTransition()

    return (
      <div
        style={{position: 'relative', ...containerStyles}}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
        <p style={[style, hoverStyle, transitions]}>
          <Truncate
            lines={lines || false}
            ellipsis={ellipsis || '...'}>
            <Linkify
              properties={{target: '_blank', style: {...textStyles.linkify}}}>
              {text}
            </Linkify>
          </Truncate>
        </p>
      </div>
    );
  }
}

export default Radium(Text)
