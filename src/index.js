import React from 'react';
import ReactDOM from 'react-dom/client';
import {Space, Layout, Col, Row, Card} from 'antd';
import pic from './testPic.png'
import { Content } from 'antd/es/layout/layout';
import '../src/myStile.css';
import { StyleProvider } from '@ant-design/cssinjs';



let getData = async () => {
let newRequest = await fetch('https://api.themoviedb.org/3/search/movie?api_key=50144123a6271043596e1c7cd112f310&query=y')
let response =  await newRequest.json();
function cutString() {
    response.results.map((el) => {
        if(el.overview.length > 220) {
        el.overview = el.overview.slice(0, 220).replace(/[a-z]+\s?$/, '...')
        }
        return el;
    })
}
function getImage() {
    response.results.map((el) => {
        el.image = `https://image.tmdb.org/t/p/w500/${el.poster_path}`
        return el
    })
}
getImage();
cutString();
return response.results 
}

class App extends React.Component {
    state = {info: null}
    componentDidMount() {
        getData().then(res => this.setState({info: res}))
    }
    componentDidUpdate() {
        let textEl = document.querySelector('.description')
        console.log(textEl.clientHeight)
    }

    render() { 
        let {info} = this.state;
        let cardBody = [];
        if(info !== null) {
            console.log(info)
        for(let i = 0; i <= 5; i++) {
            let el = 
            <Col key={Math.random() * 10} span={12}>
                <Card className='card' cover={<img className='cardImage' src={info[i].image}></img>}>
                    <div className='cardContent'>
                    <h2 className='cardTitle'>{info[i].title}</h2>
                    <span className='time'>march 5, 2020</span>
                    <div className='genreBox'>
                        <span className='genreName'>Action</span>
                        <span className='genreName'>Drama</span>
                    </div>
                    <span className='description'>{info[i].overview}</span>
                    </div>
                </Card>
            </Col>
            cardBody.push(el)
        }
    }
        return (
            <Layout>
                <Content className='mainblock'>
                    <Row gutter={[36,36]}>
                            {cardBody}
                    </Row>
                </Content>
            </Layout>
        )
    }
}

let root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App/>)

