import React from "react";
import { Image } from "react-native";
import { connect } from 'react-redux'
import { removeUser } from '../Redux/action/autjAction'
import { Container, Content, Text, List, ListItem, Icon, Button, View } from "native-base";
const routes = ["Home", "MyCart", "WishList", "Popular", "NewProducts", "LeoWorld", "Contact", "About"];
class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }
    componentWillReceiveProps(props) {
        if (props.user && props.user.first_name !== "") {
            this.setState({ user: props.user });
        }
        else {
            this.setState({ user: null });
        }
    }
    componentWillMount() {
        if (this.props.user && this.props.user.first_name !== "") {
            this.setState({ user: this.props.user });
        }
        else {
            this.setState({ user: null });
        }
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#fff' }}>
                <Content >
                    <Content

                        style={{
                            backgroundColor: '#e0e0e044',
                            a5lignContent: 'center'
                        }}>
                        <Image
                            circle
                            style={{
                                height: 100, width: 100, marginLeft: 10, marginBottom: 10
                            }}
                            source={require('../../assets/ic_launcher.png')}
                        />
                        {(this.props.user && this.props.user !== undefined) ? (<Content>
                            <View style={{flexDirection: 'row', paddingLeft: 10, paddingRight: 10}}>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <Text style={{color: '#222', fontSize: 24}}>{this.state.user.first_name} {this.state.user.last_name}</Text>
                                </View>
                                <View style={{flex: 1, alignItems: "flex-end"}}>
                                    <Button
                                    transparent
                                    style={{ alignSelf: "flex-end", margin: 5}}
                                     onPress={() => {
                                        this.props.navigation.navigate("Home");
                                        this.props.removeUser();
                                    }}>
                                        <Icon name='logout' type='MaterialCommunityIcons' style={{color: '#222'}}
/>
                                    </Button>
                                </View>
                            </View>

                        </Content>) : (null)}
                    </Content>


                    <List
                        style={{
                            flex: 5
                        }}
                        dataArray={routes}
                        renderRow={data => {
                            let icon;
                            let auth = true;
                            let iconType = 'MaterialIcons'
                            let title;
                            let iconColor;
                            if (data === "Home") {
                                icon = 'home'
                                title = 'Home';
                                iconColor = '#3498db'
                            }
                            else if (data === "LeoWorld") {
                                icon = 'plane'
                                title = 'Leo World';
                                iconType = 'FontAwesome'
                                iconColor = '#3498db'
                            }
                            else if (data === "MyCart") {
                                icon = 'shopping-cart'
                                title = 'My Cart'
                                iconColor = '#3498db'
                            }
                            else if (data === "WishList") {
                                icon = 'heart';
                                iconType = 'MaterialCommunityIcons'
                                title = 'Wish List'
                                iconColor = '#3498db'
                            }
                            else if (data === "NewProducts") {
                                icon = 'burst-sale';
                                iconType = 'Foundation';
                                title = 'New Products'
                                iconColor = '#3498db'
                            }
                            else if (data === "Popular") {
                                icon = 'star-outlined';
                                iconType = 'Entypo';
                                title = 'Popular'
                                iconColor = '#3498db'


                            }
                            else if (data === "Contact") {
                                icon = 'md-contacts';
                                iconType = 'Ionicons';
                                title = 'Contact'
                                iconColor = '#3498db'
                            }
                            else if (data === "About") {
                                icon = 'information-outline';
                                iconType = 'MaterialCommunityIcons';
                                title = "About"
                                iconColor = '#3498db'
                            }
                           
                            return (
                                <ListItem
                                    button
                                    bordered
                                    transparent
                                    style={{ marginRight: 20, margin: 0, padding: 0 }}
                                    onPress={() => this.props.navigation.navigate( data)}>
                                    <Icon active name={icon} type={iconType} style={{ color: iconColor, fontSize: 18 }} />
                                    <Text style={{ color: '#222', fontSize: 16, marginLeft: 20 }}>{title}</Text>
                                </ListItem>
                            );
                        }}
                    />
                </Content>
            </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)


