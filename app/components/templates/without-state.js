import React, {Component, PropTypes} from 'react'
import Radium from 'radium'
import styles from './styles'

type PROP_TYPES = {}

const RENAME_COMPONENT = (props:PROP_TYPES) => {
  return (
    <div
      onClick={clickHandler}
      style={styles.container}
    >
      {getTestCopy()}
    </div>
  )
}

const clickHandler = () => {
  console.log("### Testing click handler")
}

const getTestCopy = () => {
  return (
    <div>
      <p>Created new component</p>
    </div>
  )
}

export default Radium(RENAME_COMPONENT)
