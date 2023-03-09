import React from 'react';
import ReactDOM from 'react-dom/client';
import {Space, Layout, Col, Row, Card} from 'antd';
import pic from './testPic.png'
import { Content } from 'antd/es/layout/layout';



async function getData() {
let newRequest = await fetch('https://api.themoviedb.org/3/search/movie?api_key=50144123a6271043596e1c7cd112f310&query=return')
let response =  await newRequest.json();
    for(let i = 1; i <= 4; i++) {
        console.log(response.results[i])
    }
}

getData();


class App extends React.Component {
    render() {
        return (
            <Layout>
                <Content className='mainblock'>
                    <Row gutter={[36,36]}>
                        <Col span={12}>
                            <Card size='medium' className='card' cover={<img src={pic} style={{width: 183}}></img>}>
                                <div className='content'>
                                    <p>Hello world</p>
                                    <p>Bye World</p>
                                    <p>Some other shit</p>
                                </div>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card size='medium' className='card' cover={<img src={pic} style={{width: 183}}></img>}>
                                <div className='content'>
                                    <p>Hello world</p>
                                    <p>Bye World</p>
                                    <p>Some other shit</p>
                                </div>
                            </Card>
                        </Col>

                        <Col span={12}>
                            <Card size='medium' className='card' cover={<img src={pic} style={{width: 183}}></img>}>
                                <div className='content'>
                                    <p>Hello world</p>
                                    <p>Bye World</p>
                                    <p>Some other shit</p>
                                </div>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card size='medium' className='card' cover={<img src={pic} style={{width: 183}}></img>}>
                                <div className='content'>
                                    <p>Hello world</p>
                                    <p>Bye World</p>
                                    <p>Some other shit</p>
                                </div>
                            </Card>
                        </Col>

                        <Col span={12}>
                            <Card size='medium' className='card' cover={<img src={pic} style={{width: 183}}></img>}>
                                <div className='content'>
                                    <p>Hello world</p>
                                    <p>Bye World</p>
                                    <p>Some other shit</p>
                                </div>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card size='medium' className='card' cover={<img src={pic} style={{width: 183}}></img>}>
                                <div className='content'>
                                    <p>Hello world</p>
                                    <p>Bye World</p>
                                    <p>Some other shit</p>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }
}

let root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App/>)

import '../src/myStile.css';