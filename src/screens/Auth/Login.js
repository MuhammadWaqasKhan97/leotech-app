import React, { Component } from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Icon,
  Card,
  CardItem,
  Body,
  View,
  H2
} from "native-base";
import WooCommerceAPI from 'react-native-woocommerce-api';

var wc = new WooCommerceAPI({
  url: 'http://leotech.pk', // Your store URL
  ssl: true,
  consumerKey: 'ck_d3a0f273f280528c3a7b612818b650bd3bbcb7ff', // Your consumer secret
  consumerSecret: 'cs_5d1718fae6d5416a003c1395d55c5c1a2403cadc', // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v3', // WooCommerce WP REST API version
  queryStringAuth: true
});

import { updateUser } from '../../Redux/action/autjAction'
import { connect } from 'react-redux'
import {
  TouchableWithoutFeedback, Image
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import EStyleSheet from 'react-native-extended-stylesheet';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      modalVisible: false,
      checkToken: false,
      visible: false
    };
  }


  signIn() {
    if (this.state.email === "" || this.state.password === "") {
      alert("Please fill email and password");
      return;
    }
    this.setState({ visible: true })
    fetch('http://leotech.pk/api/login.php?login=true&email=' + this.state.email + '&password=' + this.state.password)
      .then(response => {
        response.json().then((resp) => {
          let response = resp;
          if (response.success === false) {
            alert(response.mesg);
            this.setState({ visible: false })
          }
          else {
            let { user } = response
            wc.get(`customers/${user.customer_id}`, {}).then((data) => {
              //alert(JSON.stringify(data));
              //alert("Success" + JSON.stringify(data));

              this.props.updateUser(data);
              this.setState({ visible: false })
              //  this.props.navigation.navigate("Home");
              this.props.signedIn()
            })

          }
        })
      })
        
  }


  render() {
    const { visible } = this.state;
    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <Content>
          <View style={{
            flex: 1, flexDirection: 'column', justifyContent: 'center',
            alignItems: 'center', backgroundColor: '#fff', padding: 10
          }}>
            <View style={{ backgroundColor: '#0C1937', padding: 10, borderRadius: 5}}>
              <Image
                circle
                style={[{
                   alignSelf: 'center'
                }, styles.Icon]}
                source={require('../../../assets/icon.png')}
              />
            </View>
          </View>

          <View style={{ flex: 2, flexDirection: 'column' }}>
            <Card style={{ backgroundColor: '#fff', elevation: 0, borderColor: '#fff' }}>
              <Form>
                <CardItem style={{ backgroundColor: '#fff' }}>
                  <Body>
                    <Item regular>
                      <Icon active name="ios-mail" style={styles.white} />
                      {/* <Label style={styles.white} >Email Id / Mobile Number</Label> */}
                      <Input
                        placeholder="Email Id"
                        // placeholderTextColor="white"
                        autoCapitalize="none"
                        text={this.state.email}
                        onChangeText={text => {
                          this.setState({
                            email: text
                          });
                        }}
                        style={styles.white}
                      />
                    </Item>
                  </Body>
                </CardItem>
                <CardItem style={{ backgroundColor: '#fff' }}>
                  <Body>
                    <Item regular>
                      <Icon active name="ios-lock" style={styles.white} />
                      {/* <Label style={styles.white} >Password</Label> */}
                      <Input
                        placeholder="Password"
                        // placeholderTextColor="white"
                        secureTextEntry={true}
                        text={this.state.password}
                        onChangeText={text => {
                          this.setState({
                            password: text
                          });
                        }}
                        style={styles.white}
                      />
                    </Item>
                  </Body>
                </CardItem>
                <CardItem style={{ backgroundColor: '#fff' }}>
                  <Content>
                    <Button
                      block
                      style={{ backgroundColor: '#0C1937' }}
                      onPress={() => {
                        this.signIn()
                      }}
                    >
                      <Text>Sign In</Text>
                    </Button>
                  </Content>
                </CardItem>
              </Form>
              <CardItem footer style={{ backgroundColor: '#fff' }}>
                <Text style={styles.white} >Don't have an account?</Text>
                <TouchableWithoutFeedback
                  onPress={() => this.props.toggle()}
                >
                  <Text
                    numberOfLines={1}
                    style={{ paddingLeft: 5, textDecorationLine: "underline", color: 'blue' }}
                  >
                    Sign up
                  </Text>
                </TouchableWithoutFeedback>
              </CardItem>
            </Card>
          </View>

        </Content>

        <Spinner visible={visible} cancelable/>
      </Container>
    );
  }
}


const styles = EStyleSheet.create({
  white: {
    color: 'black'
  }, 
  Icon: {
    width: '9.6rem', 
    height: '8.2rem'
  }
})


const mapStateToProps = (state) => {
  return {
    user: state.authReducers.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
