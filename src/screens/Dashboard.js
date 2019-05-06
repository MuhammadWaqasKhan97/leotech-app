import React, { Component } from "react";
import { ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { Card, H3, Container, Content, Tabs, Tab, ScrollableTab, TabHeading, Text, Icon, View } from 'native-base';
import { updateCart } from '../Redux/action/cartAction'
import { updateWish } from '../Redux/action/wishAction'
import { removeUser } from '../Redux/action/autjAction'
import { updateProduct } from '../Redux/action/productAction'
import { updateCatg } from '../Redux/action/categoriesAction'
import { FlatGrid } from 'react-native-super-grid';
import AwesomeAlert from 'react-native-awesome-alerts';
import Footers from '../components/Footer'
import Headers from '../components/Header'
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'
import WooCommerceAPI from 'react-native-woocommerce-api';
let { height, width } = Dimensions.get('window');
let op = width / 3.3;
let op1 = width / 2.7;
let hi = height / 3;

var wc = new WooCommerceAPI({
    url: 'http://leotech.pk', // Your store URL
    ssl: true,
    consumerKey: 'ck_d3a0f273f280528c3a7b612818b650bd3bbcb7ff', // Your consumer secret
    consumerSecret: 'cs_5d1718fae6d5416a003c1395d55c5c1a2403cadc', // Your consumer secret
    wpAPI: true, // Enable the WP REST API integration
    version: 'wc/v3', // WooCommerce WP REST API version
    queryStringAuth: true
});


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
        };
    }


    componentDidMount() {


        // alert(JSON.stringify(this.props))

        // console.log('check 1')
        // let that = this;
        fetch('https://leotech.pk/wp-json/wc/v3/products/categories?consumer_key=ck_d3a0f273f280528c3a7b612818b650bd3bbcb7ff&consumer_secret=cs_5d1718fae6d5416a003c1395d55c5c1a2403cadc')
            .then(res => res.json().then((resp) => {
                if (resp.code && resp.message) {
                    // console.log(resp);
                }
                else {
                    let categories = resp;
                    // console.log("catego.....", JSON.stringify(categories));
                    this.props.updateCatg(categories);

                }
            })
                // .then(x => this.props.updateCatg(x))
            ).catch((err) => {
                alert("Please Check your Internet Connectivity");
                // console.log(err);
            })

        fetch('https://leotech.pk/wp-json/wc/v3/products?per_page=50&consumer_key=ck_d3a0f273f280528c3a7b612818b650bd3bbcb7ff&consumer_secret=cs_5d1718fae6d5416a003c1395d55c5c1a2403cadc')
            .then(res => res.json().then((resp) => {
                if (resp.code && resp.message) {
                    // console.log(resp);
                }
                else {
                    let products = resp;
                    // console.log("pro.....", JSON.stringify(products));
                    this.props.updateProduct(products);

                }
            })
                // .then(x => this.props.updateProduct(x))
            ).catch((err) => {
                alert("Please Check your Internet Connectivity");
                // console.log(err);
            })


        // console.log('check 2')

    }

    static navigationOptions = { header: null }



    addToCart(e) {
        if (this.props.cart) {
            let old_cart = this.props.cart;
            // console.log("old cart....", old_cart)
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
            // console.log("old cart updated....", old_cart)
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
            // console.log("old_wish...", old_wish);
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


    render() {
        const { Products, catg } = this.props;
        const { showAlert } = this.state
        // console.log(this.props)
        return (
            <Container style={{ margin: 0, backgroundColor: '#e0e0e044' }} >
                <Headers {...this.props} noBorder={true} />
                <Container style={{ margin: 0, backgroundColor: '#e0e0e044' }}>
                    {(Products && catg || (Products !== undefined && catg != undefined)) ?
                        (<Tabs renderTabBar={() => <ScrollableTab style={{ width: '100%', backgroundColor: '#fff' }} />} >
                            {
                                catg && catg.map((v, i) => {
                                    let arr = []
                                    return <Tab key={i}
                                        style={{ padding: 0 }}
                                        heading={<TabHeading
                                            style={{ backgroundColor: '#fff', borderWidth: 0, margin: 0, padding: 0 }}>
                                            <Text style={[{ color: '#727272' }, styles.tabText]}>{v.name}</Text>
                                        </TabHeading>} key={i}>
                                        <Container style={{ backgroundColor: '#e0e0e044', marginBottom: 60 }}>
                                            <Content padder>
                                                {Products ? (
                                                    <View>
                                                        {
                                                            Products.map(e => {
                                                                if (e.stock_status === "instock" && e.categories && (e.categories[0].name === v.name)) {
                                                                    arr.push(e)
                                                                } else {
                                                                    console.log(e)
                                                                }
                                                            })
                                                        }
                                                        <FlatGrid
                                                            itemDimension={op1}
                                                            items={arr}
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
                                                                                            <H3 style={styles.cardTitle}> {item.name}</H3>
                                                                                        </View>
                                                                                        <View style={{ flexDirection: 'row', margin: 1 }}>
                                                                                            <Text style={{ color: '#727272' }}> Rs. </Text>
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
                                                        <View style={{ marginTop: '50%' }}>
                                                            <Spinner />
                                                        </View>
                                                    )}
                                            </Content>
                                        </Container>
                                    </Tab>
                                })
                            }
                        </Tabs>)
                        :
                        (
                            <Spinner visible />
                        )
                    }
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

                <Footers active={'home'} {...this.props} />

            </Container>
        );
    }
}



const styles = EStyleSheet.create({
    text: {
        padding: '0.5rem',
        fontSize: '1.5rem',
    },
    header: {
        backgroundColor: '#0C1937'
    },
    headerText: {
        color: 'white',
        flex: 1,
        flexDirection: 'row',
        paddingTop: '0.6rem',
        fontWeight: '500',
        fontSize: '1.3rem',
    },
    cardTitle: {
        fontSize: '.8rem',
        padding: 0,
        margin: 0,
        fontWeight: '400',
        color: '#727272'
    },
    cardPrice: {
        fontSize: '.4rem',
    },
    cardIcons: {
        // backgroundColor: '#e3f2fd',
        fontSize: '1.1rem',
        color: 'white',
        // alignSelf: 'flex-end'
        // padding: '.2rem',
        // justifySelf: 'center',
        alignSelf: 'center'
    },
    tabText: {
        fontSize: '.9rem'
    },
    catText: {
        fontSize: '1rem'
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
        // elevation: 1,
        borderRadius: 5,
        backgroundColor: '#22222211'

    },
    headerIcons: {
        fontSize: '1.3rem'
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
});







const mapStateToProps = (state) => {
    return {
        cart: state.authReducers.cart,
        wish: state.wishReducer.wish,
        user: state.authReducers.user,
        Products: state.productReducer.Products,
        catg: state.catgReducer.catg,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCart: (cart) => dispatch(updateCart(cart)),
        updateWish: (wish) => dispatch(updateWish(wish)),
        removeUser: (user) => dispatch(removeUser(user)),
        updateProduct: (Products) => dispatch(updateProduct(Products)),
        updateCatg: (catg) => dispatch(updateCatg(catg))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);