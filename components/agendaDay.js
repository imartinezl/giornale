import React from 'react';
import { Dimensions, Image, ImageBackground, View, Text, StyleSheet } from 'react-native';

const window = Dimensions.get('window');

export class AgendaDay extends React.Component {
	constructor(props){
		super(props);

		this.state = {

		};

	}
	componentDidMount() {
    	
	}
	componentWillUnmount() {

	}
	componentWillMount() {
       
  }
  render() {
    return (
        null
    );
    if (this.props.day) {
      let d = new Date(this.props.day.timestamp)
      let dateArray = d.toDateString().slice(0, -5).split(" ");
      let day = ("0" + d.getDate()).slice(-2);
      let month = ("0" + (d.getMonth() + 1)).slice(-2);
      return (
        <View style={styles.container}>
          <View style={styles.date}>
            <Text allowFontScaling={false} style={styles.day}>{day}</Text>
            <Text allowFontScaling={false} style={styles.month}>{month}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View/>
      );
    }
	}
}

const styles = StyleSheet.create({
  container:{
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  date: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 70,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 0,
    elevation: 3

  },
  day: {
    fontSize: 16,
    fontFamily: "Roboto-Bold",
    color: '#000'
  },
  month: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: '#aaa',
  },

});