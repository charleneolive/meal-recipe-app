import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { enableScreens } from 'react-native-screens';
import MealsNavigator from './navigation/MealsNavigator'; 
import mealsReducer from './store/reducers/meals';

enableScreens();
const rootReducer = combineReducers({
  meals: mealsReducer
});
const store = createStore(rootReducer);

export default function App() {

  let [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if (!fontsLoaded) {
    return <AppLoading/>
  }
  return <Provider store={store}><MealsNavigator /></Provider>
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
