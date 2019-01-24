import React from 'react';
import { Image, ImageBackground, View, Text, StyleSheet } from 'react-native';



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
    if (this.props.day) {
      let d = new Date(this.props.day.timestamp)
      let dateArray = d.toDateString().slice(0, -5).split(" ");
      return (
        <View style={styles.day}>
          <Text allowFontScaling={false} style={styles.dayNum}>{dateArray[2]}</Text>
          <Text allowFontScaling={false} style={styles.dayText}>{dateArray[1]}</Text>
          <Text allowFontScaling={false} style={styles.dayText}>{dateArray[0]}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.day}/>
      );
    }
	}
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  dayNum: {
    fontSize: 28,
    fontWeight: '200',
    color: '#000'
  },
  dayText: {
    fontSize: 14,
    fontWeight: '300',
    color: '#000',
    marginTop: -5,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  day: {
    width: 63,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 32
  },
  today: {
    color: '#000'
  },
});