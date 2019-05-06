import React, { Component } from "react";
import { Container, Header, CardItem, Content, Input, List, Item, Left, Right, Thumbnail, Icon, H1, Button, View, Text, H2, ListItem, CheckBox, Body, Picker, Card, H3 } from 'native-base';
import { updateCart, removeCart } from '../Redux/action/cartAction'
import Spinner from 'react-native-loading-spinner-overlay'

import { StyleSheet, Modal } from 'react-native'
import { updateUser } from '../Redux/action/autjAction'
import { connect } from 'react-redux'
import WooCommerceAPI from 'react-native-woocommerce-api';
import Footers from '../components/Footer'
import Headers from '../components/Header'

var wc = new WooCommerceAPI({
    url: 'http://leotech.pk', // Your store URL
    ssl: true,
    consumerKey: 'ck_d3a0f273f280528c3a7b612818b650bd3bbcb7ff', // Your consumer secret
    consumerSecret: 'cs_5d1718fae6d5416a003c1395d55c5c1a2403cadc', // Your consumer secret
    wpAPI: true, // Enable the WP REST API integration
    version: 'wc/v3', // WooCommerce WP REST API version
    queryStringAuth: true
});

class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            visible: false,
            MyCart: null,
            shiping: true,
            customer_id: 0,
            first_name: "",
            last_name: "",
            city: "",
            state: "",
            postcode: "",
            country: "",
            address_1: "",
            address_2: "",
            email: "",
            phone: "",
            s_first_name: "",
            s_last_name: "",
            s_city: "",
            s_state: "",
            s_postcode: "",
            s_country: "",
            s_address_1: "",
            s_address_2: "",
            line_items: [{
                "product_id": 36,
                "quantity": 2
            }],
            payment_method: 'cod',
            payment_method_title: 'Cash On Delivery'
        }

        this._CheckOut = this._CheckOut.bind(this);
    }
    static navigationOptions = { header: null }
    // componentWillReceiveProps(){
    //     alert("this will work everytime");

    // }
    _CheckOut() {
        if (((this.state.first_name === "" ||
            this.state.last_name === "" ||
            this.state.address_1 === "" ||
            this.state.address_2 === "" ||
            this.state.city === "" ||
            this.state.state === "" ||
            this.state.postcode === "" ||
            this.state.country === "" ||
            this.state.email === "" ||
            this.state.phone === "") ||
            (!this.state.shiping &&
                (
                    this.state.s_first_name === "" ||
                    this.state.s_last_name === "" ||
                    this.state.s_address_1 === "" ||
                    this.state.s_address_2 === "" ||
                    this.state.s_city === "" ||
                    this.state.s_state === "" ||
                    this.state.s_postcode === "" ||
                    this.state.s_country === ""

                )))
        ) {
            alert("Please fill all fields");
            return;
        }
        this.setState({ visible: true })
        let order_obj = {
            "customer_id": this.state.customer_id,
            "payment_method": this.state.payment_method,
            "payment_method_title": this.state.payment_method_title,
            "billing": {
                "first_name": this.state.first_name,
                "last_name": this.state.last_name,
                "address_1": this.state.address_1,
                "address_2": this.state.address_2,
                "city": this.state.city,
                "state": this.state.state,
                "postcode": this.state.postcode,
                "country": this.state.country,
                "email": this.state.email,
                "phone": this.state.phone,
            },
            "shipping": {
                "first_name": this.state.shiping ? this.state.first_name : this.state.s_first_name,
                "last_name": this.state.shiping ? this.state.last_name : this.state.s_last_name,
                "address_1": this.state.shiping ? this.state.address_1 : this.state.s_address_1,
                "address_2": this.state.shiping ? this.state.address_2 : this.state.s_address_2,
                "city": this.state.shiping ? this.state.city : this.state.s_city,
                "state": this.state.shiping ? this.state.state : this.state.s_state,
                "postcode": this.state.shiping ? this.state.postcode : this.state.s_postcode,
                "country": this.state.shiping ? this.state.country : this.state.s_country
            },
            "line_items": this.state.line_items,

        };
        // alert(JSON.stringify(order_obj));
        wc.post('orders',
            order_obj, {

            }).then(data => {
                this.setState({ visible: false })
                this.props.removeCart()
                alert('Order Submitted Successfully');
                this.props.navigation.navigate("Home")
            })
    }
    componentWillReceiveProps(props) {
        let arr = [];
        props.cart && props.cart.map(v => {
            props.Products.map(e => {
                if (v.product_id == e.id) {

                    arr.push({
                        ...e,
                        ...v
                    })
                }
            })
        })
        this.setState({ MyCart: arr });
        // alert(JSON.stringify(arr))
        if (props.cart && props.cart !== undefined) {
            this.setState({
                line_items: props.cart
            }, () => {
                // alert("asasasa"+JSON.stringify(this.state.line_items));
            })
        }
        if (props.user && props.user !== undefined) {
            // alert("fdfd")
            this.setState({
                customer_id: parseInt(props.user.id),
                first_name: props.user.billing.first_name,
                last_name: props.user.billing.last_name,
                city: props.user.billing.city,
                state: props.user.billing.state,
                postcode: props.user.billing.postcode,
                country: props.user.billing.country,
                address_1: props.user.billing.address_1,
                address_2: props.user.billing.address_2,
                email: props.user.billing.email,
                phone: props.user.billing.phone,
                s_first_name: props.user.shipping.first_name,
                s_last_name: props.user.shipping.last_name,
                s_city: props.user.shipping.city,
                s_state: props.user.shipping.state,
                s_postcode: props.user.shipping.postcode,
                s_country: props.user.shipping.country,
                s_address_1: props.user.shipping.address_1,
                s_address_2: props.user.shipping.address_2
            }, () => {
                // alert(JSON.stringify(this.state));

            });
        }
        else {
            alert("It is recommended to login for future orders and for order tracking!")
        }

    }
    componentWillMount() {
        // alert(JSON.stringify(this.props.cart))
        let arr = [];
        this.props.cart && this.props.cart.map(v => {
            this.props.Products.map(e => {
                if (v.product_id == e.id) {

                    arr.push({
                        ...e,
                        ...v
                    })
                }
            })
        })
        this.setState({ MyCart: arr });
        // alert(JSON.stringify(arr))
        if (this.props.cart && this.props.cart !== undefined) {
            this.setState({
                line_items: this.props.cart
            }, () => {
                // alert("asasasa"+JSON.stringify(this.state.line_items));
            })
        }
        if (this.props.user && this.props.user !== undefined) {
            // alert("fdfd")
            this.setState({
                customer_id: parseInt(this.props.user.id),
                first_name: this.props.user.billing.first_name,
                last_name: this.props.user.billing.last_name,
                city: this.props.user.billing.city,
                state: this.props.user.billing.state,
                postcode: this.props.user.billing.postcode,
                country: this.props.user.billing.country,
                address_1: this.props.user.billing.address_1,
                address_2: this.props.user.billing.address_2,
                email: this.props.user.billing.email,
                phone: this.props.user.billing.phone,
                s_first_name: this.props.user.shipping.first_name,
                s_last_name: this.props.user.shipping.last_name,
                s_city: this.props.user.shipping.city,
                s_state: this.props.user.shipping.state,
                s_postcode: this.props.user.shipping.postcode,
                s_country: this.props.user.shipping.country,
                s_address_1: this.props.user.shipping.address_1,
                s_address_2: this.props.user.shipping.address_2
            }, () => {
                // alert(JSON.stringify(this.state));

            });
        }
        else {
            alert("It is recommended to login for future orders and for order tracking!")
        }

    }

    render() {
        const { shiping } = this.state;
        let CartList = this.state.MyCart.map((item) => {
            return (
                <ListItem thumbnail key={item.id}>
                    <Left>
                        <Thumbnail square source={{ uri: item.images[0].src }} />
                    </Left>
                    <Body>
                        <Text>{item.name}</Text>
                        <Text note numberOfLines={1}>{item.price}</Text>
                    </Body>
                    <Right>
                        <Text>X {item.quantity}</Text>
                    </Right>
                </ListItem>
            )
        });

        return (
            <Container>
                <Headers {...this.props} />
                <Content style={{ backgroundColor: '#e0e0e044', marginBottom: 60 }}>
                    <CardItem>
                        <H2 style={{ flex: 1, alignSelf: 'center', textAlign: 'center', color: 'black' }}>Check Out</H2>
                    </CardItem>
                    <View style={{ padding: 10 }}>
                        <Content>
                            <List>
                                {this.state.MyCart ? CartList : (<Text>Nothing in cart</Text>)}
                            </List>

                        </Content>


                    </View>
                    <View style={{ padding: 10 }}>

                        <View style={styles.flex}>
                            <ListItem>
                                <Body>
                                    <Text>Billing</Text>
                                </Body>
                            </ListItem>
                        </View>
                        <View style={[styles.flex, { flexDirection: 'row' }]}>
                            <View style={styles.flex}>
                                <Item regular>
                                    <Input placeholder={(this.props.user && this.props.user.billing.first_name.length > 1) ? this.props.user.billing.first_name : "First Name"} text={this.state.first_name}
                                        onChangeText={text => {
                                            this.setState({
                                                first_name: text
                                            });
                                        }}
                                    /></Item>
                            </View>
                            <View style={styles.flex}>
                                <Item regular>
                                    <Input placeholder={(this.props.user && this.props.user.billing.last_name.length > 1) ? this.props.user.billing.last_name : "Last Name"} text={this.state.last_name}
                                        onChangeText={text => {
                                            this.setState({
                                                last_name: text
                                            });
                                        }}
                                    /></Item>
                            </View>
                        </View>
                        <View style={[styles.flex, { flexDirection: 'row' }]}>
                            <View style={styles.flex}>
                                <Item regular>
                                    <Input placeholder={(this.props.user && this.props.user.billing.city.length > 1) ? this.props.user.billing.city : "City"} text={this.state.city}
                                        onChangeText={text => {
                                            this.setState({
                                                city: text
                                            });
                                        }}
                                    /></Item>
                            </View>
                            <View style={styles.flex}>
                                <Item regular>
                                    <Input placeholder={(this.props.user && this.props.user.billing.state.length > 1) ? this.props.user.billing.state : "State"} text={this.state.state}
                                        onChangeText={text => {
                                            this.setState({
                                                state: text
                                            });
                                        }}
                                    /></Item>
                            </View>
                        </View>
                        <View style={[styles.flex, { flexDirection: 'row' }]}>
                            <View style={styles.flex}>
                                <Item regular>
                                    <Input placeholder={(this.props.user && this.props.user.billing.country.length > 1) ? this.props.user.billing.country : "Country"} text={this.state.country}
                                        onChangeText={text => {
                                            this.setState({
                                                country: text
                                            });
                                        }}
                                    /></Item>
                            </View>
                            <View style={styles.flex}>
                                <Item regular>
                                    <Input placeholder={(this.props.user && this.props.user.billing.postcode.length > 1) ? this.props.user.billing.postcode : "Post Code"} text={this.state.postcode}
                                        onChangeText={text => {
                                            this.setState({
                                                postcode: text
                                            });
                                        }}
                                    /></Item>
                            </View>
                        </View>
                        <View style={[styles.flex, { marginLeft: 5, marginRight: 5 }]}>
                            <Item regular>
                                <Input placeholder={(this.props.user && this.props.user.billing.address_1.length > 1) ? this.props.user.billing.address_1 : "Address 1"} text={this.state.address_1}
                                    onChangeText={text => {
                                        this.setState({
                                            address_1: text
                                        });
                                    }}
                                /></Item>
                        </View>
                        <View style={[styles.flex, { marginLeft: 5, marginRight: 5 }]}>
                            <Item regular>
                                <Input placeholder={(this.props.user && this.props.user.billing.address_2.length > 1) ? this.props.user.billing.address_2 : "Address 2"} text={this.state.address_2}
                                    onChangeText={text => {
                                        this.setState({
                                            address_2: text
                                        });
                                    }}
                                /></Item>
                        </View>
                        <View style={[styles.flex, { marginLeft: 5, marginRight: 5 }]}>
                            <Item regular>
                                <Input placeholder={(this.props.user && this.props.user.billing.email.length > 1) ? this.props.user.billing.email : "Email"} text={this.state.email}
                                    onChangeText={text => {
                                        this.setState({
                                            email: text
                                        });
                                    }}
                                /></Item>
                        </View>
                        <View style={[styles.flex, { marginLeft: 5, marginRight: 5 }]}>
                            <Item regular>
                                <Input placeholder={(this.props.user && this.props.user.billing.phone.length > 1) ? this.props.user.billing.phone : "Phone #"} text={this.state.phone}
                                    onChangeText={text => {
                                        this.setState({
                                            phone: text
                                        });
                                    }}
                                /></Item>
                        </View>


                    </View>

                    <View style={{ padding: 10 }}>
                        <View style={styles.flex}>
                            <ListItem>
                                <CheckBox checked={shiping} onPress={() => this.setState({ shiping: !shiping })} />
                                <Body>
                                    <Text>Shipping same as Billing</Text>
                                </Body>
                            </ListItem>
                        </View>
                    </View>

                    {
                        !shiping && <View style={{ padding: 10 }}>
                            <View style={[styles.flex, { flexDirection: 'row' }]}>
                                <View style={styles.flex}>
                                    <Item regular>
                                        <Input placeholder={(this.props.user && this.props.user.shipping.first_name.length > 1) ? this.props.user.shipping.first_name : "First Name"} text={this.state.s_first_name}
                                            onChangeText={text => {
                                                this.setState({
                                                    s_first_name: text
                                                });
                                            }}
                                        /></Item>
                                </View>
                                <View style={styles.flex}>
                                    <Item regular>
                                        <Input placeholder={(this.props.user && this.props.user.shipping.last_name.length > 1) ? this.props.user.shipping.last_name : "Last Name"} text={this.state.s_last_name}
                                            onChangeText={text => {
                                                this.setState({
                                                    s_last_name: text
                                                });
                                            }}
                                        /></Item>
                                </View>
                            </View>
                            <View style={[styles.flex, { flexDirection: 'row' }]}>
                                <View style={styles.flex}>
                                    <Item regular>
                                        <Input placeholder={(this.props.user && this.props.user.shipping.city.length > 1) ? this.props.user.shipping.city : "City"} text={this.state.s_city}
                                            onChangeText={text => {
                                                this.setState({
                                                    s_city: text
                                                });
                                            }}
                                        /></Item>
                                </View>
                                <View style={styles.flex}>
                                    <Item regular>
                                        <Input placeholder={(this.props.user && this.props.user.shipping.state.length > 1) ? this.props.user.shipping.state : "State"} text={this.state.s_state}
                                            onChangeText={text => {
                                                this.setState({
                                                    s_state: text
                                                });
                                            }}
                                        /></Item>
                                </View>
                            </View>
                            <View style={[styles.flex, { flexDirection: 'row' }]}>
                                <View style={styles.flex}>
                                    <Item regular>
                                        <Input placeholder={(this.props.user && this.props.user.shipping.country.length > 1) ? this.props.user.shipping.country : "Country"} text={this.state.s_country}
                                            onChangeText={text => {
                                                this.setState({
                                                    s_country: text
                                                });
                                            }}
                                        /></Item>
                                </View>
                                <View style={styles.flex}>
                                    <Item regular>
                                        <Input placeholder={(this.props.user && this.props.user.shipping.postcode.length > 1) ? this.props.user.shipping.postcode : "Post Code"} text={this.state.s_postcode}
                                            onChangeText={text => {
                                                this.setState({
                                                    s_postcode: text
                                                });
                                            }}
                                        /></Item>
                                </View>
                            </View>
                            <View style={[styles.flex, { marginLeft: 5, marginRight: 5 }]}>
                                <Item regular>
                                    <Input placeholder={(this.props.user && this.props.user.shipping.address_1.length > 1) ? this.props.user.shipping.address_1 : "Address 1"} text={this.state.s_address_1}
                                        onChangeText={text => {
                                            this.setState({
                                                s_address_1: text
                                            });
                                        }}
                                    /></Item>
                            </View>
                            <View style={[styles.flex, { marginLeft: 5, marginRight: 5 }]}>
                                <Item regular>
                                    <Input placeholder={(this.props.user && this.props.user.shipping.address_2.length > 1) ? this.props.user.shipping.address_2 : "Address 2"} text={this.state.s_address_2}
                                        onChangeText={text =>
                                            this.setState({
                                                s_address_2: text
                                            })
                                        }
                                    /></Item>
                            </View>
                        </View>
                    }
                    <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
                        <View style={[styles.flex, { flexDirection: 'row' }]}>
                            <Picker
                                note
                                mode="dropdown"
                                style={{ width: 220 }}
                                selectedValue={this.state.payment_method}
                                onValueChange={(value) => {
                                    let title = value === 'cod' ? 'Cash On Delivery' : 'Direct Bank';
                                    this.setState({
                                        payment_method: value,
                                        payment_method_title: title
                                    })

                                    value !== 'cod' && this.setState({ modalVisible: true })
                                }}
                            >
                                <Picker.Item label="Cash On Delivery" value="cod" />
                                <Picker.Item label="Direct Bank Transfer" value="bac" />

                            </Picker>
                        </View>

                        <View style={[styles.flex, { flexDirection: 'row' }]}>
                            <Button block onPress={() => { this.setState({ modalVisible: true }) }}>
                                <Text>
                                    Show Details
                               </Text>
                            </Button>
                        </View>

                    </View>
                    <View style={{ padding: 10 }}>
                        <View style={styles.flex}>
                            <Button block info large onPress={() => {
                                this._CheckOut();
                            }}>
                                <Text>
                                    Check Out
                                </Text>
                            </Button>
                        </View>
                    </View>
                </Content>
                <Spinner visible={this.state.visible} />
                <Footers {...this.props} />
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({ modalVisible: false })
                    }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                        <View style={{ margin: 20 }}>
                            <Card style={{ padding: 20 }}>

                                <H1 style={{ textAlign: 'center', padding: 10 }}>
                                    Bank Tranfer
                                    </H1>
                                <H3 style={{ textAlign: 'center', padding: 10 }}>Meezan Bank</H3>
                                <Text style={{ textAlign: 'center', padding: 10 }}>Title: LeoTech</Text>
                                <Text style={{ textAlign: 'center', padding: 10 }}>Account #: 01070102938534</Text>
                                <View>
                                    <Button block onPress={() => { this.setState({ modalVisible: false }) }}>
                                        <Text>Close</Text>
                                    </Button>
                                </View>
                            </Card>
                        </View>
                    </View>
                </Modal>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0C1937'
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
    flex: {
        flex: 1,
        paddingTop: 4,
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 3
    }
});


const mapStateToProps = (state) => {
    return {
        user: state.authReducers.user,
        Products: state.productReducer.Products,
        cart: state.authReducers.cart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => dispatch(updateUser(user)),
        removeCart: (cart) => dispatch(removeCart(cart)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut)

