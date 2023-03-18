import React from 'react';
import ReactDOM from 'react-dom/client';
import { Layout } from 'antd';
import MainContent from '../MainContent/MainContent';
import movieApi from '../movieApi/movieApi'
import Spinner from '../Spinner/Spinner';
import AlertModule from '../AlerModule/AlertModule';
import { Offline, Online } from "react-detect-offline";
const { Content } = Layout;


export default class App extends React.Component {
    state = {
        moviesData : null,
        loading: true,
        error: false
    }
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
        console.log(err)
    }
    onLoaded = (res) => {
        this.setState({
            moviesData: res,
            loading: false
        })
    }
    componentDidMount() {
        const movieApiService = new movieApi();
        movieApiService.getMoviesInfo()
        .then(this.onLoaded)
        .catch(this.onError)
    }
    render() {
        const {moviesData, error, loading} = this.state
        return (
            <Layout className="movie-app-cont">
            <Content>
                <Online>
                    {loading === false ? <MainContent moviesData={moviesData}/> : <Spinner/>}
                </Online>
                {error === true ? <AlertModule text="something has gone wrong"/> : null}
                <Offline><AlertModule text="no internet connection"/></Offline>
            </Content>
        </Layout>
        )
    }
} 