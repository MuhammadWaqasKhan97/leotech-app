import DashboardCard from '../components/Card';
import MyCart from '../screens/MyCart';
import WishList from '../screens/WishList';
import ProductDetails from '../components/productDetails';
import Catagory from '../components/catagoryTabs';
import Footers from '../components/Footer';
import Search from '../screens/search';
import Popular from '../screens/Popular';
import About from '../screens/About';
import LeoWorld from '../screens/LeoWorld';
import Contact from '../screens/Contact';
import Account from '../screens/Account';
import CheckOut from '../screens/CheckOut';
import Auth from '../screens/Auth';
import Home from '../screens/Dashboard';
import NewProducts from '../screens/NewProducts'
import {createDrawerNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import MainTabNavigator from './mainTabNavigation';
import SideBar from '../components/customDrawer'
import React, { Component } from "react";
const StackNavigator = createStackNavigator({
    Home: {
        screen: Home
    },
   
    MyCart: {
        screen: MyCart
    }, 
    WishList: {
      screen: WishList
    },
    ProductDetails: {
      screen: ProductDetails
    },
    Popular: {
      screen: Popular
    },
    About: {
      screen: About
    },
    NewProducts: {
      screen: NewProducts
    },
    Contact: {
      screen: Contact
    },
    Footers: {
      screen: Footers
    },
    Catagory: {
      screen: Catagory
    },
    Search: {
      screen: Search
    },
    Account: {
      screen: Account
    },
    CheckOut: {
      screen: CheckOut
    },
    Auth: {
      screen: Auth
    }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 })



  const MyDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: StackNavigator
    },
    MyCart: {
        screen: MyCart
    },
    WishList: {
      screen: WishList
    },
    Popular: {
      screen: Popular
    },
    About: {
      screen: About
    },
    NewProducts: {
      screen: NewProducts
    },
    Contact: {
      screen: Contact
    },
    Account: {
      screen: Account
    },
    LeoWorld: {
      screen: LeoWorld
    }
    
  }
  ,
  {
    contentComponent: props => <SideBar {...props} />
  }
  );
  
const Navigator = createAppContainer(MyDrawerNavigator);

export default Navigator;