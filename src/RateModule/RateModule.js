import { Rate } from "antd";
import React from "react";

export default class RateModule extends React.Component {
  state = {
    value: 0,
  };
  componentDidMount() {
    const { id } = this.props;
    if (localStorage.getItem(id)) {
      this.setState({
        value: Number(localStorage.getItem(id)),
      });
    }
  }
  componentDidUpdate() {
    const { id } = this.props;
    localStorage.setItem(id, this.state.value);
  }
  changeValue = (value) => {
    this.setState({
      value: value,
    });
  };
  render() {
    const { value } = this.state;
    return (
      <Rate
        allowHalf
        onChange={(e) => this.changeValue(e)}
        value={value}
        className="rateModule"
        allowClear
        count="10"
      />
    );
  } 
}
