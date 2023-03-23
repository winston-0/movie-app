import { format } from "date-fns";
export default class movieApi {
  async createGuestSession() {
    let request = await fetch(
      "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=50144123a6271043596e1c7cd112f310"
    );
    let answer = await request.json();
    return answer.guest_session_id;
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
      return this._transformData(result.results);
    }
  }

  _transformData(data) {
    return data.map((item) => {
      return {
        id: item.id,
        title:
          item["title"].length > 40
            ? this._shortenString(item.title, 40)
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
      };
    });
  }
  _shortenString(string, amount) {
    let cutString = string.slice(0, amount);
    let result = cutString.slice(0, cutString.lastIndexOf(" ")) + " ...";
    return result;
  }
}
