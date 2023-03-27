import React from 'react'

import MovieCard from '../MovieCard/MovieCard'
// import AlerModule from '../AlerModule/AlertModule'

export default function MoviesList({ moviesData, onUpdateData, loading }) {
  // if (moviesData !== null && moviesData.length === 0) {
  //   return <AlerModule type="info" text="no moview was found" />
  // }
  let moviesCards = null
  if (moviesData !== null && moviesData !== []) {
    moviesCards = moviesData.map((filmData) => {
      return <MovieCard loading={loading} onUpdateData={onUpdateData} key={Math.random() * 100} data={filmData} />
    })
  }
  return moviesCards
}
