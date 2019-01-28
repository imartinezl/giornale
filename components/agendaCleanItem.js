import React from 'react';
import { Animated, Dimensions, Easing, Image, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Ionicons } from '@expo/vector-icons';

const window = Dimensions.get('window');

export class AgendaItem extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			liked: false
		};
	}
	componentDidMount() {
    
	}
	componentWillUnmount() {

	}
	componentWillMount() {
        // console.log(this.props.item);
  }
	renderLeftActions = (progress, dragX) => {

			const trans = dragX.interpolate({
        inputRange: [0, 80],
        outputRange: [-20, 0],
        extrapolate: 'clamp',
			});
      const scale = dragX.interpolate({
        inputRange: [0, 80],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      });
      
			return (
			  <RectButton style={styles.leftAction} onPress={this.close}>
			    <Animated.View
			      style={
			        {
			          transform: [{ translateX: trans }],
			        }
			      }>
          <Text>
			      Archive
			    </Text>
          <Ionicons name="md-checkmark-circle" size={32} color="green" />
          </Animated.View>
			  </RectButton>
			);
	}
  renderRightActions = (progress, dragX) => {

      const trans = dragX.interpolate({
        inputRange: [-80, 0],
        outputRange: [0, -20],
        extrapolate: 'clamp',
      });
      const scale = dragX.interpolate({
        inputRange: [-80, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });
      return (
        <RectButton style={styles.rightAction} onPress={this.close}>
          <Animated.View
            style={
              {
                transform: [{ translateX: trans }],
              }
            }>
          <Text>
            Archive
          </Text>
          <Ionicons name="md-checkmark-circle" size={32} color="green" />
          </Animated.View>
        </RectButton>
      );
  }
  updateRef = ref => {
    this._swipeableRow = ref;
  }
  close = () => {
    this._swipeableRow.close();
  }
  onSwipeableLeftOpen(){
    console.log("onSwipeableLeftOpen")
  }
  onSwipeableRightOpen(){
    console.log("onSwipeableRightOpen")
  }
  handleMusicPlay(){
  	console.log("play music")
  }

	render() {
		let d = new Date(this.props.item.date)
      	let day = ("0" + d.getDate()).slice(-2);
      	let month = ("0" + (d.getMonth() + 1)).slice(-2);

		return (
			  <Swipeable 
        ref={this.updateRef.bind(this)}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        renderLeftActions={this.renderLeftActions.bind(this)}
        renderRightActions={this.renderRightActions.bind(this)}
        onSwipeableRightOpen={this.onSwipeableRightOpen.bind(this)}
        onSwipeableLeftOpen={this.onSwipeableLeftOpen.bind(this)}
        >
				<View style={styles.item}>

					
				<View style={styles.date}>
					<Text allowFontScaling={false} style={styles.day}>{day}</Text>
					<Text allowFontScaling={false} style={styles.month}>{month}</Text>
				</View>
				
				<View style={styles.textContainer}>
  				<TouchableOpacity onPress={this.handleMusicPlay.bind(this)}>
  					<Text allowFontScaling={false} style={styles.title}>{this.props.item.title}</Text>
  					<Text allowFontScaling={false} style={styles.artist}>{this.props.item.artist}</Text>
  				</TouchableOpacity>	
				</View>

				<Image
					style={styles.image}
					source={{uri: this.props.item.albumImage}}
					resizeMode={'cover'}
				/>

			</View>
			</Swipeable>
		)
	}
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  	backgroundColor: '#FFF',
  	marginTop: 5,
  	marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 0,
  	borderRadius: 15,
  	elevation: 3
  },
  image:{
    width: 70,
    height: 70,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 8,
  },
  textContainer:{
  	flex: 1,
  	justifyContent: 'center',
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#002642'
  },
  title:{
  	fontFamily: "Roboto-Bold",
  	fontSize: 16,
    textAlign: 'left',
  },
  artist:{
  	fontFamily: "Roboto-Regular",
  	fontSize: 16,
    textAlign: 'left',
    flexWrap: 'wrap',
    color: '#aaa',
  },
  album:{
  	fontFamily: "Roboto-Regular",
  	fontSize: 16,
    textAlign: 'right',
  },
  date: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  day: {
    fontSize: 16,
    fontFamily: "Roboto-Bold",
    color: '#000',
  },
  month: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: '#aaa',
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#388e3c',
    justifyContent: 'center',
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    alignItems: 'flex-end',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'center',
  },
});


