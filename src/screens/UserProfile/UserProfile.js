import { Text, View, TouchableOpacity } from "react-native-web";
import React, {Component} from "react";
import { db, auth } from "../../firebase/config";

class UserProfile extends Component{
    constructor(props){
        super(props)
        this.state = {
            datosDelUser: {},
            id: '',
        }
    }

    componentDidMount(){
        db.collection('users')
        .where('email', '==', this.state.usuario)
        .onSnapshot(doc => {
            doc.forEach(doc => this.setState({
            id: doc.id,
            datosUsuario: doc.data()
            })) 
        })
        this.setState({
            loading: false
        })}

    render(){
        return(
            <>
                <h1>HOLA PERFIL DEL USER</h1>
            </>
        )
    }
}

export default UserProfile