import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import CameraScreen from './src/screens/CameraScreen';
//import Example from './src/screens/Example';
import { init, query } from './src/heplers/db';

const Stack = createStackNavigator();

function App() {

  init()
    .then(success => { 
      //console.log(success) 
    })
    .catch(error => { 
      ///console.log(error) 
    })

   // const sql = 'DELETE FROM place';
    // const sql = 'SELECT * FROM place';
    // query(sql)
    // .then(result => { 
    //   console.log(result) 
    // })
    // .catch(
    //   error => { console.log(error) })

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Example" component={Example} /> */}
        <Stack.Screen name="Home" component={HomeScreen} initialParams={{refresh: 0}} options={{ title: 'Lista dodanych punktów' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Podgląd' }} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Dodaj nowy punkt' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;