import React from "react";
import { tv } from "../../api";
import TVPresenter from "./TVPresenter";


export default class extends React.Component {
    state = {
        loading: true,
        popular: null,
        airingThisWeek: null,
        airingToday: null
    };


    async componentDidMount() {
        let popular, airingThisWeek, airingToday, error;
        try {
            ({
                data: { results: popular }
            } = await tv.getPopular());
            ({
                data: { results: airingThisWeek }
            } = await tv.getAiringThisWeek());
            ({
                data: { results: airingToday }
            } = await tv.getAiringToday());
        } catch (error) {
            console.log(error);
            error = "Can't get TV";
        } finally {
            this.setState({
                loading: false,
                error,
                popular,
                airingThisWeek,
                airingToday
            });
        }
    }

    render() {
        const { loading, popular, topRated, airingToday } = this.state;
        return (
            <TVPresenter
                loading={loading}
                airingToday={this.state.airingToday}
                airingThisWeek={this.state.airingThisWeek}
                popular={this.state.popular}
            />
        );
    }
}