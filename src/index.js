import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Auth from './screens/Auth'
import Navigator from './Navigation/Main'
export default class Validation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false
    };
  }

  signedIn() {
    this.setState({ user: true })
  }

  componentWillMount() {
      if(this.props.user != null || this.props.user != undefined) {
        this.setState({user: true})
        console.log(this.props.user)
        // alert(this.prop.user)
      }
      else {
        console.log(this.props.user)
        // this.setState({user: false})
      }
  }

  render() {
    const { user } = this.state;
    return (
          <View style={styles.container}>
            {!user ? <Auth signedIn={() => this.signedIn()} /> : <Navigator />}
          </View>
     );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
});