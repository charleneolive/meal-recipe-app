import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import MealList from '../components/MealList';
// import { CATEGORIES, MEALS } from '../data/dummy-data';
import { useSelector } from 'react-redux';

const FavouritesScreen = props => {
    // const catId = 'c1';

    const favMeals = useSelector(state => state.meals.favouriteMeals)

    if (favMeals.length === 0 || !favMeals) {
        return <View style={styles.content}>
            <Text> No favourite meals found. Start adding some! </Text>
        </View>
    }

    const displayMeals = favMeals

    return (
        
        <MealList displayMeals={displayMeals} navigation= {props.navigation} />
    )

}

FavouritesScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: "Your Favourites"
    };
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FavouritesScreen;