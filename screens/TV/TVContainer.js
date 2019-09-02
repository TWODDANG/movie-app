import React from "react";
import { tv } from "../../api";
import TVPresenter from "./TVPresenter";


export default class extends React.Component {
    state = {
        loading: true,
        popular: null,
        topRated: null,
        airingToday: null
    };

    logFunction = () => {
        console.log('TVContainer시발');
    };

    async componentDidMount() {
        let popular, topRated, airingToday, error;
        console.log('componentDidMount');
        this.logFunction();
        try {
            ({
                data: { results: popular }
            } = await tv.getPopular());
            ({
                data: { results: topRated }
            } = await tv.getTopRated());
            ({
                data: { results: airingToday }
            } = await tv.getAiringToday());
            console.log('ComponentDidMount try중..')
        } catch (error) {
            console.log(error);
            error = "Can't get TV";
        } finally {
            this.setState({
                loading: false,
                error,
                popular,
                topRated,
                airingToday
            });
            this.logFunction();
        }
    }

    render() {
        const { loading, popular, topRated, airingToday } = this.state;
        console.log('!!!!!!');
        return (
            <TVPresenter
                loading={loading}
                airingToday={airingToday}
                topRated={topRated}
                popular={popular}
            />
        );
    }
}