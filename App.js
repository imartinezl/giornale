import React from 'react';
import { ActivityIndicator, Alert, Animated, Button, Dimensions, FlatList, 
  Image, LayoutAnimation, NativeModules, StatusBar, StyleSheet, Text, 
  TouchableHighlight, View } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
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

// const { UIManager } = NativeModules;
// UIManager.setLayoutAnimationEnabledExperimental &&
//   UIManager.setLayoutAnimationEnabledExperimental(true);


export default class App extends React.Component {
  constructor(props){
    super(props);
    console.ignoredYellowBox = ['Setting a timer'];

    this.state = {
      loaded: false,
      day: '2019-01-08',
      animatedValue: new Animated.Value(0),
    };    
    this.getData = this.getData.bind(this);
    this.getPlayerSong = this.getPlayerSong.bind(this);
    this.testButton = this.testButton.bind(this);

    // this.getFromFirebase(database, 'data', this.getData)
    this.handleScroll = this.handleScroll.bind(this)
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

    //<ActivityIndicator size="large"/>
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
             
              <AnimatedFlatList
                data={data}
                scrollEventThrottle={16}
                renderItem={({item, index}) => 
                  <Item 
                  item={item} 
                  index={index}
                  currentValue={this.state.currentValue}
                  animatedValue={this.state.animatedValue}
                  />
                }
                onScroll={
                Animated.event(
                  [{nativeEvent: {contentOffset: {y: this.state.animatedValue}}}],
                  {useNativeDriver: false}
                )}
                contentContainerStyle={styles.contentContainer}
                onContentSizeChange = {( contentWidth, contentHeight ) => {
                  this.contentHeight = contentHeight
                  // console.log("ContentHeight:",contentHeight);
                }}
               />
            </View>
          )}
        </View>
    );
  }
  handleScroll(event){
    // let yOffset = event.nativeEvent.contentOffset.y
    // let contentHeight = event.nativeEvent.contentSize.height
    // let value = yOffset / contentHeight
    // // console.log("yOffset:",yOffset);
    // // console.log("contentHeight:",contentHeight);
    // // console.log("Value:",value);
    // let x = (yOffset-containerPad)/itemHeight + offset
  }
}
const data = [{key: 'Devin'},{key: 'Jackson'},{key: 'James'},{key: 'Joel'},
{key: 'a'},{key: 'b'},{key: 'c'},{key: 'd'},{key: 'e'},{key: 'f'},{key: 'g'},{key: 'h'},
{key: '12'},{key: '13'},{key: '14'},{key: 'i'},{key: 'j'},{key: 'k'},{key: 'l'},{key: 'm'},
{key: 'n'},{key: 'o'},{key: 'p'},{key: 'q'},{key: 'r'},{key: 's'},{key: 't'},{key: 'u'},
{key: 'v'},{key: 'w'},{key: 'x'},{key: 'y'},{key: 'z'},{key: '1'},{key: '2'},{key: '3∫'}
]
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);


class Item extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }
  render(){

    let index = this.props.index;

    let i = this.props.animatedValue.interpolate({
      inputRange: [ (index+offset)*itemHeight, (index+offset+0.3)*itemHeight, (index+offset+0.8)*itemHeight, (index+offset+1)*itemHeight],
      outputRange: [itemHeight, itemHeight*4, itemHeight*4, itemHeight],
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp'
    });
    
    // LayoutAnimation.spring();
    // if(index==0){this.props.animatedValue.addListener((value) => {console.log(value.value, index)})}
    return(
      <View style={[styles.item]}>
        <Animated.View style={{height: i, backgroundColor:'blue'}}>
          <Text>Hola</Text>
        </Animated.View>
      </View>
    )
  }
  

}
const itemHeight = 80;
const containerPad = 80;
const offset = -0.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    // height: itemHeight,
    width: 300,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: 0,
  },
  itemView: {
    height: 150,
    width: 300,
    backgroundColor: 'red',
    borderWidth: 1.5,
    borderColor: 'blue',
  },
  itemText: {
    fontSize: 18,
  },
  contentContainer:{
    paddingTop: containerPad,
    paddingBottom: containerPad*10
  },
});

var today = new Date();
var yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const minDate = '2018-11-01';
const maxDate = '2019-01-08';//today;
const selected = '2019-01-05';//yesterday;


