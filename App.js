import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import SCREENS from './screens'
import MainList from './src/screens/MainList';

const Stack = createStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="animations" component={MainList} options={{ headerShown: true }} />
                {SCREENS.map(({ name, component }) =>
                    <Stack.Screen key={name} {...{name, component}} />)
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}