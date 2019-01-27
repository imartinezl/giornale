import React from 'react';
import { Animated, Dimensions, Image, ImageBackground, View, Text, StyleSheet } from 'react-native';
import { FlatList, RectButton, Swipeable } from 'react-native-gesture-handler';

const window = Dimensions.get('window');

export class AgendaItem extends React.Component {
	constructor(props){
		super(props);

		this.state = {
		    color: '#ffffff',
		    fadeAnim: new Animated.Value(0),
		};

	}
	componentDidMount() {
    	Animated.timing(                  // Animate over time
			this.state.fadeAnim,            // The animated value to drive
			{
				toValue: 1,                   // Animate to opacity: 1 (opaque)
				duration: 10000,              // Make it take a while
			}
		).start(); 
	}
	componentWillUnmount() {

	}
	componentWillMount() {
        console.log(this.props.item);
    }

	renderLeftActions(progress, dragX){
		const trans = dragX.interpolate({
		  inputRange: [0, 50, 100, 101],
		  outputRange: [-20, 0, 0, 1],
		});
		return (
		  <RectButton>
		    <Animated.Text
		      style={
		        {
		          transform: [{ translateX: trans }],
		        }
		      }>
		      Archive
		    </Animated.Text>
		  </RectButton>
		);
	}
	render() {
		let d = new Date(this.props.item.date)
      	let day = ("0" + d.getDate()).slice(-2);
      	let month = ("0" + (d.getMonth() + 1)).slice(-2);

        

		return (
			<View style={styles.item}>
			
				<Image
					style={styles.image}
					source={{uri: this.props.item.albumImage}}
					resizeMode={'cover'}
					borderRadius={8}
				/>
				<View style={styles.textContainer}>
					<Text allowFontScaling={false} style={styles.title}>{this.props.item.title}</Text>
					<Text allowFontScaling={false} style={styles.artist}>{this.props.item.artist}</Text>
				</View>
				<View style={styles.dateContainer}>
            		<Text allowFontScaling={false} style={styles.date}>{day + '/' + month}</Text>
            	</View>
			</View>

		)
	}
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  	backgroundColor: '#FFF',
  	marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 8,
  	borderRadius: 15,
  },
  image:{
    padding: 15,
    width: 70,
    height: 70,
  },
  textContainer:{
  	flex: 1,
  	justifyContent: 'center',
  },
  title:{
  	fontFamily: "Roboto-Bold",
  	fontSize: 16,
    textAlign: 'left',
    paddingLeft: 10,
  },
  artist:{
  	fontFamily: "Roboto-Regular",
  	fontSize: 16,
    textAlign: 'left',
    paddingLeft: 10,
    flexWrap: 'wrap',
    color: '#aaa',
  },
  album:{
  	fontFamily: "Roboto-Regular",
  	fontSize: 16,
    textAlign: 'right',
  },
  dateContainer:{
  	flex: 1,
  	height: 78,
    alignItems: 'flex-start',
    position: 'absolute',
    marginLeft: window.width*5/6,
    marginRight: 0,
    marginTop: 0,

  },
  date:{
  	fontFamily: "Roboto-Regular",
  	fontSize: 14,
    color: '#aaa',
  }

});