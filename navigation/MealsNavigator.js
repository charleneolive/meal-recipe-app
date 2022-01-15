import { Platform, Text } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {createAppContainer } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailsScreen from '../screens/MealDetailsScreen'
import FilterScreen from '../screens/FilterScreen'
import Colors from '../constants/Colors'
import FavouritesScreen from '../screens/FavouritesScreen'
import { createDrawerNavigator } from 'react-navigation-drawer';

// identifier: value 
// value sis a pointer to the categories screen

const defaultConfig = {
    // mode: 'modal',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS == 'android' ? 'white' : Colors.primaryColor
    }
    }
const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    
    CategoryMeals: {
        screen: CategoryMealsScreen
    }, 
    MealDetails: {
        screen: MealDetailsScreen
    }

    
}, defaultConfig
);

const FavNavigator = createStackNavigator({
    Favourites: FavouritesScreen,
    MealDetails: MealDetailsScreen,
    
}, defaultConfig
)

const tabScreenConfig = {
    Meals: {screen: MealsNavigator, navigationOptions: {
        tabBarLabel: Platform.OS === 'android' ?  <Text style={{fontFamily:'open-sans-bold'}}>Meals</Text>: 'Meals',
        tabBarIcon: (tabInfo)=> {
            return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor}/>
        }
    }},
    Favourites: {screen: FavNavigator, navigationOptions: {
        tabBarLabel: Platform.OS === 'android' ?  <Text style={{fontFamily:'open-sans-bold'}}>Favourites</Text>: 'Favourites',
        tabBarIcon: (tabInfo) => {
            return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
        }
    }
}
}

const MealsFavTabNavigator =  Platform.OS==='android' 
? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: Colors.accentColor,
    shifting: true
})
: createBottomTabNavigator(tabScreenConfig,{
    tabBarOptions:{
        labelStyle:{
            fontFamily: 'open-sans-bold'
        },
        activeTintColor: Colors.accentColor
        
    }
});

const FiltersNavigator = createStackNavigator({
    Filters: FilterScreen
}, {
    defaultConfig
})

const MainNavigator = createDrawerNavigator({
    MealFavs: {screen: MealsFavTabNavigator, navigationOptions: {drawerLabel: 'Meals'}},
    Filters: FiltersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
})

export default createAppContainer(MainNavigator);
