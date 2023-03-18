import React from "react";
import { Space } from "antd";
import MovieCards from "../MovieCards/MovieCards";

export default class MainContent extends React.Component {

    render() {
        const {moviesData} = this.props
        let moviesCards = null;
        if(moviesData !== null) {
            moviesCards = moviesData.map(filmData => {
                return <MovieCards  key={Math.random() * 100} data={filmData}/>
            })
        }
        return (
            <Space size={36} wrap>
                {moviesCards}
            </Space>
        )
    }
}




