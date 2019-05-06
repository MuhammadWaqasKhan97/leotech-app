import React, { Component } from "react";
import Login from './Login';
import Signup from './Signup';
import Footers from '../../components/Footer'
import Headers from '../../components/Header'

import { View } from 'react-native'

export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signup: false
        };
        console.log(props);
    }

    toggle() {
        this.setState({ signup: !this.state.signup })
    }

    signedIn() {
        // this.props.signedIn()
        // can send data to redux here
        this.props.navigation.navigate("Home");

    }

    render() {
        const { signup } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Headers {...this.props} />
                <View style={{marginBottom: 60, flex: 1}}>
                    {
                        !signup ? <Login toggle={() => this.toggle()} signedIn={() => this.signedIn()} /> : <Signup toggle={() => this.toggle()} />
                    }
                </View>

                <Footers {...this.props} active={'account'} />

            </View>
        );
    }
}
