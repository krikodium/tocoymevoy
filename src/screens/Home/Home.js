import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import {db} from '../../firebase/config' //base de dat


class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            losPosteos: []
        }
    }
    
    render(){
        return(
            <>
                <h1>HPOLA HOME</h1>
            </>
        )
    }
}

export default Home

