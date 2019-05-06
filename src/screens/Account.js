import React, { Component } from "react";
import { Container, Card, Content, CardItem, Body, Input, Item, ScrollableTab, ListItem, H3, Tab, Tabs, TabHeading, Button, View, CheckBox, Text } from 'native-base';

import { StyleSheet, Dimensions } from 'react-native'
import { updateUser } from '../Redux/action/autjAction'
import { connect } from 'react-redux'
import WooCommerceAPI from 'react-native-woocommerce-api';
import Footers from '../components/Footer'
import Headers from '../components/Header'
import { Table, Row } from 'react-native-table-component';
import Spinner from 'react-native-loading-spinner-overlay'
let { height, width } = Dimensions.get('window');

var wc = new WooCommerceAPI({
    url: 'http://leotech.pk', // Your store URL
    ssl: true,
    consumerKey: 'ck_d3a0f273f280528c3a7b612818b650bd3bbcb7ff', // Your consumer secret
    consumerSecret: 'cs_5d1718fae6d5416a003c1395d55c5c1a2403cadc', // Your consumer secret
    wpAPI: true, // Enable the WP REST API integration
    version: 'wc/v3', // WooCommerce WP REST API version
    queryStringAuth: true
});

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shiping: true,
            first_name: "",
            last_name: "",
            username: "",
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
            orders: null,
            visible: true
        }
        wc.get('orders', {}).then((data) => {
            let orders = [];
            data.forEach((order) => {
                if (order.customer_id === this.props.user.id) {
                    orders.push(order);
                }
            })
            this.setState({ orders: orders });
            this.setState({ visible: false });
            // alert(props.user.id+"my id"   +JSON.stringify(data));
        })
        this.UpdateUser = this.UpdateUser.bind(this);
        //alert(JSON.stringify(this.state.user));
    }

    componentWillReceiveProps(props) {
        if (props.user && props.user.first_name !== "") {
            alert("user exists");
        }
    }
    static navigationOptions = { header: null }
    UpdateUser() {
        let id = this.props.user.id;
        wc.post('customers/' + id, {

            billing: {
                first_name: this.state.first_name.length > 1 ? this.state.first_name : this.props.billing.first_name,
                last_name: this.state.last_name.length > 1 ? this.state.last_name : this.props.billing.last_name,
                city: this.state.city.length > 1 ? this.state.city : this.props.billing.city,
                state: this.state.state.length > 1 ? this.state.state : this.props.billing.state,
                country: this.state.country.length > 1 ? this.state.country : this.props.billing.country,
                postcode: this.state.postcode.length > 1 ? this.state.postcode : this.props.billing.postcode,
                address_1: this.state.address_1.length > 1 ? this.state.address_1 : this.props.billing.address_1,
                address_2: this.state.address_2.length > 1 ? this.state.address_2 : this.props.billing.address_2,
                email: this.state.email.length > 1 ? this.state.email : this.props.billing.email,
                phone: this.state.phone.length > 1 ? this.state.phone : this.props.billing.phone
            },
            shipping: {
                first_name: this.state.s_first_name.length > 1 ? this.state.s_first_name : this.props.shipping.first_name,
                last_name: this.state.s_last_name.length > 1 ? this.state.s_last_name : this.props.shipping.last_name,
                city: this.state.s_city.length > 1 ? this.state.s_city : this.props.shipping.city,
                state: this.state.s_state.length > 1 ? this.state.s_state : this.props.shipping.state,
                country: this.state.s_country.length > 1 ? this.state.s_country : this.props.shipping.country,
                postcode: this.state.s_postcode.length > 1 ? this.state.s_postcode : this.props.shipping.postcode,
                address_1: this.state.s_address_1.length > 1 ? this.state.s_address_1 : this.props.shipping.address_1,
                address_2: this.state.s_address_2.length > 1 ? this.state.s_address_2 : this.props.shipping.address_2
            }
        }, {}).then((data) => {
            alert(JSON.stringify(data));
            this.props.updateUser(data)
        })
    }
    componentWillMount() {
        if (this.props.user && this.props.user.first_name !== "") {
            this.setState({
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
                s_address_2: this.props.user.shipping.address_2,
            });

        }
        else {
            this.props.navigation.navigate("Auth");
        }
    }
    render() {
        let { user1, shiping, visible } = this.state;

        return (
            <Container>
                <Headers {...this.props} noBorder />

                <Tabs style={styles.header} renderTabBar={() => <ScrollableTab style={{
                    width: '100%', backgroundColor: '#fff   '
                }} />}>
                    <Tab heading={<TabHeading
                        style={{ backgroundColor: '#fff', borderWidth: 0, margin: 0, padding: 0 }}>
                        <Text style={[{ color: '#727272' }, styles.tabText]}>Order Details</Text>
                    </TabHeading>} style={styles.header}>
                        <Container>
                            <Content>
                                {this.state.orders && this.state.orders.length > 0 ? this.state.orders.map((v, i) => {
                                    let total_amount = 0;
                                    let date = new Date(v.date_created);
                                    return (
                                        <Card key={i}>
                                            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                                                <Row data={['Name', 'Quantity', 'Total Price ' + `(${v.currency})`]} style={styles.head} textStyle={styles.text} />
                                                {
                                                    v.line_items.map((e, n) => {
                                                        total_amount += parseInt(e.total);
                                                        return <Row key={n} data={[e.name, e.quantity, e.total]} textStyle={styles.text} />
                                                    })
                                                }
                                                <Row data={['Order Date: ' + `${date.getDate()}-${(date.getMonth() + 1)}-${date.getFullYear()}`, 'Status: ' + v.status, total_amount]} textStyle={styles.text} />
                                            </Table>
                                        </Card>
                                    )
                                }) : <Container style={{justifyContent: 'center', alignItems: 'center'}}>
                                        <Text>No Previous Orders Found</Text>
                                    </Container>
                                }
                                <Spinner visible={visible} cancelable={true} />
                            </Content>
                        </Container>
                    </Tab>
                    <Tab heading={<TabHeading
                        style={{ backgroundColor: '#fff', borderWidth: 0, margin: 0, padding: 0 }}>
                        <Text style={[{ color: '#727272' }, styles.tabText]}>Billing / Shipping Settings</Text>
                    </TabHeading>} >
                        <Container>
                            <Content>
                                <CardItem>
                                    <H3 style={{ flex: 1, alignSelf: 'center', textAlign: 'center', color: 'black' }}>Billing</H3>
                                </CardItem>
                                <View style={{ padding: 10 }}>
                                    <View style={[styles.flex, { flexDirection: 'row' }]} >
                                        <View style={styles.flex}>
                                            <Item regular>
                                                <Input placeholder={(this.props.user && this.props.user.billing.first_name.length > 1) ? this.props.user.billing.first_name : "First Name"} text={this.state.first_name}
                                                    onChangeText={text => {
                                                        this.setState({
                                                            first_name: text
                                                        });
                                                    }}
                                                />
                                            </Item>
                                        </View>
                                        <View style={styles.flex}>
                                            <Item regular>
                                                <Input placeholder={(this.props.user && this.props.user.billing.last_name.length > 1) ? this.props.user.billing.last_name : "Last Name"} text={this.state.last_name}
                                                    onChangeText={text => {
                                                        this.setState({
                                                            last_name: text
                                                        });
                                                    }}
                                                />
                                            </Item>
                                        </View>
                                    </View>

                                    <View style={[styles.flex, { flexDirection: 'row' }]} >
                                        <View style={styles.flex}>
                                            <Item regular>
                                                <Input placeholder={(this.props.user && this.props.user.billing.city.length > 1) ? this.props.user.billing.city : "City"} text={this.state.city}
                                                    onChangeText={text => {
                                                        this.setState({
                                                            city: text
                                                        });
                                                    }}
                                                />
                                            </Item>
                                        </View>
                                        <View style={styles.flex}>
                                            <Item regular>
                                                <Input placeholder={(this.props.user && this.props.user.billing.state.length > 1) ? this.props.user.billing.state : "State"} text={this.state.state}
                                                    onChangeText={text => {
                                                        this.setState({
                                                            state: text
                                                        });
                                                    }}
                                                />
                                            </Item>
                                        </View>
                                    </View>
                                    <View style={[styles.flex, { flexDirection: 'row' }]} >
                                        <View style={styles.flex}>
                                            <Item regular>
                                                <Input placeholder={(this.props.user && this.props.user.billing.country.length > 1) ? this.props.user.billing.country : "Country"} text={this.state.country}
                                                    onChangeText={text => {
                                                        this.setState({
                                                            country: text
                                                        });
                                                    }}
                                                />
                                            </Item>
                                        </View>
                                        <View style={styles.flex}>
                                            <Item regular>
                                                <Input placeholder={(this.props.user && this.props.user.billing.postcode.length > 1) ? this.props.user.billing.postcode : "Post Code"} text={this.state.postcode}
                                                    onChangeText={text => {
                                                        this.setState({
                                                            postcode: text
                                                        });
                                                    }}
                                                />
                                            </Item>
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
                                            />
                                        </Item>
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
                                        !shiping &&

                                        <View style={{ padding: 10 }}>
                                            <CardItem>
                                                <H3 style={{ flex: 1, alignSelf: 'center', textAlign: 'center', color: 'black' }}>Shipping</H3>
                                            </CardItem>
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
                                                        onChangeText={text => {
                                                            this.setState({
                                                                s_address_2: text
                                                            });
                                                        }}
                                                    /></Item>
                                            </View>
                                        </View>
                                    }


                                    <View style={[styles.flex, { marginLeft: 5, marginRight: 5, marginTop: 10 }]}>
                                        <Button block info large
                                            onPress={() => {
                                                this.UpdateUser();
                                                // alert(JSON.stringify(this.state))
                                            }}
                                        >
                                            <Text>
                                                Update
                                </Text>
                                        </Button>
                                    </View>
                                </View>

                            </Content>
                        </Container>

                    </Tab>

                </Tabs>
                    <Footers {...this.props} active={'account'} />

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff'
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
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
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
        user: state.authReducers.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => dispatch(updateUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
