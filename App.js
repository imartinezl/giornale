import React from 'react';
import { ActivityIndicator, Alert, Animated, Button, Dimensions, FlatList, 
  Image, StatusBar, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import { Calendario } from './components/calendar.js';
import { AgendaC } from './components/agenda.js';
import { Player } from './components/player.js';

import { Font, Video } from 'expo';

import * as firebase from 'firebase';
import {firebaseConfig} from './components/firebaseInit.js'
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();
var storage = firebase.storage();

const window = Dimensions.get('window');

export default class App extends React.Component {
  constructor(props){
    super(props);
    console.ignoredYellowBox = ['Setting a timer'];
    console.disableYellowBox = true;

    this.state = {
      loaded: false,
      day: '2019-01-08',
      animatedValue: new Animated.Value(0),
    };    
    this.getData = this.getData.bind(this);
    this.getPlayerSong = this.getPlayerSong.bind(this);
    this.testButton = this.testButton.bind(this);

    this.getFromFirebase(database, 'data', this.getData)
  }
  async componentDidMount(){
    console.log("App Mount:",this.state);
    await Font.loadAsync({
      'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  getFromStorage(storage, file, callback){
    // console.log("File:",file);
    storage.ref().child(file).getDownloadURL().then((downloadURL) => {
      callback(downloadURLs);
    })
  }
  getData(snapshot, key){
    if(snapshot){
      console.log(key,' OBTAINED ]]]')
      this.setState({[key]: snapshot.val()});
    }
  }
  getFromFirebase(database, key, callback){
    console.log('[[[ GETTING ',key);
    database.ref(key).once('value', snapshot => {
      callback(snapshot, key);
    }).then(() => {
      this.setState({
        loaded: true,
        songIndex: this.state.data.length-1
      },()=>{
        console.log("LOADED");
      })
    });
  }
  getPlayerSong(songIndex){
    console.log("SongIndex:", songIndex);
    this.setState({
        day: this.state.data[songIndex].date,
        songIndex: songIndex
    });
  }
  testButton(){
    this.setState({
        songIndex: this.state.songIndex-1
    },() =>{
      console.log(this.state.songIndex);
    });
  }
  render() {
    // <StatusBar hidden={true} />
    // <Player songs={this.state.data} songIndex={this.state.data.length-1} callback={this.getPlayerSong}/>
    
    return (
        <View style={{flex: 1, backgroundColor: '#eee'}}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
          hidden={true}
        />
          {this.state.loaded ? (
            <View style={{flex:1}}>
              <AgendaC db={database} data={this.state.data} songIndex={this.state.songIndex}/>
              <Button
                onPress={this.testButton}
                title="Learn More"
                color="#7cc6fe"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          ) : (
            <View style={styles.container}>
              <ActivityIndicator size="large"/>
            </View>
          )}
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

var today = new Date();
var yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const minDate = '2018-11-01';
const maxDate = '2019-01-08';//today;
const selected = '2019-01-05';//yesterday;
