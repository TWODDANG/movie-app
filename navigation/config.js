import {createStackNavigator} from "react-navigation";
import {BG_COLOR, TINT_COLOR} from "../constants/Colors";
//movie app: https://api.themoviedb.org/3/movie/550?api_key=1dd12302f27c8e81f9213ab38b8723de
export const headerStyles = {
    headerStyle: {
        backgroundColor: BG_COLOR,
        borderBottomWidth: 0,
    },
    headerTitleStyle : {
        color: TINT_COLOR
    },
    headerTintColor: TINT_COLOR
};

export const createStack = (screen, title) => createStackNavigator({
    Screen: {
        screen,
        navigationOptions: {
            title,
            ...headerStyles
        }
    }
});

