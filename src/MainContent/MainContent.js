import React from "react";
import { Space } from "antd";
import MovieCard from "../MovieCard/MovieCard";

export default class MainContent extends React.Component {
    renderCard() {
        const {moviesData} = this.props
        let moviesCards = null;
        if(moviesData !== null) {
            moviesCards = moviesData.map(filmData => {
                return <MovieCard  key={Math.random() * 100} data={filmData}/>
            })
        }
        return moviesCards 
    }

    render() {
        return (
            <Space size={36} wrap>
                {this.renderCard()}
            </Space>
        )
    }
}




