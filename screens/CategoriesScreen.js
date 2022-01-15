import React from 'react'
import {
    View, 
    FlatList, 
    StyleSheet, 
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { CATEGORIES } from '../data/dummy-data'
import HeaderButton from '../components/HeaderButton'
import CategoryGridTile from '../components/CategoryGridTile'


const CategoriesScreen = props => {
// new route is pushed on top of the stack  
    const renderGridItem = (itemData) => {
        return ( <CategoryGridTile
            title={itemData.item.title} 
            color={itemData.item.color}
            onSelect={()=> {
                props.navigation.navigate({routeName: "CategoryMeals", params: {
                    categoryId: itemData.item.id
                }
            }
                )}} />
        
        )
        

    };

    return (
        <View>
        <FlatList 
            keyExtractor={(item,id) => item.id} 
            data={CATEGORIES} 
            renderItem={renderGridItem} 
            numColumns={2} 
        /> 
        </View>

    )

}

CategoriesScreen.navigationOptions = (navData) => {
    return {
    headerTitle: "Meal Categories",
    headerLeft: 
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title='Menu' 
        iconName='ios-menu' 
        onPress = {()=> {
            navData.navigation.toggleDrawer();
        }}/>
    </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: 'hidden'
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 3,
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: 'right'
    }
});

export default CategoriesScreen;

