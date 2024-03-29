import { format } from 'date-fns'
export default class movieApi {
  basis = 'https://api.themoviedb.org/3'
  apiKey = '50144123a6271043596e1c7cd112f310'
  async createGuestSession() {
    let request = await fetch(`${this.basis}/authentication/guest_session/new?api_key=${this.apiKey}`)
    let answer = await request.json()
    return answer.guest_session_id
  }
  addRatedMovie(id, value) {
    const guest_session_id = localStorage.getItem('sessionId')
    let url = new URL(`${this.basis}/movie/${id}/rating`)
    url.searchParams.append('api_key', this.apiKey)
    url.searchParams.append('guest_session_id', guest_session_id)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value }),
    })
  }
  async getRatedMovies(page) {
    const guest_session_id = localStorage.getItem('sessionId')
    let request = await fetch(
      `${this.basis}/guest_session/${guest_session_id}/rated/movies?api_key=${this.apiKey}&page=${page}`
    )
    let result = await request.json()
    return [this._transformData(result.results), result.total_pages]
  }
  deleteRatedMovie = async (movieId) => {
    const guest_session_id = localStorage.getItem('sessionId')
    let url = new URL(`${this.basis}/movie/${movieId}/rating`)
    url.searchParams.append('api_key', this.apiKey)
    url.searchParams.append('guest_session_id', guest_session_id)
    let request = await fetch(url, {
      method: 'DELETE',
    })
    let result = await request.json()
    return result
  }
  getGenres = async () => {
    let request = await fetch(`${this.basis}/genre/movie/list?api_key=${this.apiKey}&language=en-US`)
    let result = await request.json()
    return result.genres
  }
  async getMoviesInfo(page = 1, search) {
    if (search === '') {
      return null
    } else {
      const request = await fetch(`${this.basis}/search/movie?api_key=${this.apiKey}&query=${search}&page=${page}`)
      if (request.ok !== true) {
        throw new Error(`something has gone wrong, error code: ${request.status}`)
      }
      const result = await request.json()
      return [this._transformData(result.results), result.total_pages]
    }
  }

  _transformData(data) {
    return data.map((item) => {
      return {
        id: item.id,
        title: item['title'].length > 35 ? this._shortenString(item.title, 35) : item.title,
        overview: item['overview'].length > 155 ? this._shortenString(item.overview, 158) : item.overview,
        poster: item.poster_path !== null ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
        date: format(new Date(item.release_date || null), 'MMMM d, y'),
        averageVote: item['vote_average'].toFixed(1),
        genreIds: item['genre_ids'],
      }
    })
  }
  _shortenString(string, amount) {
    let cutString = string.slice(0, amount)
    let result = cutString.slice(0, cutString.lastIndexOf(' ')) + ' ...'
    return result
  }
}
