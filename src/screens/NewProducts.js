import React, { Component } from "react";
import { ImageBackground, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
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
let { height, width } = Dimensions.get('window');
let op = width / 3.3;
let op1 = width / 2.7;
let hi = height / 3;


class NewProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      products: []

    };

  }
  static navigationOptions = { header: null }
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
  componentWillMount() {
    if (this.props.Products && this.props.Products !== undefined) {
      const arr = this.props.Products;
      arr.sort((a, b) => {
        return new Date(b.date_created.toLocaleString()).getTime() - new Date(a.date_created.toLocaleString()).getTime()
      })

      let productsToShow = [];
      for (let i = 0; i <= 9; i++) {
        productsToShow.push(arr[i]);
      }
      this.setState({ products: productsToShow })
    }
  }
  componentWillReceiveProps(props) {
    if (props.Products && props.Products !== undefined) {
      const arr = props.Products;
      arr.sort((a, b) => {
        return new Date(b.date_created.toLocaleString()).getTime() - new Date(a.date_created.toLocaleString()).getTime()
      })
      let productsToShow = [];
      for (let i = 0; i <= 9; i++) {
        productsToShow.push(arr[i]);
      }
      this.setState({ products: productsToShow })
    }

  }
  render() {
    const { products, showAlert } = this.state;
    return (
      <Container>
        <Headers {...this.props} />
        <Container style={{ margin: 0, backgroundColor: '#e0e0e044' }} >
          <Content>
            {products.length >= 1 ? (

              <View>

                <FlatGrid
                  itemDimension={op1}
                  items={products}
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
        <Footers {...this.props} />

      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
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

export default connect(mapStateToProps, mapDispatchToProps)(NewProducts);