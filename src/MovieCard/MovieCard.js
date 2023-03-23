import React from "react";
import { Card, Image, Space } from "antd";
import RateModule from "../RateModule/RateModule";

export default class MovieCards extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <Card
        className="movie-card"
        cover={
          <Image
            placeholder={true}
            className="movie-card__poster"
            src={data.poster}
          />
        }
      >
        <section className="movie-card__body">
          <h1 className="movie-card__title">{data.title}</h1>
          <span className="movie-card__date">{data.date}</span>
          <Space>
            <span className="movie-card__genre">Action</span>
            <span className="movie-card__genre">Drama</span>
          </Space>
          <span className="movie-card__overview">{data.overview}</span>
          <RateModule id={data.id} />
        </section>
      </Card>
    );
  }
}
