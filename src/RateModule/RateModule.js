import { Rate } from 'antd'
import React from 'react'

import movieApi from '../movieApi/movieApi'
export default class RateModule extends React.Component {
  state = {
    value: 0,
  }
  movieApiService = new movieApi()
  componentDidMount() {
    const { id } = this.props
    if (localStorage.getItem(id)) {
      this.setState({
        value: Number(localStorage.getItem(id)),
      })
    }
  }
  componentDidUpdate() {
    const { id } = this.props
    localStorage.setItem(id, this.state.value)
  }
  changeValue = (value, id) => {
    const { onUpdateData } = this.props
    this.setState({
      value: value,
    })
    if (value !== 0) {
      this.movieApiService.addRatedMovie(id, value)
    } else {
      this.movieApiService.deleteRatedMovie(id)
      setTimeout(onUpdateData, 1000)
    }
  }

  render() {
    const { value } = this.state
    const { id } = this.props
    return (
      <Rate
        allowHalf
        onChange={(e) => this.changeValue(e, id)}
        value={value}
        className="rateModule"
        allowClear
        count="10"
      />
    )
  }
}
