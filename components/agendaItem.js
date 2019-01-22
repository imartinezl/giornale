import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export class AgendaItem extends React.Component {
	constructor(props){
		super(props);

		this.state = {

		};
	}
	componentDidMount() {
    	
	}
	componentWillUnmount() {

	}
	render() {
		return (
			<View style={styles.item}>
				<Text style={styles.title}>{this.props.item.title}</Text>
				<Text>{this.props.item.artist}</Text>
				<Text>{this.props.item.album}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 17,
    marginBottom: 150,
    paddingTop: 10,
  	paddingBottom: 10,
  	paddingLeft: 15,
  	paddingRight: 15,
  },
  title:{
  	fontFamily: "Roboto-Bold",
  	fontSize: 16,
    textAlign: 'left',
  }
});