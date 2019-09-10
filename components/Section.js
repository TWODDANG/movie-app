import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native'
import MovieItem from "./MovieItem";

const Container = styled.View`
margin-vertical : 20px;
`;
const ScrollView = styled.ScrollView`
    padding-left: 20px;
    `;
const Title = styled.Text`
    color: white;
    padding-left: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    `;


const Section = ({title, children, horizontal=true}) => (
    <Container>
        <Title>{title}</Title>
        <ScrollView horizontal={horizontal}>{children}</ScrollView>
    </Container>
);

Section.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    horizontal: PropTypes.bool,
    title: PropTypes.string.isRequired,
};

export default Section;