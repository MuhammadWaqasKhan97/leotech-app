import React, { Component } from 'react';
import { Image, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Button, Icon, Left, Body, H3, H1, Right, H2, View } from 'native-base';
import AwesomeAlert from 'react-native-awesome-alerts';
import { updateProduct } from '../Redux/action/productAction'
import { updateCart } from '../Redux/action/cartAction'
import { updateWish, removeWish } from '../Redux/action/wishAction'
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Footers from '../components/Footer'
import Headers from '../components/Header'

let { height, width } = Dimensions.get('window');
let op = width / 3.3;
let op1 = width / 2.7;
class WishList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ShowAlertSingle: false,
      showAlert: false,
      showAlert1: false,
      wishArr: null
    }
    this.delWishItem = this.delWishItem.bind(this)
    this.addToCart = this.addToCart.bind(this);
  }

  static navigationOptions = { header: null }
  showAlert1 = () => {
    this.setState({
      showAlert1: true
    });
  };


  hideAlert1 = () => {
    this.setState({
      showAlert1: false
    });
  };
  componentWillReceiveProps(props) {
    let arr = [];
    // alert(JSON.stringify(this.props.wish))
    // alert(JSON.stringify(this.props.Products))
    props.wish && props.wish.map(v => {
      props.Products && props.Products.map(e => {
        if (v.product_id == e.id) {
          arr.push({
            ...e,
            ...v
          })
        }
      })
    })
    this.setState({ wishArr: arr })

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
      this.showAlert1();
    }
    else {
      let arr = [
        {
          product_id: e.id,
          quantity: 1
        }
      ]
      this.props.updateCart(arr)
      this.showAlert1();
    }

  }


  componentWillMount() {
    let arr = [];
    // alert(JSON.stringify(this.props.wish))
    // alert(JSON.stringify(this.props.Products))
    this.props.wish && this.props.wish.map(v => {
      this.props.Products && this.props.Products.map(e => {
        if (v.product_id == e.id) {
          arr.push({
            ...e,
            ...v
          })
        }
      })
    })
    this.setState({ wishArr: arr })
  }

  delWishItem(i) {
    // alert(i)
    this.setState({ deleteIndex: i })
    this.alertSingle()
  }

  delWish() {
    this.props.removeWish()
    this.hideAlert()
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

  alertSingle() {
    this.setState({ ShowAlertSingle: !this.state.ShowAlertSingle })
  }


  render() {
    const { showAlert, showAlert1, ShowAlertSingle, wishArr } = this.state;
    console.log(wishArr)
    return (
      <Container>
        <Headers {...this.props} />
        <Content padder style={{ backgroundColor: '#e0e0e044', marginBottom: 60 }}>
          <H1 style={{textAlign: "center", padding: 20}}>Wish List</H1>
          {wishArr && this.props.wish ? wishArr.map((item, index) => {
            return (
              <Card style={{ flex: 0, margin: 10, padding: 0, elevation: 5 }} key={index}>
                <CardItem style={{ margin: 0, padding: 0 }}>
                  <View style={{ flex: 1 }}>
                    <Image source={{ uri: item.images[0].src }} style={{ height: 100, width: 100 }} />
                  </View>
                  <View style={{ flex: 1 }}>
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

                      <View style={{ flex: 1, flexDirection: "row", alignContent: 'flex-end', justifyContent: 'flex-end' }}>
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                          <TouchableOpacity
                            style={[styles.cardBtn]}
                            onPress={() => this.addToCart(item)}>
                            <Icon name="cart-plus" type="FontAwesome" style={[styles.cardIcons, { color: 'green' }]} />

                          </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                          <TouchableOpacity
                            style={[styles.cardBtn]}
                            onPress={() => this.props.navigation.navigate('ProductDetails',
                              {
                                obj: item
                              })}>
                            <Icon name="info-outline" type="MaterialIcons" style={[styles.cardIcons, { color: 'blue' }]} />

                          </TouchableOpacity>

                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                          <TouchableOpacity transparent
                            style={[styles.cardBtn]}
                            transparent textStyle={{ color: 'red' }} onPress={() => this.delWishItem(index)}>
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
            (
              <TouchableOpacity style={{ alignContent: "center", justifyContent: 'center', marginBottom: 60, backgroundColor: '#e0e0e001' }}>
                <Text style={{ alignSelf: 'center' }}>no Items Found in the Cart</Text>
              </TouchableOpacity>
            )
          }
        </Content>

        <AwesomeAlert
          show={showAlert1}
          showProgress={false}
          title="Item Added Successfully!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.hideAlert1()
          }}
        />


        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Are You Sure?"
          message="you want to Delete All Items In your Wish List?"
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
            this.delWish()
          }}
          style={{ flex: 1 }}
        />

        <AwesomeAlert
          show={ShowAlertSingle}
          showProgress={false}
          title="Are You Sure?"
          message="you want to Delete this Item from your Wish List?"
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

            let x = this.props.wish;
            let y = x.slice(0, this.state.deleteIndex);
            let z = x.slice(this.state.deleteIndex + 1);

            let aar = [
              ...y, ...z
            ]
            if (this.props.wish.length - 1 === 0) {
              this.props.updateWish(null)
              this.setState({ wishArr: null })

            } else {
              this.setState({ wishArr: aar })
              this.props.updateWish(aar)
            }
            this.alertSingle()
          }}
          style={{ flex: 1 }}
        />

        <Footers active={'wishList'} {...this.props} />

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
    wish: state.wishReducer.wish,
    Products: state.productReducer.Products,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (cart) => dispatch(updateCart(cart)),
    updateWish: (wish) => dispatch(updateWish(wish)),
    removeWish: (wish) => dispatch(removeWish(wish)),
    updateProduct: (Products) => dispatch(updateProduct(Products)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList)
