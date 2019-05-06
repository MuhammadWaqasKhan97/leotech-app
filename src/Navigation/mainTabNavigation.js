import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/Dashboard';
import SearchScreen from '../screens/search';
import WishList from '../screens/WishList';
import Account from '../screens/Account';
import Auth from '../screens/Auth';
import { removeUser } from '../Redux/action/autjAction'
import { connect } from 'react-redux'
const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const AccountStack = createStackNavigator({
  Account:  Auth,
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-person ${focused ? '' : '-outline'}`
          : 'md-person'
      }
    />
  ),
};

const SearchStack = createStackNavigator({
  search: SearchScreen,
});

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    />
  ),
};

const WishStack = createStackNavigator({
  WishScreen: WishList,
});

WishStack.navigationOptions = {
  tabBarLabel: 'Wish List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
    />
  ),
};

const MainTabNavigator = createBottomTabNavigator({
  HomeStack,
  WishStack,
  SearchStack,
  AccountStack
});



const mapStateToProps = (state) => {
  return {
      user: state.authReducers.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      removeUser: (user) => dispatch(removeUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTabNavigator);
