import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Text, Spinner, Content, Tabs, Tab, ScrollableTab, TabHeading } from 'native-base';

import DashboardCard from './Card';

export default class img extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCat: [
                'APPLE',
                'DELL',
                'HP',

                'Sony',
            ],
            
 productArr : [
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
      catagory: '',
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
      catagory: '',
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
      catagory: '',
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
      catagory: '',
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




    render() {
        const { arrCat, productArr } = this.state;
        return (
            <Tabs renderTabBar={() => <ScrollableTab/>}>
                {
                    arrCat && arrCat.map((v, i) => {
                        return <Tab   
                        heading={<TabHeading 
                        style={{ backgroundColor: '#0C1937', borderWidth: 0, margin: 0, padding: 0 }}>
                            <Text style={{ color: '#ffffff' }}>{v}</Text>
                        </TabHeading>} key={i}>
                            <Container>

                                <Content padder>
                                    {productArr ? (
                                        productArr.map((e, i) => {
                                            if (e.brand === v) {
                                                return <DashboardCard val={e} key={i} />
                                            }
                                            // else if (v === 'Random') {
                                            //     return <DashboardCard val={e} key={i} />
                                            // }
                                        })
                                    ) : (
                                            <View style={{ marginTop: '50%' }}>
                                                <Spinner />
                                            </View>
                                        )}
                                </Content>
                            </Container>
                        </Tab>
                    })
                }
            </Tabs>
        );
    }
}
