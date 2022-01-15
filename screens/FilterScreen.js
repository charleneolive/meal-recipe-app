import React, {useState, useEffect, useCallback} from 'react'
import { View, Text, StyleSheet, Switch, Platform } from 'react-native'
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals';


const FilterSwitch = (props) => {
    return(
    <View style={styles.filterContainer}>
        <Text>{props.filter}</Text>
        <Switch 
        trackColor={{true:Colors.primaryColor}}
        thumbColor={Platform.OS==='android'? Colors.primaryColor: ''}
        value={props.state} 
        onValueChange={newValue => props.setState(newValue)}/>
    </View>
    )
}

const FilterScreen = (props) => {
    const {navigation} = props
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);

    const dispatch = useDispatch();

    // cached by React and only recreated when dependencies change
    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            isVegetarian: isVegetarian      
        };
        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch])

    // run use Effect only when the component saveFilters rebuild as props change
    useEffect(()=> {
        navigation.setParams({save: saveFilters});
    }, [saveFilters])

    return (
        <View style={styles.screen}>
            <Text style={styles.title} >The Filter Screen!</Text>
            <FilterSwitch filter='Gluten-Free' state ={isGlutenFree} setState={setIsGlutenFree}/>
            <FilterSwitch filter='Vegetarian' state ={isVegetarian} setState={setIsVegetarian}/>
            <FilterSwitch filter='Vegan' state ={isVegan} setState={setIsVegan}/>
            <FilterSwitch filter='Lactose-Free' state ={isLactoseFree} setState={setIsLactoseFree}/>
        </View>
    )

}

FilterScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "Filters",
        headerLeft:( 
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Menu' 
            iconName='ios-menu' 
            onPress = {()=> {
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>),
        headerRight:(<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Save' 
            iconName='ios-save' 
            // read param in screen component
            onPress = {navData.navigation.getParam('save')}/>
        </HeaderButtons>)
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10

    }
});

export default FilterScreen;