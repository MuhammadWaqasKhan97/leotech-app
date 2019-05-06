import React, { Component } from "react";
import { TouchableOpacity, Linking, View } from 'react-native';
import { Container, Content, Fab, Text, H1, Icon, Button } from 'native-base';
import Footers from '../components/Footer'
import Headers from '../components/Header'

import { StyleSheet } from 'react-native'

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      modalVisible: false,
      checkToken: false
    };

  }
  static navigationOptions = { header: null }

  render() {
    return (
      <Container style={{ backgroundColor: '#e0e0e044' }}>
        <Headers {...this.props} />
        <Content style={{ flex: 1,backgroundColor: '#e0e0e044', textAlign: 'center', marginBottom: 80 }}>
          <View style={{ flex: 1, padding: 20 }}>
            <H1 style={{ alignSelf: 'center' }}>About Leo Tech</H1>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ color: '#727272', textAlign: 'center', paddingLeft: 30, paddingRight: 30, paddingTop: 10 }}>
              lorem Ipsim ummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic
              typesetting, remaining ess
            </Text>
          </View>

        </Content>
        <Button
        block
          style={{ marginBottom: 60, margin: 5 }}
          onPress={() => Linking.openURL('http://leotech.pk')}>
          <Text>
            Vist Us at LeoTech.pk
            </Text>
        </Button>

        <Footers {...this.props} />
      </Container>
    );
  }
}
