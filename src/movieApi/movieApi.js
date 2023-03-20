import { format } from 'date-fns'
export default class movieApi {
    async getMoviesInfo() {
        const request = await fetch('https://api.themoviedb.org/3/search/movie?api_key=50144123a6271043596e1c7cd112f310&query=p '
        )
        if(request.ok !== true) {
            throw new Error(`something has gone wrong, error code: ${request.status}`)
        }
        const result = await request.json();
        return this._transformData(result.results)
    }

    _transformData(data) {
        return data.map(item => {
            return {
                title: (item['title'].length > 40 ? this._shortenString(item.title, 40) : item.title),
                overview: (item['overview'].length > 155 ? this._shortenString(item.overview, 158) : item.overview),
                poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                date: format(new Date(item.release_date), 'MMMM d, y')
            }
        }) 
    }
    _shortenString(string, amount) {
        let cutString = string.slice(0, amount);
        let result = cutString.slice(0, cutString.lastIndexOf(' ')) + ' ...'
        return result;
    }
}