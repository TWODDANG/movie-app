import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import styled from "styled-components";
import {Text} from 'react-native';
import Layout from "../constants/Layout";
import MovieSlide from "./MovieSlide";
import MovieRating from "./MovieRatings";

const SWIPER_HEIGHT = Layout.height / 3;

const View = styled.View`
height: ${SWIPER_HEIGHT};
`;
const MovieSlider = ({movies}) => {
    return (
        movies ?  (
            <Swiper
                showsPagination={false}
                autoplay={true}
                style={{height:SWIPER_HEIGHT}}
                autoplayTimeout = {3}>
                {movies
                    .filter(movie => movie.backdrop_path !== null)
                    .map(movie =>
                        (<View key={movie.id}>
                                <MovieSlide
                                    overview={movie.overview}
                                    voteAvg={movie.vote_average}
                                    title={movie.title}
                                    id={movie.id}
                                    backgroundPhoto={movie.backdrop_path}
                                    posterPhoto={movie.poster_path}
                                />
                            </View>
                        ))}
            </Swiper>
        ) : null
    )
};
MovieSlider.propTypes = {
  movies: PropTypes.array
};

export default MovieSlider;