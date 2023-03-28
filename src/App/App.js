import React from 'react'
import { Layout, Tabs } from 'antd'
import { debounce } from 'lodash'

import MoviesList from '../MoviesList/MoviesList'
import movieApi from '../movieApi/movieApi'
import Spinner from '../Spinner/Spinner'
import AlertModule from '../AlerModule/AlertModule'
import PaginationBlock from '../Pagination/Pagination'
import SearchPanel from '../SearchPanel/SearchPanel'
import { GenreProvider } from '../GenreProvider/GenreProvider'

const { Content, Footer } = Layout

export default class App extends React.Component {
  state = {
    search: null,
    moviesData: null,
    loading: false,
    error: false,
    page: 1,
    sessionId: null,
    ratedMovies: null,
    ratedPage: 1,
    totalPages: null,
    totalRatedPages: null,
    genreList: null,
  }

  movieApiService = new movieApi()

  componentWillUnmount() {
    this.setState({
      moviesData: null,
    })
  }

  componentDidMount() {
    if (!localStorage.getItem('sessionId')) {
      this.movieApiService.createGuestSession().then((res) => localStorage.setItem('sessionId', res))
    } else {
      this.setState({
        sessiodId: localStorage.getItem('sessionId'),
      })
    }
    this.movieApiService.getGenres().then(this.onLoadedGenres)
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.searchMovies()
    }
    if (prevState.search !== this.state.search) {
      this.setState({
        page: 1,
      })
      this.searchMovies()
    }
    if (prevState.ratedPage !== this.state.ratedPage) {
      this.getRatedMovies('2')
      window.scrollTo(0, 0)
    }
  }

  searchMovies = () => {
    this.setState({
      loading: this.state.search === '' ? false : true,
      error: false,
    })
    this.movieApiService.getMoviesInfo(this.state.page, this.state.search).then(this.onLoadedMovies).catch(this.onError)
  }
  onLoadedMovies = (res) => {
    if (res !== null) {
      const [moviesData, totalPages] = res
      setTimeout(() => {
        this.setState({
          moviesData: moviesData,
          loading: false,
          totalPages: totalPages,
        })
      }, 1000)
    } else {
      this.setState({
        moviesData: null,
        loading: false,
        totalPages: null,
      })
    }
  }

  getRatedMovies = (e) => {
    const { ratedPage } = this.state
    if (e === '2') {
      this.setState({
        loading: true,
      })
      setTimeout(() => {
        this.movieApiService.getRatedMovies(ratedPage).then(this.onLoadedRatedMovies).catch(this.onError)
      }, 500)
    }
  }
  updateRatedMovies = () => {
    const { ratedPage } = this.state
    this.movieApiService.getRatedMovies(ratedPage).then(this.onLoadedRatedMovies).catch(this.onError)
  }
  onLoadedRatedMovies = (res) => {
    const [moviesData, totalPages] = res
    this.setState({
      ratedMovies: moviesData,
      loading: false,
      totalRatedPages: totalPages,
    })
  }

  changePageNumber = (selectedPage) => {
    this.setState({
      page: selectedPage,
    })
    window.scrollTo(0, 0)
  }
  changeRatedPageNumber = (selectedPage) => {
    this.setState({
      ratedPage: selectedPage,
    })
  }

  changeSearchValue = (e) => {
    this.setState({
      search: e.target.value.trim(),
      page: 1,
    })
  }
  debouncedFn = debounce(this.changeSearchValue, 1500)
  getSearchInput = (e) => {
    this.debouncedFn(e)
  }

  onLoadedGenres = (res) => {
    this.setState({
      genreList: res,
    })
  }
  onTabChange = () => {
    this.setState({
      loading: false,
    })
  }
  render() {
    const { moviesData, error, loading, ratedMovies, totalPages, totalRatedPages, genreList } = this.state
    const moviesList = (data) => {
      if (loading === false && data !== null && data.length !== 0) {
        return <MoviesList loading={false} moviesData={data} onUpdateData={this.updateRatedMovies} />
      } else if (loading === true && data !== null && data.length !== 0) {
        return <MoviesList loading={true} moviesData={data} onUpdateData={this.updateRatedMovies} />
      } else if ((loading === true && data === null) || (loading === true && data.length === 0)) {
        return <Spinner />
      } else if (loading === false && data !== null && data.length === 0) {
        return <AlertModule type="info" text="no moview was found" />
      }
    }
    const pagination = (type) => {
      if (type === 'search') {
        return moviesData !== null && moviesData.length !== 0 ? (
          <PaginationBlock total={totalPages} changePageNumber={this.changePageNumber} />
        ) : null
      } else if (type === 'rated') {
        return ratedMovies !== null && ratedMovies.length !== 0 ? (
          <PaginationBlock total={totalRatedPages} changePageNumber={this.changeRatedPageNumber} />
        ) : null
      }
    }
    const errorMessage = error ? <AlertModule type="error" text="some error occured" /> : null
    const items = [
      {
        key: '1',
        label: 'Search',
        children: (
          <React.Fragment>
            {navigator.onLine ? (
              <React.Fragment>
                <header className="header">
                  <SearchPanel getSearchInput={this.getSearchInput} />
                </header>
                <Content className="main">
                  <GenreProvider value={genreList}>{moviesList(moviesData)}</GenreProvider>
                  {errorMessage}
                </Content>
                <Footer className="footer">{pagination('search')}</Footer>
              </React.Fragment>
            ) : (
              <AlertModule type="error" text="no internet connection"></AlertModule>
            )}
          </React.Fragment>
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: (
          <React.Fragment>
            {navigator.onLine ? (
              <React.Fragment>
                <Content className="main">
                  <GenreProvider value={genreList}>{moviesList(ratedMovies)}</GenreProvider>
                  {errorMessage}
                </Content>
                <Footer className="footer">{pagination('rated')}</Footer>
              </React.Fragment>
            ) : (
              <AlertModule type="error" text="no internet connection"></AlertModule>
            )}
          </React.Fragment>
        ),
      },
    ]
    return (
      <Layout className="movie-app-cont">
        <Tabs
          onChange={(e) => {
            this.onTabChange()
            this.getRatedMovies(e)
          }}
          centered
          defaultActiveKey="1"
          items={items}
        />
      </Layout>
    )
  }
}
