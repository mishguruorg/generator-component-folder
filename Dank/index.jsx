import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import actionCreators from 'actions'
import styles from './styles.scss'

const Dank = props => {
  return (
    <div styles={styles.main}>
      <h1>Dank</h1>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dank)
