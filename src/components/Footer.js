import React, { Component } from "react";
import { Text, Button, Icon, Footer, FooterTab, View } from 'native-base';
import { removeUser } from '../Redux/action/autjAction'
import { connect } from 'react-redux'

import { Dimensions } from 'react-native'
let { height, width } = Dimensions.get('window');

class Footers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: false,
            modalVisible: false,
            checkToken: false
        };

    }
    componentWillMount() {
        if (this.props.user && this.props.user !== undefined) {
            this.setState({ user: true });
        }
        else {
            this.setState({ user: false });

        }
    }
    componentWillReceiveProps(props) {
        if (props.user && props.user !== undefined) {
            this.setState({ user: true });

        }
        else {
            this.setState({ user: false });
        }
        // alert("bottom tab got updates!!");
    }
    static navigationOptions = { header: null }

    render() {
        console.log('footer', this.props)
        let { user } = this.state;
        return (
            <View style={{
                position: 'absolute',
                left: 0,
                top: height - 80,
                width: width,
            }}>

                <Footer>
                    <FooterTab style={{
                        backgroundColor: '#F8F8F8',
                        borderTopWidth: 1,
                        borderTopColor: '#20000021'
                    }}>
                        <Button
                            onPress={() => this.props.navigation.navigate("Home")}>
                            <Icon name='ios-home' style={this.props.active === 'home' ? { color: '#727272' } : { color: '#3498db' }} />
                            <Text style={this.props.active === 'home' ? { color: '#727272' } : { color: '#3498db' }}>Home</Text>
                        </Button>
                        <Button
                            onPress={() => this.props.navigation.navigate("WishList")}>
                            <Icon name='ios-heart' style={this.props.active === 'wishList' ? { color: '#727272' } : { color: '#3498db' }} />
                            <Text style={this.props.active === 'wishList' ? { color: '#727272' } : { color: '#3498db' }}>Wish List</Text>

                        </Button>
                        <Button
                            onPress={() => this.props.navigation.navigate("Search")}>
                            <Icon name='ios-search' style={this.props.active === 'search' ? { color: '#727272' } : { color: '#3498db' }} />
                            <Text style={this.props.active === 'search' ? { color: '#727272' } : { color: '#3498db' }}>Search</Text>
                        </Button>
                        <Button
                            onPress={() => {
                                if (!user) {
                                    this.props.navigation.navigate("Auth")

                                }
                                else {
                                    this.props.navigation.navigate("Account");
                                }
                            }
                            }>
                            <Icon name='ios-person' style={this.props.active === 'account' ? { color: '#727272' } : { color: '#3498db' }} />
                            <Text style={this.props.active === 'account' ? { color: '#727272' } : { color: '#3498db' }}>Account</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducers.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeUser: (user) => dispatch(removeUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footers);
