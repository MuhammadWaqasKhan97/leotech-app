import React from 'react';
import { Icon } from 'native-base';

import Colors from '../constants/Colors';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        size={26}
        style={[{ marginBottom: -3 }, styles.icon]}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}

const styles = EStyleSheet.create({
  icon: {
    fontSize: '1.5rem',
  },
})