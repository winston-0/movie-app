import React from 'react';
import ReactDOM from 'react-dom/client';
import { Layout } from 'antd';
import MainContent from './MainContent';
import movieApi from './movieApi';
const { Content } = Layout;


export default class App extends React.Component {
    state = {
        moviesData : null
    }
    componentDidMount() {
        const movieApiService = new movieApi();
        movieApiService.getMoviesInfo().then(res => this.setState({
            moviesData: res
        }))
    }
    render() {
        const {moviesData} = this.state
        return (
            <Layout className="movie-app-cont">
            <Content>
                <MainContent moviesData={moviesData}/>
            </Content>
        </Layout>
        )
    }
} 