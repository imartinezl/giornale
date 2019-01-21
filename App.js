import React from 'react';
import { ActivityIndicator, Alert, Button, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { Calendario } from './components/calendar.js';
import { AgendaC } from './components/agenda.js';
import { Player } from './components/player.js';


import * as firebase from 'firebase';
import {firebaseConfig} from './components/firebaseInit.js'
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();
var storage = firebase.storage();

export default class App extends React.Component {
  constructor(props){
    super(props);
    console.ignoredYellowBox = ['Setting a timer'];

    this.state = {
      loaded: false
    };    
    this.getData = this.getData.bind(this);

    this.getFromFirebase(database, 'data', this.getData)
  }

  componentDidMount(){
    console.log("App Mount:",this.state);
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
      this.setState({loaded: true},()=>{
        console.log("LOADED");
      })
    });
  }

  render() {
    // <StatusBar hidden={true} />
    // <Player artist={Artists[0]} songs={Artists[0].songs} songIndex={1}/>

    // <View style={styles.container}>
    // <Text style={{color: 'red', fontSize: 18}}>{"Hola"}</Text>
    // </View>
    return (
        <View style={{flex: 1, backgroundColor: '#eee'}}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
          hidden={true}
        />
          {this.state.loaded ? (
            <AgendaC db={database} data={this.state.data}/>
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


const Artists = [
  {
    name: "Breakbot",
    background: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/attachment_68585523.jpg",
    songs: [
      {
        title: "Star Tripper",
        album: "Still Waters",
        albumImage: "http://www.clashmusic.com/sites/default/files/field/image/Breakbot%20%20Still%20Waters.jpg",
        url: "http://www.largesound.com/ashborytour/sound/brobob.mp3",
      },
      {
        title: "You Should Know (feat. Ruckazoid)",
        album: "Still Waters",
        albumImage: "https://assets.trome.pe/files/ec_article_multimedia_gallery/uploads/2018/04/17/5ad609d27c1a7.jpeg",
        url: "http://www.largesound.com/ashborytour/sound/brobob.mp3",
      },
      {
        title: "Bedtime Stories Mix",
        album: "Mixtape",
        albumImage: "https://edbangerla.files.wordpress.com/2013/07/artworks-000052534531-4p2uyd-t500x500.jpg",
        url: "http://www.largesound.com/ashborytour/sound/brobob.mp3",
      },
      {
        title: "Nightcall",
        album: "By Your Side",
        albumImage: "https://fanart.tv/fanart/music/eb6de5f6-98f8-4b5a-bfdc-f87fa4936baa/artistbackground/-4f70ac2a1f207.jpg",
        url: "http://www.largesound.com/ashborytour/sound/brobob.mp3",
      },
      {
        title: "Baby",
        album: "By Your Side",
        albumImage: "https://upload.wikimedia.org/wikipedia/en/4/48/Pnau_alternate_cover.jpg",
        url: "http://www.largesound.com/ashborytour/sound/brobob.mp3",
      },
    ]
  },
  {
    name: "The Beatles",
    background: "http://jgnatch-dropshare.s3.amazonaws.com/Screen-Shot-2016-03-01-15-20-40/Screen-Shot-2016-03-01-15-20-40.png",
    songs: [
      {
        title: "Something",
        album: "Abbey Road",
        url: "https://mp3l.jamendo.com/?trackid=1314632&format=mp31&from=app-97dab294",
      },
      {
        title: "Hey Bulldog",
        album: "Yellow Submarine",
        url: "https://mp3l.jamendo.com/?trackid=1312012&format=mp31&from=app-97dab294",
      },
      {
        title: "Happiness is a Warm Gun",
        album: "The Beatles",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
      {
        title: "Maggie Mae",
        album: "Let It Be",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
      {
        title: "Polythene Pam",
        album: "Abbey Road",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
      {
        title: "Being For The Benefit Of Mr. Kite!",
        album: "Sgt. Pepper's Lonely Hearts Club Band",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
      {
        title: "I'm Only Sleeping",
        album: "Revolver",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
    ]
  },
  {
    name: "Daft Punk",
    background: "http://jgnatch-dropshare.s3.amazonaws.com/Screen-Shot-2016-03-01-15-25-13/Screen-Shot-2016-03-01-15-25-13.png",
    songs: [
      {
        title: "Giorgio",
        album: "Random Access Memories",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
      {
        title: "Face to Face",
        album: "Daft Club",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
      {
        title: "Robot Rock",
        album: "Human After All",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
      {
        title: "Ouverture",
        album: "Daft Club",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
      {
        title: "Alive",
        album: "Musique Vol 1",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
      {
        title: "Crescendolls",
        album: "Discovery",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
    ]
  },
  {
    name: "Pink Floyd",
    background: "http://jgnatch-dropshare.s3.amazonaws.com/Screen-Shot-2016-03-01-15-23-47/Screen-Shot-2016-03-01-15-23-47.png",
    songs: [
      {
        title: "Marooned",
        album: "The Division Bell",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
      {
        title: "Sorrow",
        album: "Delicate Sound of Thunder",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
      {
        title: "Yet Another Movie",
        album: "A Momentary Lapse of Reason",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
      {
        title: "One of the Few",
        album: "The Final Cut",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
    ]
  },
  {
    name: "Andy Allo",
    background: "http://jgnatch-dropshare.s3.amazonaws.com/Screen-Shot-2016-03-01-15-31-35/Screen-Shot-2016-03-01-15-31-35.png",
    songs: [
      {
        title: "Fly Away (feat. The Tones)",
        album: "UnFresh",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
    ]
  },
  {
    name: "Jamiroquai",
    background: "http://jgnatch-dropshare.s3.amazonaws.com/Screen-Shot-2016-03-01-15-33-17/Screen-Shot-2016-03-01-15-33-17.png",
    songs: [
      {
        title: "Seven Days in Sunny June",
        album: "Dyanmite",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
      {
        title: "Space Cowboy",
        album: "The Return of the Space Cowboy",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
    ]
  },
  {
    name: "Illya Kuryaki & The Valderramas",
    background: "http://jgnatch-dropshare.s3.amazonaws.com/Screen-Shot-2016-03-01-15-35-26/Screen-Shot-2016-03-01-15-35-26.png",
    songs: [
      {
        title: "Funky Futurista",
        album: "Chances",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
      {
        title: "Discovery Buda",
        album: "Versus",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
      {
        title: "Jaguar House",
        album: "Chaco",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
      {
        title: "Safari Espiritual",
        album: "Chances",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
      {
        title: "Expedicion al Klama Hama",
        album: "Versus",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
    ]
  },
  {
    name: "Soda Stereo",
    background: "http://cnnchile.com/uploads/imagenes/14344020424867_breaking.jpg",
    songs: [
      {
        title: "Un Misil En Mi Placard",
        album: "Comfort y Musica Para Volar",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
      {
        title: "Cuando Pase El Temblor",
        album: "Me Veras Volver",
        url: "https://www.freesound.org/data/previews/208/208096_3767678-lq.mp3",
      },
    ]
  },
]


