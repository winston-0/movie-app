import React from 'react';
import ReactDOM from 'react-dom/client';
import { Layout, Tabs } from 'antd';
import MoviesList from '../MoviesList/MoviesList';
import movieApi from '../movieApi/movieApi'
import Spinner from '../Spinner/Spinner';
import AlertModule from '../AlerModule/AlertModule';
import { Offline, Online } from "react-detect-offline";
import PaginationBlock from '../Pagination/Pagination';
import SearchPanel from '../SearchPanel/SearchPanel';
import { debounce } from "lodash";
import { GenreProvider } from '../GenreProvider/GenreProvider';

const { Content , Footer , Header} = Layout;


export default class App extends React.Component {
    state = {
        search: null,
        moviesData : null,
        loading: false,
        error: false,
        page: 1,
        sessionId: null,
        ratedMovies: null,
        ratedPage: 1,
        totalPages: null,
        totalRatedPages: null,
        genreList: null
    }

    movieApiService = new movieApi();
    
    componentDidMount() {
        if(!localStorage.getItem('sessionId')) {
         this.movieApiService.createGuestSession()
        .then(res => localStorage.setItem('sessionId', res))
        } else {
         this.setState({
            sessiodId: localStorage.getItem('sessionId')
         })
        }
        this.movieApiService.getGenres()
        .then(this.onLoadedGenres)
    }
    onLoadedGenres = (res) => {
        this.setState({
            genreList: res
        })
    }
    getRatedMovies = (e) => {
        const {ratedPage} = this.state
        if(e === '2') {
            this.setState({
                loading: true
            })
            setTimeout(() => {
                this.movieApiService.getRatedMovies(ratedPage)
                .then(this.onLoadedRatedMovies)
                .catch(this.onError)
            }, 500);
        }
    }
    updateRatedMovies = () => {
        const {ratedPage} = this.state
        this.movieApiService.getRatedMovies(ratedPage)
        .then(this.onLoadedRatedMovies)
        .catch(this.onError)
    }
    searchMovies = () => {
        this.setState({
            loading: true,
            error: false
        })
        this.movieApiService.getMoviesInfo(this.state.page, this.state.search)
        .then(this.onLoadedMovies)
        .catch(this.onError)
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.page !== this.state.page || prevState.search !== this.state.search) {
                this.searchMovies() 
        }
        if(prevState.ratedPage !== this.state.ratedPage) {
            this.getRatedMovies('2')
            window.scrollTo(0,0)
        }
    }
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
        console.log(err)
    }
    onLoadedMovies = (res) => {
        if(res !== null) {
        const [moviesData, totalPages] = res;
        setTimeout(() => {
            this.setState({
                moviesData: moviesData,
                loading: false,
                totalPages: totalPages
            })
        }, 1000)
    } else {
        this.setState({
            moviesData: null,
            loading: false,
            totalPages: null
    })
    }
    }
    onLoadedRatedMovies = (res) => {
        const [moviesData, totalPages] = res;
        this.setState({
            ratedMovies: moviesData,
            loading: false,
            totalRatedPages: totalPages
        })
    }
    changePageNumber = (selectedPage) => {
        this.setState({
            page: selectedPage
        })
        window.scrollTo(0, 0)
    }
    changeRatedPageNumber = (selectedPage) => {
        this.setState({
            ratedPage: selectedPage
        })  
    }
    changeSearchValue = (e) => {
        this.setState({
            search: e.target.value.trim(),
            page: 1
        })
    }
    debouncedFn = debounce(this.changeSearchValue, 1500)
    getSearchInput = (e) => {
        this.debouncedFn(e);
    }
    render() {
        const {moviesData, error, loading, ratedMovies, totalPages, totalRatedPages, genreList} = this.state
        const moviesList = (data) => 
        {if(loading === false && data !== null){ 
          return  <MoviesList loading={false} moviesData={data} onUpdateData={this.updateRatedMovies}/>
        } else if(loading === true && data !== null) {
          return  <MoviesList loading={true} moviesData={data} onUpdateData={this.updateRatedMovies}/>
        } else if(loading === true && data === null) {
          return  <Spinner/>
        } 
        }
        const pagination = (type) => {
            if(type === 'search') {
                return (moviesData !== null && moviesData.length !== 0 ) ? <PaginationBlock total={totalPages} changePageNumber={this.changePageNumber}/> : null
            } else if(type === 'rated') {
                return (ratedMovies !== null && ratedMovies.length !== 0 ) ? <PaginationBlock total={totalRatedPages} changePageNumber={this.changeRatedPageNumber}/> : null
            }
        }
        const errorMessage = error ? <AlertModule type="error" text="some error occured"/> : null
        const items = [
            {
                key: '1',
                label: `Search`,
                children: (
                    <React.Fragment>
                    <header className='header'>
                        <SearchPanel getSearchInput={this.getSearchInput}/>
                    </header>
                    <Content className='main'>
                        <GenreProvider value={genreList}>
                            {moviesList(moviesData)}
                        </GenreProvider>
                            {errorMessage}
                        <Offline>
                            <AlertModule type='error' text='no internet connection'></AlertModule>
                        </Offline>
                    </Content>
                    <Footer className='footer'>
                        {pagination('search')}
                    </Footer>
                    </React.Fragment>
                ),
              },
              {
                key: '2',
                label: `Rated`,
                children: (
                    <React.Fragment>
                    <Content className='main'>
                        <GenreProvider value={genreList}>
                            {moviesList(ratedMovies)}
                        </GenreProvider>
                            {errorMessage}
                        <Offline>
                            <AlertModule type='error' text='no internet connection'></AlertModule>
                        </Offline>
                    </Content>
                    <Footer className='footer'>
                        {pagination('rated')}
                    </Footer>
                    </React.Fragment>
                ),
              }
        ]
        return (
            <Layout className="movie-app-cont">
                <Tabs onChange={(e) => this.getRatedMovies(e)} centered defaultActiveKey="1" items={items}/>
        </Layout>
        )
    }
} 