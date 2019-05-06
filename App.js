import React, { Component } from 'react';
import Navigator from './src/Navigation/Main'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/Redux/store'
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, StatusBar, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

let { height, width } = Dimensions.get('window');
let rem;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
switch (width) {
  case 360:
    rem = 15;
    break;
  case 320:
    rem = 14;
    break;
  case 420:
    rem = 16;
    break;
  case 480:
    rem = 18;
    break;
  default:
    rem = width ? 18 : 15;
    break;
}

if (width < 320) {
  rem = 14;
} else if (width < 360) {
  rem = 15;
} else if (width < 420) {
  rem = 16;
} else if (width < 460) {
  rem = 17;
} else if (width < 380) {
  rem = 18;
}




EStyleSheet.build({
  $rem: rem,
});

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <StatusBar backgroundColor="pink" barStyle="light-content" />

          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}
