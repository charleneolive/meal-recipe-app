import React, { useEffect, useCallback } from 'react'
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native'
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import CustomHeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavourite } from '../store/actions/meals'

const ListItem = props => {
    return <View style={styles.ListItem}>
        <DefaultText>{props.children}</DefaultText>
    </View>
}

const MealDetailsScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals)
    const mealId = props.navigation.getParam('mealId');
    const selectedMeal = availableMeals.find(meal => meal.id === mealId);
    const currentMealIsFavourite = useSelector(state => state.meals.favouriteMeals.some(meal => meal.id === mealId))

    const dispatch = useDispatch(); // trigger a state change

    const toggleFavouriteHandler = useCallback(() => {
        dispatch(toggleFavourite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({toggleFav: toggleFavouriteHandler});

    }, [toggleFavouriteHandler])

    useEffect(() => {
        props.navigation.setParams({isFav: currentMealIsFavourite});
    }, [currentMealIsFavourite])    

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} /> 
            <View style={styles.details}>
                    <DefaultText>{selectedMeal.duration}m</DefaultText>
                    <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                    <DefaultText>{selectedMeal.affordability}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient => <ListItem key={ingredient}>{ingredient}</ListItem>)}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step => <ListItem key={step}>{step}</ListItem>)}
        </ScrollView>
    )


}

// const mealId = props.navigation.getParam('mealId');

MealDetailsScreen.navigationOptions = (navigationData) => {
    // const mealId = navigationData.navigation.getParam('mealId');
    const toggleFavourite = navigationData.navigation.getParam('toggleFav');
    const isFavourite = navigationData.navigation.getParam('isFav');
    // const selectedMeals = MEALS.find(meal => meal.id === mealId);
    const mealTitle = navigationData.navigation.getParam('mealTitle')
    return {
        headerTitle: mealTitle,
        // headerRight: <Text>FAV!</Text>
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title='favourite' 
                    iconName={isFavourite ? 'ios-star' : 'ios-star-outline'}
                    onPress = {toggleFavourite}/>
                </HeaderButtons>
    }
         
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    ListItem: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});

export default MealDetailsScreen;