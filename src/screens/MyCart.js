import React, { Component } from 'react';
import { Image, Dimensions, TouchableOpacity } from 'react-native';

import { Container, Content, Card, CardItem, Text, Button, Icon, View, H1 } from 'native-base';
import AwesomeAlert from 'react-native-awesome-alerts';
import EStyleSheet from 'react-native-extended-stylesheet';
import Footers from '../components/Footer'
import Headers from '../components/Header'

import { updateProduct } from '../Redux/action/productAction'
import { updateCart, removeCart } from '../Redux/action/cartAction'
import { connect } from 'react-redux';

let { height, width } = Dimensions.get('window');
let op = width / 3.3;
let op1 = width / 2.7;
class MyCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ShowAlertSingle: false,
      showAlert: false,
      MyCart: null
    }

    this.delCartItem = this.delCartItem.bind(this)
    this.editQuantity = this.editQuantity.bind(this)
  }

  static navigationOptions = { header: null }
  componentWillReceiveProps(props) {
    // alert("props updated");
    let arr = [];
    // alert(JSON.stringify(this.props.cart))
    // alert(JSON.stringify(this.props.Products))
    props.cart && props.Products && props.cart.map(v => {
      props.Products.map(e => {
        console.log(v.product_id == e.id)
        if (v.product_id == e.id) {
          arr.push({
            ...e,
            ...v
          })
        }
      })
    })
    this.setState({ MyCart: arr })
    // this.props.updateCart(arr)


  }
  delCartItem(i) {
    // alert(i)

    this.setState({ deleteIndex: i })
    this.alertSingle()
  }

  delcart() {
    this.props.removeCart()
    this.hideAlert()
    this.setState({ MyCart: null })
  }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };


  componentWillMount() {
    let arr = [];
    // alert(JSON.stringify(this.props.cart))
    // alert(JSON.stringify(this.props.Products))
    this.props.cart && this.props.Products && this.props.cart.map(v => {
      this.props.Products.map(e => {
        console.log(v.product_id == e.id)
        if (v.product_id == e.id) {
          arr.push({
            ...e,
            ...v
          })
        }
      })
    })
    this.setState({ MyCart: arr })
    // this.props.updateCart(arr)



  }

  editQuantity(i, val, q) {
    let array = [...this.state.MyCart];
    let found = false;
    let newArr = [];
    //alert(array[i].quantity+"____"+val)
    if (array[i].quantity === 1 && val === -1) {
      // alert("error");
      let x = array;
      let y = x.slice(0, i);
      let z = x.slice(i + 1);
      newArr = [...y, ...z];
      found = true
    }
    else {
      array[i].quantity = array[i].quantity + (val);
    }
    if (!found) {
      this.setState({ MyCart: array });
      let cart = [];
      array.forEach((a) => {
        cart.push({ product_id: a.product_id, quantity: a.quantity });
      })
      this.props.updateCart(cart)
    }
    else {
      this.setState({ MyCart: newArr });
      let cart = [];
      newArr.forEach((a) => {
        cart.push({ product_id: a.product_id, quantity: a.quantity });
      })
      this.props.updateCart(cart)
    }

  }

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  alertSingle() {
    this.setState({ ShowAlertSingle: !this.state.ShowAlertSingle })
  }


  render() {
    const { cart } = this.props;
    const { showAlert, ShowAlertSingle, MyCart } = this.state;
    console.log('ok', this.props, MyCart)
    return (
      <Container>
        <Headers {...this.props} />

        <Content padder style={{ backgroundColor: '#e0e0e044', marginBottom: 60 }}>
          <H1 style={{textAlign: 'center', padding: 20}}>My Cart</H1>
          {
            this.state.MyCart && cart !== undefined && cart !== null ?
              this.state.MyCart.map((item, index) => {
                return (
                  <Card style={{ flex: 0, margin: 10, padding: 0, elevation: 5 }} key={index}>
                    <CardItem style={{ margin: 0, padding: 0 }}>
                      <View style={{ flex: 1 }}>
                        <Image source={{ uri: item.images[0].src }} style={{ height: 100, width: 100 }} />
                      </View>
                      <View style={{ flex: 2 }}>
                        <View style={{ flex: 1 }}>
                          <Text>{item.name}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text> Rs. </Text>
                            <Text style={[styles.cardTitle, (item.price === item.sale_price && { textDecorationLine: 'line-through' })]} > {item.regular_price} </Text>
                            {
                              (item.price === item.sale_price) && (item.sale_price !== "") && <Text note style={styles.cardTitle}> - {item.sale_price}</Text>
                            }
                          </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                          <View style={{ flex: 1, alignContent: 'flex-end', flexDirection: "column", justifyContent: 'center' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                              <Button transparent textStyle={{ color: 'red' }} onPress={() => this.editQuantity(index, -1, item.quantity)}>
                                <Icon name="caretleft" type="AntDesign" style={{ fontSize: 20, color: 'gray' }} />
                              </Button>
                              <Text style={{ fontSize: 20, marginTop: 8 }}>
                                {item.quantity}
                              </Text>
                              <Button transparent textStyle={{ color: 'green' }} onPress={() => this.editQuantity(index, 1, item.quantity)}>
                                <Icon name="caretright" type="AntDesign" style={{ fontSize: 20, color: 'gray' }} />
                              </Button>
                            </View>
                          </View>

                          <View style={{ flex: 1, flexDirection: "row", alignContent: 'flex-end', justifyContent: 'flex-end' }}>
                            <View style={{ alignItems: "flex-end" }}>
                            </View>
                            <View style={{ flex: 1, alignItems: "flex-end" }}>
                              <TouchableOpacity
                                style={[styles.cardBtn]}
                                onPress={() => this.props.navigation.navigate('ProductDetails',
                                  {
                                    obj: item
                                  })}
                              >
                                <Icon name="info-outline" type="MaterialIcons" style={[styles.cardIcons, { color: 'info' }]} />
                              </TouchableOpacity>

                            </View>
                            <View style={{ flex: 1, alignItems: "flex-end" }}>
                              <TouchableOpacity transparent
                                style={[styles.cardBtn]}
                                onPress={() => this.delCartItem(index)}>
                                <Icon name="trash-o" type="FontAwesome" style={[styles.cardIcons, { color: 'red' }]} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    </CardItem>
                  </Card>
                )

              })
              :
              <TouchableOpacity style={{ alignContent: "center", justifyContent: 'center', marginBottom: 60, backgroundColor: '#e0e0e001' }}>
                <Text style={{ alignSelf: 'center' }}>no Items Found in the Cart</Text>
              </TouchableOpacity>
          }


          {
            cart !== null && cart !== undefined
            &&
            <Button block primary
              style={{ marginBottom: 60 }}
              onPress={
                () => {
                  if (this.props.cart && this.props.cart.length >= 1) { this.props.navigation.navigate('CheckOut') }
                  else {
                    alert("No item in cart!")
                  }
                }
              }>
              <Text>Proceed to Checkout</Text>
            </Button>
          }

        </Content>


        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Are You Sure?"
          message="That you want to Delete All Items In your Cart?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert()
          }}
          onConfirmPressed={() => {
            this.delcart()
          }}
          style={{ flex: 1 }}
        />

        <AwesomeAlert
          show={ShowAlertSingle}
          showProgress={false}
          title="Are You Sure?"
          message="That you want to Delete this Item from your Cart?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.alertSingle()
          }}
          onConfirmPressed={() => {

            let x = this.props.cart;
            let y = x.slice(0, this.state.deleteIndex);
            let z = x.slice(this.state.deleteIndex + 1);

            let aar = [
              ...y, ...z
            ]
            if (this.props.cart.length - 1 === 0) {
              this.setState({ MyCart: null })
              this.props.updateCart(null)
            } else {
              this.setState({ MyCart: aar })
              this.props.updateCart(aar)
            }
            this.alertSingle()
          }}
          style={{ flex: 1 }}
        />
        <Footers {...this.props} />
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
  },
  cardPrice: {
    fontSize: '.4rem',
  },
  cardIcons: {
    // backgroundColor: '#e3f2fd',
    fontSize: '1.1rem',
    color: 'white',
    // alignSelf: 'flex-end',
    // padding: '.2rem',
    // justifySelf: 'center',
    alignSelf: 'center',
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
    elevation: 2,
    borderRadius: 5,
    backgroundColor: '#e8f5e9'

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
    Products: state.productReducer.Products,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (cart) => dispatch(updateCart(cart)),
    removeCart: (cart) => dispatch(removeCart(cart)),
    updateProduct: (Products) => dispatch(updateProduct(Products)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCart)
