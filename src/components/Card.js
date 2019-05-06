import React, { Component } from "react";
import { Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right, H2, View } from 'native-base';

// import { StyleSheet } from "react-native";

export default class DashboardCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static navigationOptions = { header: null }


    render() {
        const { title, catagory, price, discount, brand, details, itemId, img } = this.props.val;
        return (
            <Card style={{ flex: 0, margin: 10, elevation: 10 }}>
                <CardItem>
                    <Body>
                        <Image source={{ uri: img }} style={{ height: 200, flex: 1, width: '100%' }} />
                    </Body>
                </CardItem>
                <CardItem>

                    <H2>{title}</H2>

                </CardItem>
                <CardItem>
                    <Left>
                        <Body>
                            <Text note style={{ fontSize: 17 }}>
                                Price: {price}
                            </Text>
                        </Body>
                    </Left>
                    <Right>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ alignItems: "flex-end" }}>
                            </View>
                            <View style={{ alignItems: "flex-start" }}>
                                <Button transparent
                                    textStyle={{ color: '#87838B' }}
                                    onPress={() => this.props.navigation.navigate('ProductDetails',
                                        {
                                            itemId: itemId,
                                            title: title,
                                            price: price,
                                            discount: discount,
                                            brand: brand,
                                            details: details,
                                            catagory: catagory,
                                            img: img
                                        })}>
                                    <Icon name="info-outline"
                                        type="MaterialIcons"
                                        style={{ fontSize: 30, color: 'blue' }}
                                    ></Icon>
                            </Button>
                            </View>
                            <View style={{ alignItems: "flex-end" }}>
                                <Button transparent textStyle={{ color: 'red' }}>
                                    <Icon name="heart-o" type="FontAwesome" style={{ fontSize: 30, color: 'red' }} />
                                </Button>
                            </View>
                            <View style={{ alignItems: "flex-start" }}>
                                <Button transparent textStyle={{ color: 'green' }}>
                                    <Icon name="cart-plus" type="FontAwesome" style={{ fontSize: 30, color: 'green' }} />
                                </Button>
                            </View>
                        </View>
                    </Right>
                </CardItem>
            </Card>


        );
    }
}

// const styles = StyleSheet.create({
//     header: {
//         backgroundColor: '#0C1937'
//     },
//     headerText: {
//         color: 'white',
//         flex: 1,
//         flexDirection: 'row',
//         padding: 12,
//         fontWeight: '500'
//     }
// });

