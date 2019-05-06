import React, { Component } from "react";
import { Header, Button, Icon, H1, View, } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'react-native'
class Headers extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    static navigationOptions = { header: null }

    render() {
        console.log('header',this.props)
        return (
            <View>
                <Header style={[styles.header, !this.props.noBorder ? styles.headerBorder : null]} hasTabs>
                    <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                        <Icon active name="dehaze" type="MaterialIcons" style={styles.headerIcons} />
                    </Button>
                    <H1 style={styles.headerText}>Leo Tech</H1>
                    <Button transparent onPress={() => {
                        this.props.navigation.navigate('MyCart');
                    }}>
                        <Icon active name="cart" type="MaterialCommunityIcons" style={styles.headerIcons} />
                    </Button>
                </Header>
            </View>

        );
    }
}


const styles = EStyleSheet.create({
    text: {
        padding: '0.5rem',
        fontSize: '1.5rem',
    },
    header: {
        backgroundColor: '#fff',
    },
    headerBorder: {
        borderBottomWidth: 2,
        borderBottomColor: '#20000021'
    },
    headerText: {
        color: '#727272',
        flex: 1,
        flexDirection: 'row',
        paddingTop: '0.6rem',
        fontWeight: '500',
        fontSize: '1.3rem',
    },
    headerIcons: {
        fontSize: '1.3rem',
        color: '#727272'
    },
});

export default Headers;
