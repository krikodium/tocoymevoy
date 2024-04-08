import { View, Text , StyleSheet} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../screens/Home/Home'
import {FontAwesome} from '@expo/vector-icons'
import UserProfile from '../screens/UserProfile/UserProfile'


const Tab = createBottomTabNavigator()

export default function TabNavigation(){
    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} options={{tabBarIcon: ()=> <FontAwesome name='home' color={'black'} size={35}/>, headerShown: false}}/>
            <Tab.Screen name='Profile' component={UserProfile} options={{tabBarIcon: ()=> <FontAwesome name='user' color={'black'} size={35}/>, headerShown: false}}/>
        </Tab.Navigator>
    )
}