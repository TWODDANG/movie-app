import React from "react";
import SearchPresenter from "./SearchPresenter";
import {movies, tv} from "../../api";
import {Animated} from "react-native";

export default class extends React.Component {
    state = {
        loading: false,
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        fade: new Animated.Value(1),
        fade2: new Animated.Value(0),
        fade3: new Animated.Value(0),
        error: null,
    };

    handleSearchUpdate = text => {
        this.setState({
            searchTerm: text
        });
    };

    componentWillMount() {

       Animated.sequence([
           Animated.timing(
               this.state.fade2,
               {
                   toValue: 1,
                   duration: 900,
                   useNativeDriver: true
               }
           ),
           Animated.timing(
               this.state.fade3,
               {
                   toValue: 1,
                   duration: 900,
                   useNativeDriver: true
               }
           ),
           Animated.timing(
               this.state.fade,
               {
                   toValue: 0,
                   duration: 2000,
                   useNativeDriver: true
               }
           ),
           Animated.timing(
               this.state.fade2,
               {
                   toValue: 0,
                   duration: 3000,
                   useNativeDriver: true
               }
           ),
           Animated.timing(
               this.state.fade3,
               {
                   toValue: 0,
                   duration: 3000,
                   useNativeDriver: true
               }
           )
       ]).start();
    }

    onSubmitEditing = async() => {
        const {searchTerm} = this.state;
        if(searchTerm !== ""){
            let movieResults, tvResults, error;
            this.setState({
                loading: true
            });
            try{
                ({
                    data: {results: movieResults}
                } = await movies.searchMovies(searchTerm));
                ({
                    data: {results: tvResults}
                } = await tv.searchTv(searchTerm));

            } catch {
                error=`Can't Search`
            } finally {
                this.setState({
                    loading: false,
                    movieResults,
                    tvResults,
                    error
                })
            }
        }
        return;
    };

    render() {
        const { loading, movieResults, tvResults, searchTerm, fade, fade2, fade3 } = this.state;
        return (
            <SearchPresenter
                loading={loading}
                movieResults={movieResults}
                tvResults={tvResults}
                searchTerm={searchTerm}
                handleSearchUpdate={this.handleSearchUpdate}
                onSubmitEditing={this.onSubmitEditing}
                fade={fade}
                fade2={fade2}
                fade3={fade3}
            />
        );
    }
}