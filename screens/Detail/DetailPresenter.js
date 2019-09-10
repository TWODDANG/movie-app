import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {BG_COLOR, TINT_COLOR} from "../../constants/Colors";
import Layout from "../../constants/Layout";
import makePhotoUrl from "../../utils/makePhotoUrl";
import MoviePoster from "../../components/MoviePoster";
import MovieRating from "../../components/MovieRatings";

const Container = styled.ScrollView`
    flex : 1;
    position: relative;
    padding-top: 20px;
`;

const BgImage = styled.Image`
width: ${Layout.width};
height: ${Layout.height / 3.5};
opacity: 0.3;
position: absolute;
top: 0;
`;

const Content = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: flex-end;
    padding-horizontal: 20px;
    justify-content: space-between;
    height: ${Layout.height / 3.5};
   
`;

const Column = styled.View`
   margin-left: 30px;
    `;

const Title = styled.Text`
color: ${TINT_COLOR};
font-size: 18px;
font-weight: 600;
margin-bottom: 10px;
`;

const Header = styled.View`
position: relative;
justify-content: flex-end;
`;

const MainContent = styled.view`
    padding-horizontal: 20px;
    margin-top: 25px;
`;

const Overview = styled.Text`
    color: ${TINT_COLOR};
    font-size: 12px;
    margin-bottom: 10px;
`;



const DetailPresenter = ({
    id,
    posterPhoto,
    backgroundPhoto,
    title,
    voteAvg,
    overview
                         }) =>(
    <Container>
       <Header>
           <BgImage source={{uri: makePhotoUrl(backgroundPhoto)}}/>
           <Content>
               <MoviePoster path={posterPhoto} />
               <Column>
                   <Title>{title}</Title>
                   <MovieRating inSlide={true} votes={voteAvg}/>
               </Column>
           </Content>
       </Header>
        <MainContent>
            {overview ? <Overview>{overview}</Overview> : null}
        </MainContent>
    </Container>
);


DetailPresenter.propTypes = {
    id:PropTypes.number.isRequired,
    posterPhoto: PropTypes.string.isRequired,
    backgroundPhoto: PropTypes.string,
    title: PropTypes.string,
    voteAvg: PropTypes.number,
    overview: PropTypes.string,
};

export default DetailPresenter;