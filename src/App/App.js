import React from 'react';
import ReactDOM from 'react-dom/client';
import { Layout } from 'antd';
import MainContent from '../MainContent/MainContent';
import movieApi from '../movieApi/movieApi'
import Spinner from '../Spinner/Spinner';
import AlertModule from '../AlerModule/AlertModule';
import { Offline, Online } from "react-detect-offline";
import PaginationBlock from '../Pagination/Pagination';
import SearchPanel from '../SearchPanel/SearchPanel';
import { debounce } from "lodash";

const { Content , Footer , Header} = Layout;


export default class App extends React.Component {
    state = {
        search: null,
        moviesData : null,
        loading: false,
        error: false,
        page: 1,
    }

    movieApiService = new movieApi();

    searchMovies = () => {
        this.setState({
            loading: true,
            error: false
        })
        this.movieApiService.getMoviesInfo(this.state.page, this.state.search)
        .then(this.onLoaded)
        .catch(this.onError)
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.page !== this.state.page || prevState.search !== this.state.search) {
            this.searchMovies()
        }
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

    changePageNumber = (selectedPage) => {
        this.setState({
            page: selectedPage
        })
    }
    getSearchInput = (e) => {
        const changeSearchValue = () => {  
            this.setState({
                search: e.target.value.trim(),
                page: 1
            })
        }
        const debouncedFn = debounce(changeSearchValue, 3000)
        debouncedFn();
    }
    render() {
        const {moviesData, error, loading} = this.state
        const mainContent = loading === false ? <MainContent moviesData={moviesData}/> : <Spinner/>
        const pagination = (moviesData !== null && moviesData.length !== 0) ? <PaginationBlock changePageNumber={this.changePageNumber}/> : null
        const errorMessage = error ? <AlertModule type="error" text="some error occured"/> : null
        return (
            <Layout className="movie-app-cont">
                <header className='header'>
                    <SearchPanel getSearchInput={this.getSearchInput}/>
                </header>
                <Content className='main'>
                        {mainContent}
                        {errorMessage}
                    <Offline>
                        <AlertModule type='error' text='no internet connection'></AlertModule>
                    </Offline>
                </Content>
                <Footer className='footer'>
                    {pagination}
                </Footer>
        </Layout>
        )
    }
} 