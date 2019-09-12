import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native'
import {BG_COLOR, TINT_COLOR} from "../../constants/Colors";
import Layout from "../../constants/Layout";
import makePhotoUrl from "../../utils/makePhotoUrl";
import MoviePoster from "../../components/MoviePoster";
import MovieRating from "../../components/MovieRatings";
import Loader from "../../components/Loader";
import {Linking} from "react-native";

const Container = styled.ScrollView`
    background-color: ${BG_COLOR};
`;

const BgImage = styled.Image`
width: ${Layout.width};
height: ${Layout.height / 3.5};
opacity: 0.3;
position: absolute;
top: 0;
`;

const Content = styled.View`
    flex-direction: row;
    align-items: flex-end;
    padding-horizontal: 20px;
    height: ${Layout.height / 3.5};
   
`;

const Column = styled.View`
   margin-left: 10px;
    `;

const Title = styled.Text`
color: ${TINT_COLOR};
font-size: 18px;
font-weight: 600;
margin-bottom: 10px;
width: 80%
`;

const Header = styled.View`
position: relative;
justify-content: flex-end;
`;

const MainContent = styled.View`
    padding-horizontal: 20px;
    margin-top: 25px;
`;

const ContentTitle = styled.Text`
    color: ${TINT_COLOR};
    font-weight: 800;
    margin-bottom: 10px;
    font-size: 16px;
    
`;

const Tag = styled.Text`
    color: ${TINT_COLOR};
    font-weight: bold;
    margin-bottom: 30px;
    text-align: center;
    font-style: italic;
`;

const ContentValue = styled.Text`
    color: ${TINT_COLOR};
    font-size: 14px;
    margin-bottom: 10px;
  
`;

const DataContainer = styled.View`
    margin-bottom: 10px;
`;

const Genres = styled.Text`
  color: ${TINT_COLOR};
  font-size: 12px;
  margin-top: 10px;
  width: 95%;
`;




const DetailPresenter = ({
    id,
    isMovie,
    posterPhoto,
    backgroundPhoto,
    title,
    voteAvg,
    overview,
    loading,
    status,
    date,
    genres,
    runtime,
    tagline,
    videos,
    homepage,
    last_air_date,
    season_number,
    episode_number,
                         }) =>{
    return (
        <Container>
            <Header>
                <BgImage source={{uri: makePhotoUrl(backgroundPhoto)}}/>
                <Content>
                    <MoviePoster path={posterPhoto} />
                    <Column>
                        <Title>{title}</Title>
                        <MovieRating inSlide={true} votes={voteAvg}/>
                        {genres ? (
                            <Genres>
                                {genres.map((genre, index) =>
                                    index === genres.length - 1 ? genre.name : `${genre.name} / `
                                )}
                            </Genres>
                        ) : null}
                    </Column>
                </Content>
            </Header>
            <MainContent>
                {tagline ? <>
                    <Tag>{`"${tagline}"`}</Tag>
                </> : null}
                {overview ? <>
                    <ContentTitle># 줄거리</ContentTitle>
                    <ContentValue>{overview}</ContentValue>
                </> : null}
                {status ? <>
                    <ContentTitle># 개봉 상황</ContentTitle>
                    <ContentValue>{status}</ContentValue>
                </> : null}
                {date ? <>
                    <ContentTitle>
                        {
                            isMovie ? "# 개봉일" : "# 첫 방영일"
                        }</ContentTitle>
                    <ContentValue>{date}</ContentValue>
                </> : null}
                {last_air_date ? <>
                    <ContentTitle># 마지막 방영일</ContentTitle>
                    <ContentValue>{last_air_date}</ContentValue>
                </> : null}
                {season_number ? <>
                    <ContentTitle># 총 시즌 수</ContentTitle>
                    <ContentValue>{`${season_number}개`}</ContentValue>
                </> : null}
                {episode_number ? <>
                    <ContentTitle># 총 에피소드 수</ContentTitle>
                    <ContentValue>{`${episode_number}개`}</ContentValue>
                </> : null}
                {runtime ? <>
                    <ContentTitle># 러닝 타임</ContentTitle>
                    <ContentValue>{`${runtime}분`}</ContentValue>
                </> : null}
                {homepage ? <>
                    <ContentTitle onPress={() =>
                        Linking.openURL(`${homepage}`)}># 홈페이지 방문 (여기를 누르세요!)</ContentTitle>
                </> : null}
                {videos ? ( videos.length > 0 ? (
                        <>
                            <ContentTitle># 비디오</ContentTitle>
                            {videos.map((video)=>{
                                return <ContentValue key={video.key}
                                                     onPress={() =>
                                                         Linking.openURL(`https://www.youtube.com/watch?v=${video.key}`)}>
                                    {video.name}
                                </ContentValue>
                            })}
                        </>
                    ) : null
                    )
               : null}
                {loading ? <Loader/> : null}
            </MainContent>
        </Container>
    )
};


DetailPresenter.propTypes = {
    id:PropTypes.number.isRequired,
    posterPhoto: PropTypes.string.isRequired,
    backgroundPhoto: PropTypes.string,
    title: PropTypes.string,
    voteAvg: PropTypes.number,
    overview: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    isMovie: PropTypes.bool.isRequired,
    status: PropTypes.string,
    date: PropTypes.string,
    genres: PropTypes.array,
    videos: PropTypes.array,
};

export default DetailPresenter;