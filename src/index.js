import React from 'react';
import ReactDOM from 'react-dom/client';
import {Space, Layout, Col, Row} from 'antd';

const {Content} = Layout

class App extends React.Component {
  render() {
    function rawCompontent() {
      let arr = [];
      for(let i = 0; i <= 3; i++) {
        arr.push(<Row key={Math.random()}>
          <Col span='12'></Col>
          <Col span='12'></Col>
        </Row>)
      }
      return arr
    }
    return (
      <Space>
        <Layout>
          <Content>
            {rawCompontent()}
          </Content>
        </Layout>
      </Space>
    )
  }
}


let root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(<App/>);
