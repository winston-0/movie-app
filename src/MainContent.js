import React from "react";
import { Card, Space } from "antd";

export default class MainContent extends React.Component {

    render() {
        const {moviesData} = this.props
        if(moviesData !== null) {
            const loaderCards =
            moviesData.map(el => {
                
            })
        }
        return (
            <Space size={36} wrap>
                <Card className="movie-card"></Card>
                <Card className="movie-card"></Card>
                <Card className="movie-card"></Card>
                <Card className="movie-card"></Card>
            </Space>
        )
    }
}