import React, { useState } from 'react'
import { Pagination as Pag } from 'antd'
import PropTypes from 'prop-types'
import classes from './Pagination.module.scss'

const Pagination = ({ total }) => {
  const [current, setCurrent] = useState(1)
  return (
    <div className={classes.wrapper}>
      <Pag
        current={current}
        total={total}
        pageSize={5}
        onChange={(page) => setCurrent(page)}
        showSizeChanger={false}
        hideOnSinglePage
        className={classes.pagination}
      />
    </div>
  )
}

export default Pagination

Pagination.defautProps = { total: 0 }

Pagination.propTypes = { total: PropTypes.number.isRequired }
