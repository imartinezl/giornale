import React from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import {Calendario} from './components/calendar.js';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      
    };
  }
  componentDidMount(){
    console.log(this.state);
  }
  _onPressButton() {
    Alert.alert('You tapped the button!')
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <View>
          <Button
            onPress={this._onPressButton}
            title="Press Me"
          />
        </View>
        <Hyperlink linkStyle={ { color: '#2980b9', fontSize: 20 } } linkDefault={ true }>
          <Text style={ { fontSize: 15 } }>
          This text will be parsed to check for clickable strings like https://open.spotify.com/track/00FRRwuaJP9KimukvLQCOz and made clickable.
          </Text>
        </Hyperlink>
        <Calendario/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
