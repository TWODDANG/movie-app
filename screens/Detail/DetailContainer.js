import React from 'react';
import DetailPresenter from './DetailPresenter';
import {movies, tv} from "../../api";

export default class extends React.Component{
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title')
        };
};

    constructor(props){
        super(props);
        const {
            navigation: {
                state : {
                    params: {isMovie, id, posterPhoto, backgroundPhoto, title, voteAvg, overview, loading}
                }
            }
        } = props;
        this.state = {
            isMovie,
            id,
            posterPhoto,
            backgroundPhoto,
            title,
            voteAvg,
            overview,
            loading:true,
        }
    }
    async componentDidMount(){
        const {isMovie, id} = this.state;
        let  episode_number, season_number, homepage, last_air_date,videos, tagline, genres,
            overview, status, runtime, date, backgroundPhoto;
        try{
            if(isMovie){
                ({
                    data: {
                        genres,
                        overview,
                        status,
                        runtime,
                        tagline,
                        videos,
                        release_date:date,
                        backdrop_path: backgroundPhoto,
                    }
                } = await movies.getMovie(id));
            } else {
                ({
                    data: {
                        genres,
                        overview,
                        status,
                        first_air_date:date,
                        backdrop_path: backgroundPhoto,
                        last_air_date,
                        homepage,
                        number_of_episodes: episode_number,
                        number_of_seasons: season_number,

                    }
                } = await tv.getShow(id));
            }
        } catch (error){
            console.log(error);
        } finally {
            if(isMovie) {
                this.setState({
                    loading: false,
                    genres,
                    backgroundPhoto,
                    overview,
                    status,
                    date,
                    runtime,
                    tagline,
                    videos: videos.results,
                });
            } else {
                this.setState({
                    loading: false,
                    genres,
                    backgroundPhoto,
                    overview,
                    status,
                    date,
                    runtime,
                    last_air_date,
                    season_number,
                    episode_number,
                    homepage,
                });
            }

        }
    }

    render() {
        const {
            id, posterPhoto, backgroundPhoto, title, voteAvg,
            overview, loading,date,status,isMovie,genres,runtime,tagline
            ,videos, last_air_date, season_number, episode_number, homepage
        } = this.state;
        return <DetailPresenter
        id={id}
        posterPhoto={posterPhoto}
        backgroundPhoto={backgroundPhoto}
        title={title}
        voteAvg={voteAvg}
        overview={overview}
        loading={loading}
        date={date}
        status={status}
        isMovie={isMovie}
        genres={genres}
        runtime={runtime}
        tagline={tagline}
        videos={videos}
        last_air_date={last_air_date}
        season_number = {season_number}
        episode_number = {episode_number}
        homepage = {homepage}
        />

    }
}