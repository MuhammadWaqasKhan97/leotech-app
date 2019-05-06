import React, { Component } from 'react';
import { Container, Header, Content, CardItem, Text, Button, Icon, Body, H1, H3, View, H2 } from 'native-base';
import { Image, Dimensions } from 'react-native';
import { Footer, FooterTab } from 'native-base';
import AwesomeAlert from 'react-native-awesome-alerts';
import { removeCart } from '../Redux/action/cartAction'
import { updateCart } from '../Redux/action/cartAction'
import { updateWish } from '../Redux/action/wishAction'
import { removeUser } from '../Redux/action/autjAction'
import { updateProduct } from '../Redux/action/productAction'
import { updateCatg } from '../Redux/action/categoriesAction'
import EStyleSheet from 'react-native-extended-stylesheet';
let { height, width } = Dimensions.get('window');
import { connect } from 'react-redux';
let sliderHeight = height / 3;
let op = width / 1.2;
import Slideshow from 'react-native-slideshow';
import HTML from 'react-native-render-html';
import Footers from './Footer'
import Headers from './Header'

class ProductDetails extends Component {

	constructor(props) {
		super(props)
		this.state = {
			showAlert: false,
			imgArr: null
		};
	}

	addToCart(e) {
		if (this.props.cart) {
			let old_cart = this.props.cart;
			console.log("old cart....", old_cart)
			let found = false;
			old_cart.forEach((c) => {
				if (c.product_id === e.id) {
					found = true;
					c.quantity = c.quantity + 1
				}
			});
			if (!found) {
				old_cart.push({ product_id: e.id, quantity: 1 });
			}
			console.log("old cart updated....", old_cart)
			let arr = [...old_cart]
			this.props.updateCart(arr)
			this.showAlert();
		}
		else {
			let arr = [
				{
					product_id: e.id,
					quantity: 1
				}
			]
			this.props.updateCart(arr)
			this.showAlert();
		}

	}


	addToWishList(e) {
		if (this.props.wish) {
            let old_wish = this.props.wish;
            let found = false;
            console.log("old_wish...",old_wish);
            old_wish.forEach((w)=>{
                if(w.product_id === e.id)
                {
                    found = true;
                }
            });
            if(!found){
                let arr = [
                    ...this.props.wish,
                    ...[{
                        product_id: e.id,
                    }]
                ]
                this.props.updateWish(arr);
            }
            this.showAlert()

			
		}
		else {
			let arr = [
				{
					product_id: e.id,
				}
			]
			this.props.updateWish(arr);
			this.showAlert()
		}	}


	showAlert = () => {
		this.setState({
			showAlert: true
		});
	};


	hideAlert = () => {
		this.setState({
			showAlert: false
		});
	};



	componentWillMount() {
		//	this.props.removeCart();
		// let that = this;
		// let arr = []
		// let x = that.props.getParam('obj', {});

		// x.images.map(v => {
		// 	arr.push(v.src)
		// })
		// that.setState({ imgArr: arr })
	}

	static navigationOptions = { header: null }

	render() {
		const { showAlert, imgArr } = this.state;
		const { navigation } = this.props;
		const obj = navigation.getParam('obj', {});
		let arr = []
		obj.images.map(v => {
			arr.push({ url: v.src })
		})
		return (
			<Container>
				<Headers {...this.props}/>
				<View style={{ flex: 1 }}>
					<Content style={{marginBottom: 40}}>

						<View style={{
							flexDirection: 'row', justifyContent: 'center',
							alignItems: 'center', padding: 10
						}}>

							{
								arr &&
								<Slideshow
									dataSource={arr} height={sliderHeight} />

							}

						</View>

						<View style={{ padding: 20 }}>
							<H2>
								{obj.name}
							</H2>
							<View style={{ flexDirection: 'row' }}>

								<View style={{ flexDirection: 'row' }}>
								<Text> Rs. </Text>
									<Text style={[ (obj.price === obj.sale_price && { textDecorationLine: 'line-through' })]} >{obj.regular_price}</Text>

									{
										(obj.price === obj.sale_price) && (obj.sale_price !== "") && <Text> - {obj.sale_price}</Text>
									}
								</View>

							</View>
							<View>
								<View style={styles.details}>
									<CardItem style={{ margin: 0 }}>
										<Body>
											<Text style={{ fontSize: 18, fontWeight: '600', width: '100%' }}>Details:</Text>
											<HTML html={obj.description} imagesMaxWidth={Dimensions.get('window').width} />

										</Body>
									</CardItem>
								</View>
							</View>
						</View>
					</Content>
				</View>

				<Footer transparent style={{ backgroundColor: 'white', marginBottom: 40}}>
					<FooterTab style={{ backgroundColor: 'white' }}>
						<View style={{ flex: 1, margin: 2 }}>
							<Button block small light style={{ elevation: 0 }} onPress={() => this.addToCart(obj)}>
								<Icon name="shoppingcart" type="AntDesign" style={{fontSize: 15}}/>
								<Text style={{fontSize: 15}}>
									Add to Cart
										</Text>
							</Button>
						</View>

						<View style={{ flex: 1, margin: 2 }}>
							<Button block light small style={{ elevation: 0 }} onPress={() => this.addToWishList(obj)}>
								<Icon name="hearto" type="AntDesign"  style={{fontSize: 15}}/>
								<Text style={{fontSize: 15}}>
									Add to WishList
										</Text>
							</Button>
						</View>
					</FooterTab>
				</Footer>


				<AwesomeAlert
					show={showAlert}
					showProgress={false}
					title="Item Added Successfully!"
					closeOnTouchOutside={true}
					closeOnHardwareBackPress={true}
					showConfirmButton={true}
					confirmText="Ok"
					confirmButtonColor="#DD6B55"
					onConfirmPressed={() => {
						this.hideAlert()
					}}
				/>
                <Footers {...this.props}/>

			</Container>
		);
	}
}


const ImageFix = props => {
	// console.log(props)
	return (
		<Image source={{ uri: props.url }} style={[styles.cardImg]} />
	)
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
	details: {
		// flex: 1,
		margin: 0
	},
	cardImg: {
		// flex: 1,
		width: op,
		height: sliderHeight,
		justifyContent: 'center',
		alignSelf: 'center',
	}
});




const mapStateToProps = (state) => {
	return {
		cart: state.authReducers.cart,
		wish: state.wishReducer.wish,
		user: state.authReducers.user,
		Products: state.productReducer.Products,
		catg: state.catgReducer.catg,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateCart: (cart) => dispatch(updateCart(cart)),
		removeCart: (cart) => dispatch(removeCart(cart)),
		updateWish: (wish) => dispatch(updateWish(wish)),
		removeUser: (user) => dispatch(removeUser(user)),
		updateProduct: (Products) => dispatch(updateProduct(Products)),
		updateCatg: (catg) => dispatch(updateCatg(catg))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
