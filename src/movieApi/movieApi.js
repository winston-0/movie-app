export default class movieApi {
    async getMoviesInfo() {
        const request = await fetch('https://api.themoviedb.org/3/search/movie?api_key=50144123a6271043596e1c7cd112f310&query=y'
        )
        if(request.ok !== true) {
            throw new Error('something has gone wrong')
        }
        const result = await request.json();
        return this._transformData(result.results)
    }

    _transformData(data) {
        return data.map(item => {
            return {
                title: item.title,
                overview: item.overview,
                poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`
            }
        }) 
    }
}