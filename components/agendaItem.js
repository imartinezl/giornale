import React from 'react';
import { Image, ImageBackground, View, Text, StyleSheet } from 'react-native';



export class AgendaItem extends React.Component {
	constructor(props){
		super(props);

		this.state = {
		    color: '#ffffff',
		};

	}
	componentDidMount() {
    	
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
	render() {
		return (
			<ImageBackground
				style={styles.imageBackground}
				source={{uri: this.props.item.albumImage}}
				resizeMode={'cover'}
				borderRadius={15}
				blurRadius={4}
				>
			<View style={styles.item}>
				<View style={[styles.textContainer,{backgroundColor: 'rgba(255,0,0,0.4)',}]}>
					<Text style={styles.title}>{this.props.item.title}</Text>
					<Text style={styles.artist}>{this.props.item.artist}</Text>
					<Text style={styles.album}>{this.props.item.album}</Text>
				</View>
			</View>
			</ImageBackground>

		)
	}
}

const styles = StyleSheet.create({
  imageBackground:{
  	marginTop: 20,
    marginBottom: 40,
    marginRight: 10,
    width: 280, 
    height: 280,
  },
  item: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 15
  },
  textContainer:{
  	height: 100,
  	paddingTop: 20,
  	paddingRight: 20,
  	paddingBottom: 20,
  	marginTop: 'auto',
  	marginBottom: 0,
  	borderBottomLeftRadius: 15,
  	borderBottomRightRadius: 15,
  	
  },
  title:{
  	fontFamily: "Roboto-Bold",
  	fontSize: 22,
    textAlign: 'right',
  },
  artist:{
  	fontFamily: "Roboto-Regular",
  	fontSize: 18,
    textAlign: 'right',
  },
  album:{
  	fontFamily: "Roboto-Regular",
  	fontSize: 18,
    textAlign: 'right',
  },
  image:{
	width: 120, 
	height: 120,
	marginLeft: 'auto',
  }
});