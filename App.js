import React from 'react';
import { StyleSheet, Text, View, Alert, Button, StatusBar, Image } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import {Calendario} from './components/calendar.js';
import {AgendaC} from './components/agenda.js';


import * as firebase from 'firebase';
import {firebaseConfig} from './components/firebase_init.js'
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();
var storage = firebase.storage();



import { Video } from 'expo';

export default class App extends React.Component {
  constructor(props){
    super(props);
    console.ignoredYellowBox = ['Setting a timer'];

    this.state = {
      
    };

    this.onPressButton = this.onPressButton.bind(this);
    
    this.getMusicFile = this.getMusicFile.bind(this);
    this.getMusicCover = this.getMusicCover.bind(this);

    this.getFromStorage('image.jpg',this.getMusicCover);
    this.getFromStorage('test.mp3',this.getMusicFile);
  }
  componentDidMount(){
    console.log("App Mount:",this.state);
  }
  onPressButton() {
    Alert.alert('You tapped the button!')

  }
  getMusicFile(downloadURL){
    console.log(downloadURL);
    this.setState({
        musicFile: downloadURL
      })
  }
  getMusicCover(downloadURL){
    console.log(downloadURL);
    this.setState({
        musicCover: downloadURL
      })
  }
  getFromStorage(file, callback){
    storage.ref().child(file).getDownloadURL().then((downloadURL) => {
        callback(downloadURL);
    });
  }

  //<AgendaC db={database}/>
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#eee'}}>
        <StatusBar hidden={true} />

        
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
        <Image 
          style={{width: 50, height: 50}}
          source={{uri: this.state.musicCover}}
        />
        <Video
          source={{ uri: this.state.musicFile }}
          // posterSource={{uri: this.state.musicCover}}
          usePoster={true}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={false}
          isLooping={false}
          useNativeControls={true}
          style={styles.video}
        />




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
  video: {
    // flex:1,
    width:300,
    height:50,
  }
});
