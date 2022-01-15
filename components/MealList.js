import React from 'react';
import MealItem from '../components/MealItem'
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

const MealList = props => {

    const favouriteMeals = useSelector(state => state.meals.favouriteMeals);

    const renderMealItem = itemData => {

        const isFavourite = favouriteMeals.find(meal => meal.id === itemData.item.id)

        return <MealItem 
        title={itemData.item.title} 
        image={itemData.item.imageUrl}
        duration={itemData.item.duration} 
        affordability={itemData.item.affordability}
        complexity={itemData.item.complexity}
        onSelectMeal={()=> {
            props.navigation.navigate({routeName: "MealDetails", params: {
                mealId: itemData.item.id,
                mealTitle: itemData.item.title
            }
        }
            )}}
        />
    }

    return (
        <View style={styles.list}>
        <FlatList 
        data={props.displayMeals} 
        keyExtractor={(item, index)=> item.id} 
        renderItem={renderMealItem} 
        style={styles.listItem}
    />
    </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listItem: {
        width: '100%'}

});


export default MealList;