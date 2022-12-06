import React from 'react'
import { Pagination as Pag } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrentPage } from '../../redux/actions/apiActions'

const Pagination = ({ total, current, setPage }) => {
  return (
    <div className="Pagination_wrapper">
      <Pag
        current={current}
        total={total}
        pageSize={20}
        onChange={(page) => {
          setPage(page)
        }}
        showSizeChanger={false}
        hideOnSinglePage
      />
    </div>
  )
}

Pagination.defautProps = { total: 0, setPage: () => {}, current: 1 }

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  current: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  return { current: state.data.currentPage }
}

function mapDispatchToProps(dispatch) {
  return { setPage: (page) => dispatch(getCurrentPage(page)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
