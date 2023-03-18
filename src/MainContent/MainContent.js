import React from "react";
import { Card, Space } from "antd";

export default class MainContent extends React.Component {

    render() {
        const {moviesData} = this.props
        let loadedCards = null;
        if(moviesData !== null) {
            loadedCards =
            moviesData.map(el => {
               return <Card
                cover={<img className="movie-card__poster" src={el.poster}/>} className="movie-card">
                </Card>
            })
        }
        return (
            <Space size={36} wrap>
                {loadedCards}
            </Space>
        )
    }
}