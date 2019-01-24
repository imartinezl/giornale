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
	// <Text style={styles.album}>{this.props.item.album}</Text>
	render() {
		return (
			<View style={styles.item}>
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
					
				</View>
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