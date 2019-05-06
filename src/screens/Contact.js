import React, { Component } from "react";
import { Linking, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Fab, Text, Button, Icon, Left, Body, H3, H1, Right, H2, View } from 'native-base';
import Footers from '../components/Footer'
import Headers from '../components/Header'

import { StyleSheet } from 'react-native'

export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            modalVisible: false,
            checkToken: false
        };

    }
    static navigationOptions = { header: null }

    render() {
        return (
            <Container>
                <Headers {...this.props} />
                <Container style={{ margin: 0, backgroundColor: '#e0e0e044', alignContent: 'center', justifyContent: "center" }} >
                    <Content>
                        <View style={{ flex: 1, alignContent: 'center', justifyContent: "center", padding: 10 }}>
                            <Card style={{ marginBottom: 60, padding: 10 }}>
                                <View style={{ flex: 1, padding: 10 }}>
                                    <H2 style={{
                                        color: '#727272',
                                        textAlign: 'center'
                                    }}>Contact Us</H2>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{
                                        color: '#727272',
                                        textAlign: 'center'
                                    }}>
                                        Use the following contact details to contact
                                us.{'\n'}
                                        We'll respond to your query as soon as possible.
                            </Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Icon name="old-phone" type="Entypo" style={{
                                        color: '#727272',
                                        margin: 10
                                    }} />
                                    <Text style={{
                                        textAlign: 'center', color: '#727272',
                                        fontSize: 16, flex: 2, margin: 10
                                    }}>
                                        021-37234069 | 03-123-123-786
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{
                                        color: '#727272',
                                        textAlign: 'center', fontSize: 16
                                    }}>
                                        Available 24 Hours
                                    </Text>
                                </View>
                                <View style={{
                                    color: '#727272',
                                    flexDirection: 'row', marginTop: 10
                                }}>
                                    <Icon name="address" type="Entypo" style={{
                                        color: '#727272',
                                        margin: 10
                                    }} />
                                    <Text style={{
                                        color: '#727272',
                                        textAlign: 'center', fontSize: 16, flex: 1, margin: 10
                                    }}>
                                        Address: Suite 06 Ground Floor Sasi Arcade Block 7 Clifton Karachi.
                            </Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Icon name="mail" type="Entypo" style={{
                                        color: '#727272',
                                        margin: 10
                                    }} />
                                    <Text style={{
                                        color: '#727272',
                                        textAlign: 'center', fontSize: 16, flex: 1, marginTop: 10
                                    }}>
                                        Email: emailleotech@gmail.com

                            </Text>
                                </View>

                                <View style={{
                                    color: '#727272',
                                    flexDirection: 'row', marginTop: 10
                                }}>
                                    <Icon name="link" type="Entypo" style={{
                                        color: '#727272',
                                        margin: 10
                                    }} />
                                    <Text style={{
                                        color: '#727272',
                                        textAlign: 'center', fontSize: 16, flex: 1, margin: 10
                                    }}>
                                        Follow us on:
                            </Text>
                                </View>

                                <View style={{ flex: 1, flexDirection: 'row' }}>

                                    <View style={{
                                        color: '#727272',
                                        flex: 1
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => Linking.openURL('https://instagram.com/leotech_official?utm_source=ig_profile_share&igshid=50uzqb1fqibg')}
                                            style={{
                                                color: '#727272',
                                                flexDirection: 'row', marginTop: 10,alignSelf: 'center'
                                            }}
                                        >
                                            <Icon name="logo-instagram" style={{
                                                color: '#727272',
                                                margin: 10
                                            }} />
                                        </TouchableOpacity>

                                    </View>

                                    <View style={{
                                        color: '#727272',
                                        flex: 1
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => Linking.openURL('https://www.facebook.com/leotechpk/')}
                                            style={{
                                                color: '#727272',
                                                flexDirection: 'row', marginTop: 10,alignSelf: 'center'
                                            }}
                                        >
                                            <Icon name="logo-facebook" style={{
                                                color: '#727272',
                                                margin: 10
                                            }} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{
                                        color: '#727272',
                                        flex: 1
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => Linking.openURL('https://www.facebook.com/leotechpk/')}
                                            style={{
                                                color: '#727272',
                                                flexDirection: 'row', marginTop: 10,alignSelf: 'center'
                                            }}
                                        >
                                            <Icon name="logo-youtube" style={{
                                                color: '#727272',
                                                margin: 10
                                            }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Card>
                        </View>

                    </Content>

                </Container>
                <Footers {...this.props} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0C1937'
    },
    headerText: {
        color: 'white',
        flex: 1,
        flexDirection: 'row',
        padding: 12,
        fontWeight: '500'
    }
});