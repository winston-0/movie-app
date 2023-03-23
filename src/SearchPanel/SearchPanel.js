import { Input } from "antd";
import React from "react";

export default class SearchPanel extends React.Component {
  state = {
    value: "",
  };
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { getSearchInput } = this.props;
    return (
      <Input
        size="large"
        onChange={(e) => {
          this.onChange(e);
          getSearchInput(e);
        }}
        value={this.state.value}
        placeholder="Type to search..."
      />
    );
  }
}
