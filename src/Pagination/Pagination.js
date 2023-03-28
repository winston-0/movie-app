import { Pagination } from 'antd'
import React, { PureComponent } from 'react'

export default class PaginationBlock extends PureComponent {
  render() {
    console.log('rendered')
    const { changePageNumber, total } = this.props
    return (
      <Pagination
        onChange={(page) => changePageNumber(page)}
        className="pagination"
        defaultCurrent={1}
        showSizeChanger={false}
        total={total + '0'}
      />
    )
  }
}
