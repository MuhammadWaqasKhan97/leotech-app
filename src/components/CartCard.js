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
  Card,
  CardItem,
  Body,
  Right,
  Left,
  View,
  Toast
} from "native-base";

import { TouchableWithoutFeedback, Modal } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

export default class CartCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      modalVisible: false,
      checkToken: false
    };
    console.log(props);
  }

  render() {
    return (
      <Container style={{ marginTop: 70 }}>
        <Spinner visible={this.props.loading} />
        <Text>
                Home
            </Text>
      </Container>
    );
  }
}
