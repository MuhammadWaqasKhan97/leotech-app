import React, { Component } from "react";
import { ImageBackground, TouchableHighlight } from 'react-native';
import { Container, Input, Header, Item, Content, Card, CardItem, Text, Button, Icon, Left, Body, H3, H1, Right, H2, View } from 'native-base';
import { FlatGrid } from 'react-native-super-grid';

import { StyleSheet } from 'react-native'

export default class SearchHelper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productArr: [
        {
          title: 'DELL INSPIRON 5567 CORE I7 7500U',
          catagory: '',
          price: '79,499',
          discount: '',
          brand: 'DELL',
          details: '15-inch laptop with the latest Intel® processors, a glossy finish and options like an infrared camera and FHD touch display, so you can create a PC that reflects what matters to you.',
          itemId: 'Dell Inspiron 5567 Core i7 7500U',
          img: 'https://www.leotech.com.pk/images/thumbnails-large/a-2967-139077-020218085430.jpg'
        },
        {
          title: 'APPLE IPHONE XS 64GB GOLD    ',
          catagory: 'Smart Phone',
          price: '215,000',
          discount: '165,000',
          brand: 'DELL',
          details: `(diagonal) all-screen OLED Multi-Touch display 
          2436-by-1125-pixel resolution at 458 ppi 
          A11 Bionic chip with 64-bit architecture 
          12MP wide-angle and telephoto cameras with Optical Zoom 
          7-megapixel TrueDepth Camera 
          Enabled by TrueDepth camera for facial recognition 
          FaceTime video calling over Wi-Fi or cellular 
          Wireless charging (works with Qi chargers) 
          With an all-new design IOS 11 
          Includes EarPods with Lightning Connector 
          This product might be pre-activated.`,
          itemId: ' Apple iPhone XS 64gb ',
          img: 'https://www.leotech.com.pk/images/thumbnails-large/kkkkkkk-2967-129339-030119012339.jpg'
        },
        {
          title: 'HP 15-BS090NIA CORE I5 7200U    ',
          catagory: 'Laptop',
          price: '54,500',
          discount: '',
          brand: 'HP',
          details: `Processor: Intel® Core™ i5-7200U (2.5 GHz, 3 MB cache, 2 cores) 
          • Ram: 4 GB DDR4-2133 SDRAM 
          • Hard Drive: 500 GB 5400 rpm SATA 
          • Display: 15.6" 
          • Graphics: Intel® HD Graphics 620 
          • Operating System: DOS`,
          itemId: 'HP 15-BS090NIA Core i5 7200U',
          img: 'https://www.leotech.com.pk/images/thumbnails-large/a-2967-139923-120218031333.jpg'
        },
        {
          title: 'APPLE IMAC MODEL: MNE92    ',
          catagory: 'Laptop',
          price: '270,000',
          discount: '',
          brand: 'APPLE',
          details: `iMac MNE92 27.Inch Core i5 3.4GHZ/ 8GB Ram/ 1 TB.
          `,
          itemId: 'Apple iMac (MNE92)',
          img: 'https://www.leotech.com.pk/images/thumbnails-large/imac-update-1-2967-238596-100419090220.jpg'
        },
        {
          title: 'IPAD (6TH GENERATION) WIFI+ CELLULAR GOLD 32GB    ',
          catagory: 'Tablets',
          price: '62,000',
          discount: '',
          brand: 'Sony',
          details: `MRM42LL/A 
          IPAD (6th Generation) WiFi+ Cellular GOLD 32 GB
          `,
          itemId: 'MRM42LL/A',
          img: 'https://www.leotech.com.pk/images/thumbnails-large/imac-update-1-2967-238596-100419090220.jpg'
        },
      ]


    };

  }
  static navigationOptions = { header: null }

  render() {
    const items = [
      { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
      { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
      { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
      { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
      { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
      { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
      { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
      { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
      { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
      { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
    ];
    const { productArr } = this.state
    return (
      <Container>
        <FlatGrid
        itemDimension={200}
        items={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        // spacing={20}
        renderItem={({ item, index }) => (
         <TouchableHighlight onPress={()=> alert('Apple')}>
            <ImageBackground source={require('../../assets/b.jpg')} style={[styles.itemContainer, { backgroundColor: item.code, borderColor: item.code }]}>
            <Text style={styles.itemName}>{item.name}</Text>
            {/* <Text style={styles.itemCode}>{item.code}</Text> */}
          </ImageBackground>
         </TouchableHighlight>
        )}
      />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0C1937'
  },
  headerText: {
    color: '#fff',
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    fontWeight: '500'
},
gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 3,
    padding: 10,
    height: 200,
    borderWidth: 2,
    // borderColor: 'grey'
  },
  itemName: {
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#222',
  },
});