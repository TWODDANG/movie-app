import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator, createAppContainer, createStackNavigator} from "react-navigation";
import MovieScreen from '../screens/Movies';
import TVScreen from "../screens/TV";
import SearchScreen from "../screens/Search";
import {BG_COLOR} from "../constants/Colors";
import TabBarIcon from "../components/TabBarIcon";
import {createStack} from "./config";



const TabNavigation = createBottomTabNavigator(
    {
        Movie: {
            screen: createStack(MovieScreen, '같이 영화봐요'),
            navigationOptions : {
                tabBarIcon: ({focused}) => (
                    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-film' : 'md-film'}/>
                )
            }
        },
        TV: {
            screen: createStack(TVScreen, '바보상자_뗄레비전'),
            navigationOptions : {
                tabBarIcon: ({focused}) => (
                    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-tv' : 'md-tv'}/>
                )
            }
        },
        Search : {
            screen: createStack(SearchScreen, '검색'),
            navigationOptions : {
                tabBarIcon: ({focused}) => (
                    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}/>
                )
            }
        },
    },
    {
        tabBarOptions: {
            showLabel: false,
            style: {
                backgroundColor: BG_COLOR
            }
        }
    }
);

export default createAppContainer(TabNavigation);