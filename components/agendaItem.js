import React from 'react';
import { Animated, Image, ImageBackground, View, Text, StyleSheet } from 'react-native';
import { FlatList, RectButton, Swipeable } from 'react-native-gesture-handler';

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
		// this.x.measure( (fx, fy, width, height, px, py) => {
  //           console.log('Component width is: ' + width)
  //           console.log('Component height is: ' + height)
  //           console.log('X offset to frame: ' + fx)
  //           console.log('Y offset to frame: ' + fy)
  //           console.log('X offset to page: ' + px)
  //           console.log('Y offset to page: ' + py)
  //       })
	}
	componentWillUnmount() {

	}
	componentWillMount() {
        console.log(this.props.item.albumImage);
    }
	// <Image
	// 	style={styles.image}
	// 	source={{uri: this.props.item.albumImage}}
	// />
	// <Text style={styles.album}>{this.props.item.album}</Text>
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
		return (
			<View ref={view => { this.x = view; }} style={styles.item} onLayout={event => {
			    const layout = event.nativeEvent.layout;
			    console.log('height:', layout.height);
			    console.log('width:', layout.width);
			    console.log('x:', layout.x);
			    console.log('y:', layout.y);
			  }}>
			<Swipeable renderLeftActions={this.renderLeftActions}>
				<ImageBackground
					style={styles.imageBackground}
					source={{uri: this.props.item.albumImage}}
					resizeMode={'cover'}
					borderTopLeftRadius={15}
					borderTopRightRadius={15}
					>
				</ImageBackground>
				<View style={styles.textContainer}>
					<Text allowFontScaling={false} style={styles.title}>{this.props.item.title}</Text>
					<Text allowFontScaling={false} style={styles.artist}>{this.props.item.artist + ' - ' + this.props.item.album}</Text>
					<Animated.View style={{
					    opacity: this.state.fadeAnim, // Binds directly
					    // transform: [{
					    //   translateY: this.state.fadeAnim.interpolate({
					    //     inputRange: [0, 1],
					    //     outputRange: [150, 150]  // 0 : 150, 0.5 : 75, 1 : 0
					    //   }),
					    // }],
					    flex: 1,
					    backgroundColor: 'red'
					  }}/>

				</View>
            </Swipeable>
			</View>

		)
	}
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
  	marginTop: 20,
    marginRight: 10,
    marginBottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground:{
    width: 280, 
    height: 280,
  },
  textContainer:{
  	height: 100,
  	width: 280,
  	paddingTop: 5,
  	paddingRight: 20,
  	paddingBottom: 20,
  	borderBottomLeftRadius: 15,
  	borderBottomRightRadius: 15,
  	backgroundColor: '#FFF',
  	borderTopWidth: 1,
  	borderTopColor: '#AAA'
  },
  title:{
  	fontFamily: "Roboto-Bold",
  	fontSize: 22,
    textAlign: 'right',
  },
  artist:{
  	fontFamily: "Roboto-Regular",
  	fontSize: 16,
    textAlign: 'right',
    flex: 1, 
    flexWrap: 'wrap',
  },
  album:{
  	fontFamily: "Roboto-Regular",
  	fontSize: 16,
    textAlign: 'right',

  },
  image:{
	width: 120, 
	height: 120,
	marginLeft: 'auto',
  }
});