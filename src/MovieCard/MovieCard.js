import React from 'react'
import { Card, Image, Space } from 'antd'

import RateModule from '../RateModule/RateModule'
import { GenreConsumer } from '../GenreProvider/GenreProvider'

export default class MovieCards extends React.Component {
  render() {
    const { data, onUpdateData, loading } = this.props
    const { genreIds } = data
    const colorForAverageRating = () => {
      if (data.averageVote > 0 && data.averageVote <= 3) {
        return 'movie-card__average-rating--red'
      } else if (data.averageVote > 3 && data.averageVote <= 5) {
        return 'movie-card__average-rating--orange'
      } else if (data.averageVote > 5 && data.averageVote <= 7) {
        return 'movie-card__average-rating--yellow'
      } else if (data.averageVote > 7) {
        return 'movie-card__average-rating--green'
      }
    }
    const getGenres = (genreList) => {
      const result = genreList.map((item) => {
        for (let i of genreIds) {
          if (i === item.id) {
            return (
              <span key={Math.random() * 100} className="movie-card__genre">
                {item.name}
              </span>
            )
          }
        }
      })
      return result
    }
    return (
      <GenreConsumer>
        {(genreList) => {
          return (
            <Card
              loading={loading}
              className="movie-card"
              cover={
                <Image placeholder={true} className="movie-card__poster" src={loading === true ? null : data.poster} />
              }
            >
              <section className="movie-card__body">
                <Space direction="horizontal" align="start" style={{ justifyContent: 'space-between' }}>
                  <h1 className="movie-card__title">{data.title}</h1>
                  <div className={`movie-card__average-rating ${colorForAverageRating()}`}>{data.averageVote}</div>
                </Space>
                <span className="movie-card__date">{data.date}</span>
                <Space wrap>{getGenres(genreList)}</Space>
                <span className="movie-card__overview">{data.overview}</span>
                <RateModule onUpdateData={onUpdateData} id={data.id} />
              </section>
            </Card>
          )
        }}
      </GenreConsumer>
    )
  }
}
