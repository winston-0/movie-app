import { format } from "date-fns";
export default class movieApi {
  apiKey = "50144123a6271043596e1c7cd112f310"
  guest_session_id = localStorage.getItem('sessionId')
  async createGuestSession() {
    let request = await fetch(
      "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=50144123a6271043596e1c7cd112f310"
    );
    let answer = await request.json();
    return answer.guest_session_id;
  }
  addRatedMovie(id, value) {
    let url = new URL(`https://api.themoviedb.org/3/movie/${id}/rating`)
    url.searchParams.append("api_key", this.apiKey)
    url.searchParams.append("guest_session_id", this.guest_session_id)
     fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({value})
    })
  }
  async getRatedMovies(page)  {
    let request = await fetch(`https://api.themoviedb.org/3/guest_session/${this.guest_session_id}/rated/movies?api_key=50144123a6271043596e1c7cd112f310&page=${page}`)
    let result = await request.json();
    return [this._transformData(result.results), result.total_pages];
  }
  deleteRatedMovie = async ( movieId) => {
    let url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/rating`)
    url.searchParams.append("api_key", this.apiKey)
    url.searchParams.append("guest_session_id", this.guest_session_id)
    let request = await fetch(url, {
      method: 'DELETE'
    })
    let result =  await request.json();
    return result
  }
  getGenres = async () => {
    let request = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`)
    let result = await request.json();
    return result
  }
  async getMoviesInfo(page = 1, search) {
    if (search === "") {
      return null;
    } else {
      const request = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=50144123a6271043596e1c7cd112f310&query=${search}&page=${page}`
      );
      if (request.ok !== true) {
        throw new Error(
          `something has gone wrong, error code: ${request.status}`
        );
      }
      const result = await request.json();
      return [this._transformData(result.results), result.total_pages];
    }
  }

  _transformData(data) {
    return data.map((item) => {
      return {
        id: item.id,
        title:
          item["title"].length > 35
            ? this._shortenString(item.title, 35)
            : item.title,
        overview:
          item["overview"].length > 155
            ? this._shortenString(item.overview, 158)
            : item.overview,
        poster:
          item.poster_path !== null
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : null,
        date: format(new Date(item.release_date || null), "MMMM d, y"),
        averageVote: item['vote_average'].toFixed(1),
      };
    });
  }
  _shortenString(string, amount) {
    let cutString = string.slice(0, amount);
    let result = cutString.slice(0, cutString.lastIndexOf(" ")) + " ...";
    return result;
  }
}
