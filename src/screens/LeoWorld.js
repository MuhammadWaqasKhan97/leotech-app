import React, { Component } from "react";
import { Linking, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Card, Text, Icon, H3, H2, View } from 'native-base';
import Footers from '../components/Footer'
import Headers from '../components/Header'

import EStyleSheet from 'react-native-extended-stylesheet';

export default class LeoWorld extends Component {
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
      <Container>
        <Headers {...this.props} />
        <Container style={{ margin: 0, backgroundColor: '#e0e0e044', alignContent: 'center', justifyContent: "center" }} >
          <Content>
            <View style={{ flex: 1, alignContent: 'center', justifyContent: "center", padding: 10 }}>
              <Card style={{ marginBottom: 60, paddingTop: 20 }}>
                <View style={{ flex: 1, padding: 10 }}>
                  <H2 style={{
                    color: '#727272',
                    textAlign: 'center'
                  }}>Leo World</H2>
                </View>
                <View style={{ padding: 10, borderRadius: 5 }}>
                  <Image
                    circle
                    style={[{
                      alignSelf: 'center'
                    }, styles.Icon]}
                    source={require('../../assets/leoworld.png')}
                  />
                </View>
                <View style={{ flex: 1, margin: 10 }}>
                  <H3 style={{
                    color: '#727272',
                    textAlign: 'center'
                  }}>
                    Leo Group is about to introduce travelling and tourism services globally.  {'\n'} Stay Updated for more details!
              </H3>
                </View>
                <TouchableOpacity
                  onPress={() => Linking.openURL('https://www.facebook.com/leoworld/')}
                  style={{
                    color: '#727272',
                    flexDirection: 'row', marginTop: 10, alignSelf: 'center'
                  }}
                >
                  <Icon name="logo-facebook" style={{
                    color: '#727272',
                    margin: 10
                  }} />
                  <Text style={{margin: 10, color: '#727272',}}>Follow Leo World on Facebook</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, margin: 10 }}>
                  <Text style={{
                    color: '#727272',
                    textAlign: 'right'
                  }}>
                    Website Coming Soon.
              </Text>
                </View>
              </Card>
            </View>

          </Content>

        </Container>
        <Footers {...this.props} />
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  header: {
    backgroundColor: '#0C1937'
  },
  headerText: {
    color: 'white',
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    fontWeight: '500'
  },
  Icon: {
    width: '15rem',
    height: '15rem'
  }
});