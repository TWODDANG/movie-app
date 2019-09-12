import React from "react";
import styled from 'styled-components/native'
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import MovieItem from "../../components/MovieItem";
import Section from "../../components/Section";
import { BG_COLOR } from "../../constants/Colors";

const Container = styled.ScrollView`
  background-color: ${BG_COLOR};
`;

const TVPresenter = ({ loading, popular, airingThisWeek, airingToday }) =>
    (loading ? (
        <Loader />
    ) : (
        <Container>
            {airingToday ? (
                <Section title="오늘은 어떤 프로그램?">
                    {airingToday
                        .filter(tv => tv.poster_path !== null)
                        .map(tv => (
                            <MovieItem
                                isMovie={false}
                                key={tv.id}
                                id={tv.id}
                                posterPhoto={tv.poster_path}
                                title={tv.name}
                                voteAvg={tv.vote_average}
                            />
                        ))}
                </Section>
            ) : null}
            {airingThisWeek ? (
                <Section title="이번주 프로그램">
                    {airingThisWeek
                        .filter(tv => tv.poster_path !== null)
                        .map(tv => (
                            <MovieItem
                                isMovie={false}
                                key={tv.id}
                                id={tv.id}
                                posterPhoto={tv.poster_path}
                                title={tv.name}
                                voteAvg={tv.vote_average}
                            />
                        ))}
                </Section>
            ) : null}
            {popular ? (
                <Section title="인기 있는!" horizontal={false}>
                    {popular
                        .filter(tv => tv.poster_path !== null)
                        .map(tv => (
                            <MovieItem
                                isMovie={false}
                                horizontal={true}
                                key={tv.id}
                                id={tv.id}
                                overview={tv.overview}
                                posterPhoto={tv.poster_path}
                                title={tv.name}
                                voteAvg={tv.vote_average}
                            />
                        ))}
                </Section>
            ) : null}
        </Container>
    )
    );

TVPresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    popular: PropTypes.array,
    airingThisWeek: PropTypes.array,
    airingToday: PropTypes.array
};

export default TVPresenter;