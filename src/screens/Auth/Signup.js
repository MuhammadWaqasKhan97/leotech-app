import React, { Component } from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Icon,
  Header,
  H3,
  Card,
  CardItem,
  Body,
  H2, View
} from "native-base";
import { TouchableWithoutFeedback, Image } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

import Spinner from "react-native-loading-spinner-overlay";
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
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      f_name: "",
      l_name: "",
      email: "",
      mobile: "",
      password: "",
      cpassword: "",
      onGoing: false,
      visible: false
    };
    this.register = this.register.bind(this);
  }

  static navigationOptions = { header: null }

  componentWillReceiveProps(newProps) {
    if (newProps.loading) {
      if (newProps.message) {
        alert("Register Error");
      } else {
        this.props.navigation.navigate("Login");
      }
    }
  }
  register() {
    if (this.state.f_name === "" ||
      this.state.l_name === "" ||
      this.state.mobile === "" ||
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.cpassword === ""
    ) {
      alert("please fill all fields!!");
      return
    }
    if (this.state.password.length < 8) {
      alert("password must be atleast 8 characters!!");
      return

    }
    if (this.state.password !== this.state.cpassword) {
      alert("confirm password does not match!!");
      return;
    }
    this.setState({ onGoing: true });
    fetch('http://leotech.pk/api/get_users.php').then(response => {
      response.json().then((resp) => {
        this.setState({ visible: true })
        this.setState({ onGoing: true });
        let users = resp;
        let found = false;
        users.forEach((u) => {
          if (u.email === this.state.email) {
            this.setState({ visible: false })
            alert("email is already in use, please use another");
            found = true;
          }
          if (u.mobile === this.state.mobile) {
            this.setState({ visible: false })
            alert("phone # is already in use, please use another");
            found = true;
          }
        })
        // alert(JSON.stringify(resp));

        if (!found) {
          wc.post('customers', {
            "email": this.state.email,
            "first_name": this.state.f_name,
            "last_name": this.state.l_name,
            "username": this.state.email,
            "billing": {
              "first_name": this.state.f_name,
              "last_name": this.state.l_name,
              "company": "",
              "address_1": "",
              "address_2": "",
              "city": "",
              "state": "",
              "postcode": "",
              "country": "",
              "email": this.state.email,
              "phone": this.state.mobile
            },
            "shipping": {
              "first_name": this.state.f_name,
              "last_name": this.state.l_name,
              "company": "",
              "address_1": "",
              "address_2": "",
              "city": "",
              "state": "",
              "postcode": "",
              "country": "",
            }

          }, {}).then((data) => {
            // alert(JSON.stringify(data));
            if (data.id) {
              fetch('http://leotech.pk/api/signup.php?register=true&f_name=' + this.state.f_name + '&l_name=' + this.state.l_name + '&email=' + this.state.email + '&mobile=' + this.state.mobile + '&password=' + this.state.password + '&customer_id=' + data.id)
                .then(response => {
                  // alert("Succesfs"+JSON.stringify(response));
                  response.json().then((resp) => {
                    let response = resp;
                    this.setState({ visible: false })
                    if (response.success === false) {
                      alert("Error Occured", response.mesg);
                      this.setState({ onGoing: true });

                    }
                    else {
                      // alert("Success", response.mesg);
                      this.setState({ visible: false })
                      this.props.toggle();
                    }
                  })
                })

            }
            else {
              this.setState({ onGoing: false });
              this.setState({ visible: false })
            }
          }).catch((error) => {
            alert("error with server");
          })


        }
        else {
          this.setState({ onGoing: false });

        }
      })
    })


  }


  render() {
    const { visible } = this.state
    return (
      <Container style={{ backgroundColor: '#fff' }}>

        

        <View style={{ flex: 2, backgroundColor: '#fff' }}>

          <Content style={styles.content}>
          <View style={{
          flex: 1, flexDirection: 'column', justifyContent: 'center',
          alignItems: 'center', backgroundColor: '#fff'
        }}>
          <View style={{ backgroundColor: '#0C1937', padding: 10, borderRadius: 5 }}>
            <Image
              circle
              style={[{
                 alignSelf: 'center'
              },styles.icon]}
              source={require('../../../assets/icon.png')}
            />
          </View>
        </View>
            <Form>
              <Item regular style={{ margin: 5 }}>
                <Icon active name="ios-person" style={styles.white} />
                <Input placeholder="First Name"
                  // placeholderTextColor="white"
                  style={styles.white}
                  text={this.state.name}
                  onChangeText={text => {
                    this.setState({
                      f_name: text
                    });
                  }}
                />
              </Item>
              <Item regular style={{ margin: 5 }}>
                <Icon active name="ios-person" style={styles.white} />
                <Input placeholder="Last Name"
                  // placeholderTextColor="white"
                  style={styles.white}
                  text={this.state.name}
                  onChangeText={text => {
                    this.setState({
                      l_name: text
                    });
                  }}
                />
              </Item>

              <Item regular style={{ margin: 5 }}>
                <Icon active name="ios-mail" style={styles.white} />
                <Input placeholder="Email ID"
                  // placeholderTextColor="white"/
                  text={this.state.email}
                  style={styles.white}
                  onChangeText={text => {
                    this.setState({
                      email: text
                    });
                  }} />
              </Item>
              <Item regular style={{ margin: 5 }}>
                <Icon style={styles.white} active name="ios-call" />
                <Input placeholder="Mobile #"
                  // placeholderTextColor="white"
                  text={this.state.mobile}
                  style={styles.white}
                  onChangeText={text => {
                    this.setState({
                      mobile: text
                    });
                  }}
                />
              </Item>
              <Item regular style={{ margin: 5 }}>
                <Icon active name="ios-lock" style={styles.white} />

                <Input placeholder="Password"
                  // placeholderTextColor="white"
                  style={styles.white}
                  secureTextEntry={true}
                  text={this.state.password}
                  onChangeText={text => {
                    this.setState({
                      password: text
                    });
                  }}
                />
              </Item>
              <Item regular style={{ margin: 5 }}>
                <Icon active name="ios-lock" style={styles.white} />
                <Input placeholder="Confirm Password"
                  // placeholderTextColor="white"
                  style={styles.white}
                  secureTextEntry={true}
                  text={this.state.password}
                  onChangeText={text => {
                    this.setState({
                      cpassword: text
                    });
                  }}
                />
              </Item>
              <Button iconLeft full
                disabled={this.state.onGoing}
                style={{ marginTop: 20, backgroundColor: '#0C1937' }}
                onPress={() => {
                  this.register();
                }}
              >
                <Icon active name="ios-lock" />
                <Text>Sign Up</Text>
              </Button>
              <CardItem footer style={{ backgroundColor: '#fff' }}>
                <Text style={styles.white}>Already have an account?</Text>
                <TouchableWithoutFeedback
                  onPress={() => this.props.toggle()}
                >
                  <Text
                    numberOfLines={1}
                    style={{ paddingLeft: 5, textDecorationLine: "underline", color: 'blue' }}
                  >
                    Sign in
                  </Text>
                </TouchableWithoutFeedback>
              </CardItem>

            </Form>
          </Content>
        </View>
        <Spinner visible={visible} />
      </Container>

    );
  }
}
const styles = EStyleSheet.create({
  label: {
    fontSize: 12,
    fontStyle: 'normal',
  },
  icons: {
    fontSize: 18,
  },
  input: {
    fontSize: 12
  },
  header: {
    backgroundColor: '#fff',
    padding: 0
  },
  icon: {
    width: '9.6rem', 
    height: '8.2rem'
  },
  headerText: {
    color: 'white',
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    marginTop: 5,
    fontWeight: '400',
    textAlign: 'center'
  },
  content: {
    padding: 8
  },
  white: {
    color: 'black'
  }
});
