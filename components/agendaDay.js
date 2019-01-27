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
        <View style={styles.date}>
          <Text allowFontScaling={false} style={styles.dayNum}>{day}</Text>
          <Text allowFontScaling={false} style={styles.dayText}>{month}</Text>
          <Text allowFontScaling={false} style={styles.extra}>{day + '/' + month}</Text>
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
  date: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',

  },
  day: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: '#000'
  },
  month: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: '#000',
  },
  extra:{
    position: 'absolute',
    marginLeft: window.width*5/6,
    marginRight: 0,
    marginTop: 25,
    zIndex: 1,
    color: '#aaa',
  }
});