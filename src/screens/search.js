import React, { Component } from "react";
import { ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { Container, Input, Header, Item, Content, Card, Text, Button, Icon, H3, View } from 'native-base';
import { FlatGrid } from 'react-native-super-grid';
import AwesomeAlert from 'react-native-awesome-alerts';
import Footers from '../components/Footer'
import Headers from '../components/Header'
import { updateCart } from '../Redux/action/cartAction'
import { updateWish } from '../Redux/action/wishAction'
import { updateProduct } from '../Redux/action/productAction'
import { connect } from 'react-redux'

import { StyleSheet } from 'react-native'

let { height, width } = Dimensions.get('window');
let op = width / 3.3;
let op1 = width / 2.7;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productsToShow: [],
            str: "",
            showAlert: false,


        };
        this.search = this.search.bind(this);
    }
    search(text) {

        this.setState({ str: text, productsToShow: [] }, (() => {
            if (this.state.str === "") {
                this.setState({ productsToShow: [] })
            }
            else {
                let arr = [];
                this.state.products.forEach((p) => {
                    if ((p.name.toLowerCase().indexOf(text.toLowerCase()) !== -1)
                    ) {
                        arr.push(p);
                    }
                })
                this.setState({ productsToShow: arr }, () => {
                    //  console.log("products to show....",this.state.productsToShow)
                })
            }
            // alert(this.state.str)

        }
        ))
    }
    addToCart(e) {
        if (this.props.cart) {
            let old_cart = this.props.cart;
            console.log("old cart....", old_cart)
            let found = false;
            old_cart.forEach((c) => {
                if (c.product_id === e.id) {
                    found = true;
                    c.quantity = c.quantity + 1
                }
            });
            if (!found) {
                old_cart.push({ product_id: e.id, quantity: 1 });
            }
            console.log("old cart updated....", old_cart)
            let arr = [...old_cart]
            this.props.updateCart(arr)
            this.showAlert();
        }
        else {
            let arr = [
                {
                    product_id: e.id,
                    quantity: 1
                }
            ]
            this.props.updateCart(arr)
            this.showAlert();
        }

    }


    addToWishList(e) {
        if (this.props.wish) {
            let old_wish = this.props.wish;
            let found = false;
            console.log("old_wish...", old_wish);
            old_wish.forEach((w) => {
                if (w.product_id === e.id) {
                    found = true;
                }
            });
            if (!found) {
                let arr = [
                    ...this.props.wish,
                    ...[{
                        product_id: e.id,
                    }]
                ]
                this.props.updateWish(arr);
            }
            this.showAlert()


        }
        else {
            let arr = [
                {
                    product_id: e.id,
                }
            ]
            this.props.updateWish(arr);
            this.showAlert()
        }
    }


    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };


    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };


    componentDidMount() {
        if (this.props.Products && this.props.Products !== undefined) {
            this.setState({ products: this.props.Products });
        }
    }
    componentWillReceiveProps(props) {
        if (props.Products && props.Products !== undefined) {
            this.setState({ products: props.Products });
        }
    }
    static navigationOptions = { header: null }

    render() {
        const { productsToShow, showAlert } = this.state;
        return (
            <Container>
                <Headers {...this.props} noBorder={true}/>
                <Header searchBar rounded style={styles.header}>
                    <Item regular>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" onChangeText={(text) => {
                            this.search(text)
                        }} />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>

                <Container style={{ margin: 0, backgroundColor: '#e0e0e044', marginBottom: 60 }} >
                    <Content>
                        {productsToShow.length >= 1 ? (

                            <View>

                                <FlatGrid
                                    itemDimension={op1}
                                    items={productsToShow}
                                    style={styles.gridView}
                                    // fixed
                                    renderItem={({ item, index }) => (


                                        <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate("ProductDetails", {
                                            obj: item,
                                        })}>
                                            <Card style={{ flex: 0, margin: 1, elevation: 5, padding: 1 }}>
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    <View style={{
                                                        flex: 2.5, flexDirection: 'row'
                                                    }}>
                                                        <View style={{ flex: 1, flexDirection: 'column' }}>
                                                            <ImageBackground source={{ uri: item.images[0].src }} style={[styles.cardImg]} >
                                                            </ImageBackground>

                                                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                                                <View style={{ flexDirection: 'row', margin: 1 }}>
                                                                    <H3 style={styles.cardTitle}>{item.name}</H3>
                                                                </View>
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Text> Rs. </Text>
                                                                    <Text style={[styles.cardTitle, (item.price === item.sale_price && { textDecorationLine: 'line-through' })]} > {item.regular_price} </Text>

                                                                    {
                                                                        (item.price === item.sale_price) && (item.sale_price !== "") && <Text note style={styles.cardTitle}> - {item.sale_price}</Text>
                                                                    }
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        flex: 1, flexDirection: 'column',
                                                        alignItems: 'center'
                                                    }}>

                                                        <View>
                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                <TouchableOpacity
                                                                    style={[styles.cardBtn]}
                                                                    onPress={() => this.addToCart(item)}
                                                                    success>
                                                                    <Icon name="cart-plus" type="FontAwesome" style={[styles.cardIcons, { color: 'green' }]} />
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                <TouchableOpacity
                                                                    style={[styles.cardBtn]}
                                                                    onPress={() => this.addToWishList(item)}
                                                                    danger
                                                                >
                                                                    <Icon name="heart" type="FontAwesome" style={[styles.cardIcons, { color: 'red' }]} />
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                <TouchableOpacity
                                                                    style={[styles.cardBtn]}
                                                                    onPress={() => this.props.navigation.navigate("ProductDetails", {
                                                                        obj: item,
                                                                    })}
                                                                    block>
                                                                    <Icon name="info" type="FontAwesome" style={[styles.cardIcons, { color: 'blue' }]} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </Card>
                                        </TouchableOpacity>
                                    )} />
                            </View>
                        ) : (
                                <View style={{ marginTop: '50%', flex: 1 }}>
                                    <Text style={{ alignSelf: 'center' }}>Nothing To Show</Text>
                                </View>
                            )}
                    </Content>
                </Container>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Item Added Successfully!"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={true}
                    showConfirmButton={true}
                    confirmText="Ok"
                    confirmButtonColor="#DD6B55"
                    onConfirmPressed={() => {
                        this.hideAlert()
                    }}
                />
                <Footers {...this.props} active={'search'} />

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#20000021'
    },
    headerText: {
        color: '#fff',
        flex: 1,
        flexDirection: 'row',
        padding: 12,
        fontWeight: '500'
    },
    gridView: {
        marginTop: 20,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 3,
        padding: 10,
        height: 200,
        borderWidth: 2,
        // borderColor: 'grey'
    },
    itemName: {
        fontSize: 16,
        color: '#222',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#222',
    },
    text: {
        padding: '0.5rem',
        fontSize: 16
    },


    cardTitle: {
        fontSize: 12,
        padding: 0,
        margin: 0,
        fontWeight: '400',
    },
    cardPrice: {
        fontSize: 8,
    },
    cardIcons: {
        // backgroundColor: '#e3f2fd',
        fontSize: 12,
        color: 'white',
        // alignSelf: 'flex-end'
        // padding: '.2rem',
        // justifySelf: 'center',
        alignSelf: 'center'
    },
    tabText: {
        fontSize: 11
    },
    catText: {
        fontSize: 12
    },
    cardBtn: {
        // paddingRight: '1rem',
        // paddingLeft: '1rem',
        width: '80%',
        height: '70%',
        // flex: 1,
        margin: 1,
        marginRight: 5,
        justifyContent: 'center',
        alignContent: 'center',
        elevation: 2,
        borderRadius: 5,
        backgroundColor: '#e8f5e9'

    },
    headerIcons: {
        fontSize: 13
    },
    cardImg: {
        // backgroundColor: 'pink',
        height: op,
        // width: op,
        flex: 1, flexDirection: 'column'
    },
    gridView: {
        // marginTop: 10,
        flex: 1,
    },
    footer: {
        position: 'absolute',
        // height: 100,
        left: 0,
        top: height - 80,
        width: width,
    }
});


const mapStateToProps = (state) => {
    return {
        Products: state.productReducer.Products,
        cart: state.authReducers.cart,
        wish: state.wishReducer.wish,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProduct: (Products) => dispatch(updateProduct(Products)),
        updateCart: (cart) => dispatch(updateCart(cart)),
        updateWish: (wish) => dispatch(updateWish(wish)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);



