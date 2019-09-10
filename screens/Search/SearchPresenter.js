import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components/native'
import {BG_COLOR, GREY_COLOR} from "../../constants/Colors";
import Layout from "../../constants/Layout";
import Loader from "../../components/Loader";
import Section from "../../components/Section";
import MovieItem from "../../components/MovieItem";
import {Animated, Linking} from 'react-native';



const Container = styled.View`
  flex: 1;
  background-color: ${BG_COLOR};
`;

const InputContainer = styled.View`
    align-items: center;
    margin-vertical : 20px;
`;

const Input = styled.TextInput`
    background-color: rgba(255, 255, 255, 1);
    width: ${Layout.width/1.3};
    border-radius: 20px;
    padding: 10px;
`;

const SearchResults = styled.ScrollView`
    margin-top: 20px;
`;

const Text = styled.Text`
color: white;
font-weight: 700;
text-align: center;
font-size: 20px;
font-style: italic;
padding: 10px;
margin-bottom: 30px;
`;

const TextView = styled.View`
padding: 20px;
`;


const SearchPresenter = ({
                             loading,
                             tvResults,
                             searchTerm,
                             movieResults,
                             handleSearchUpdate,
                             onSubmitEditing,
                             fade,
                             fade2,
                             fade3

                         }) => {

  return (<Container>
      <InputContainer>
          <Input
              onChangeText={handleSearchUpdate}
              value={searchTerm}
              returnKeyType={"search"}
              placeholder = 'Search 2dd/영어 검색만 가능'
              placeholderTextColor={GREY_COLOR}
              onSubmitEditing={onSubmitEditing}
          />
      </InputContainer>
      <SearchResults>
          {loading ? <Loader/> : (
              <>
                  {movieResults ? (
                      movieResults.length > 0 ? (
                          <Section title={'Movie Results'}>
                              {movieResults
                                  .filter(movie=>movie.poster_path !== null)
                                  .map(movie => <MovieItem
                                      key={movie.id}
                                      posterPhoto={movie.poster_path}
                                      voteAvg={movie.vote_average}
                                      id={movie.id}
                                      title={movie.title}
                                  />)}
                          </Section>
                      ) : <TextView><Text>영화가 없어요:)</Text></TextView>
                  ) : <Animated.View style={{opacity :fade}}>
                      <TextView>
                          <Text>이댕댕 무비 서처 :)</Text>
                      </TextView>
                      </Animated.View>

                   }
                  {tvResults ? (
                      tvResults.length > 0 ? (
                          <Section title="TV Results">
                              {tvResults
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
                      ) : (<TextView><Text>티비 프로그램이 없어요:)</Text></TextView>)
                  ) : (<Animated.View style={{opacity :fade2}}>
                          <TextView>
                              <Text>{`\n이댕댕 스튜디오 RN 프로젝트: \n 19년 7월~19년 9월\n`} </Text>
                          </TextView>

                      </Animated.View>
                  )
                  }
                  {tvResults ? null : (
                      <Animated.View style={{opacity :fade3}}>
                          <TextView>
                              <Text style={{color: '#00ffff'}}
                                    onPress={() => Linking.openURL('http://2dd.kr')}>
                                  http://2dd.kr
                              </Text>
                              <Text>
                                  위 링크를 눌러 개인 홈페이지를 방문해보세요! @-@
                              </Text>
                          </TextView>
                      </Animated.View>
                  )
                  }

              </>
          ) }
      </SearchResults>
  </Container>)
};

SearchPresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    tvResults: PropTypes.array,
    movieResults: PropTypes.array,
    searchTerm: PropTypes.string,
    handleSearchUpdate: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func.isRequired
};

export default SearchPresenter;