import React from 'react';
import { ActivityIndicator, Alert, Button, Dimensions, 
  FlatList, Image, StatusBar, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { AgendaC } from './components/agenda.js';
import { Player } from './components/player.js';
import { DangerZone, Font, Video } from 'expo';
const { Lottie } = DangerZone;
const loadingAnimation = './assets/3713-loading.json';

import * as firebase from 'firebase';
import {firebaseConfig} from './components/firebaseInit.js'
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var storage = firebase.storage();

const window = Dimensions.get('window');

var today = getToday();

export default class App extends React.Component {
  constructor(props){
    super(props);
    console.ignoredYellowBox = ['Setting a timer'];
    console.disableYellowBox = true;

    this.state = {
      loaded: false,
      day: '2019-01-08',
    };    
    this.getData = this.getData.bind(this);
    this.getPlayerSong = this.getPlayerSong.bind(this);
    this.getOpenedDay = this.getOpenedDay.bind(this);
    this.getPressedSong = this.getPressedSong.bind(this);

    this.getFromFirebase(database, 'data', this.getData)
  }
  async componentDidMount(){
    console.log("App Mount:",this.state);
    this.animation.play();
    await Font.loadAsync({
      'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  getFromStorage(storage, file, callback){
    storage.ref().child(file).getDownloadURL().then((downloadURL) => {
      callback(downloadURLs);
    })
  }
  getData(snapshot, key){
    if(snapshot){
      console.log(key,' OBTAINED ]]]')
      let data = snapshot.val();
      data = data.filter((item) => item.date <= today);
      this.setState({[key]: data});
    }
  }
  getFromFirebase(database, key, callback){
    console.log('[[[ GETTING ',key);
    database.ref(key).once('value', snapshot => {
      callback(snapshot, key);
    }).then(() => {
      let songsOpened = [];
      this.state.data.forEach((item,index) => {songsOpened[index] = item.opened;});
      this.setState({
        loaded: true,
        playerSongIndex: this.state.data.length-1,
        pressedSongIndex: this.state.data.length-1,
        songsOpened: songsOpened
      },()=>{
        console.log("DATA LOADED");
      })
    });
  }
  getPlayerSong(playerSongIndex){
    console.log("playerSongIndex:", playerSongIndex);
    this.setState({
        day: this.state.data[playerSongIndex].date,
        playerSongIndex: playerSongIndex
    });
  }
  getOpenedDay(item){
    console.log("Item opened");
    let songsOpened = this.state.songsOpened
    console.log("Songs Opened1");
    //console.log(songsOpened);
    if(!songsOpened[item.id]){
      songsOpened[item.id] = true;
    }
    console.log("Songs Opened2");
    //console.log(songsOpened);
    this.setState({ 
      songsOpened: songsOpened 
    }, () => {
      // console.log(this.state.dataSongs); // further value
    });

  }
  getPressedSong(pressedSongIndex){
    this.player.updateSongIndex(pressedSongIndex);
  }
  render() {
    
    // <Player songs={this.state.data} songIndex={this.state.data.length-1} callback={this.getPlayerSong}/>
    // <ActivityIndicator size="large"/>
    // <Button
    //   onPress={this.testButton}
    //   title="Learn More"
    //   color="#7cc6fe"
    //   accessibilityLabel="Learn more about this purple button"
    // />
    return (
        <View style={{flex: 1, backgroundColor: '#eee'}}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
          hidden={true}
        />
          {this.state.loaded ? (
            <View style={{flex:1}}>
              <AgendaC 
              db={database} 
              data={this.state.data} 
              playerSongIndex={this.state.playerSongIndex} 
              openedCallback={this.getOpenedDay}
              pressedCallback={this.getPressedSong}/>
              <Player 
              ref={(p) => this.player = p}
              songs={this.state.data} 
              songsOpened={this.state.songsOpened}
              songCallback={this.getPlayerSong}
              />
            </View>
          ) : (
            <View style={styles.container}>
              <Lottie
                ref={animation => {this.animation = animation;}}
                source={require(loadingAnimation)}
                style={styles.lottieAnimation}
                resizeMode={'cover'}
              />
            </View>
          )}
        </View>
    );
  }
}

function getToday(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  return(today);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieAnimation:{
    width: 300,
    height:300,
  },
});


