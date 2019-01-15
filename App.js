import React from 'react';
import { StyleSheet, Text, View, Alert, Button, StatusBar } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import {Calendario} from './components/calendar.js';
import {AgendaC} from './components/agenda.js';


import * as firebase from 'firebase';
import {firebaseConfig} from './components/firebase_init.js'
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      
    };

    this.onPressButton = this.onPressButton.bind(this);
  }
  componentDidMount(){
    console.log(this.state);
  }


  onPressButton() {
    this.storeInFirebase('hello ' + Date());
    Alert.alert('You tapped the button!')
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'powderblue'}}>
        <StatusBar hidden={true} />

        <AgendaC db={database}/>
        <Text>Open up App.js to start working on your app!</Text>
        <View>
          <Button
            onPress={this.onPressButton}
            title="Press Me"
          />
        </View>
        <Hyperlink linkStyle={ { color: '#2980b9', fontSize: 20 } } linkDefault={ true }>
          <Text style={ { fontSize: 15 } }>
          This text will be parsed to check for clickable strings like https://open.spotify.com/track/00FRRwuaJP9KimukvLQCOz and made clickable.
          </Text>
        </Hyperlink>



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
