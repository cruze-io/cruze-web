import React, {Component, PropTypes} from 'react'
import Radium from 'radium'
import styles from './styles'

const PROP_TYPES = {
}

class RENAME_COMPONENT extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    return (
      <div style={styles.container}>
      </div>
    )
  }
}

RENAME_COMPONENT.propTypes = PROP_TYPES

export default Radium(RENAME_COMPONENT)
