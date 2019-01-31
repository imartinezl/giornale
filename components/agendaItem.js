import React from 'react';
import { Animated, Dimensions, Easing, Image, Linking, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';

const window = Dimensions.get('window');

const emptyAlbum = '../assets/emptyAlbum.jpg';

export class AgendaItem extends React.Component {
	constructor(props){
		super(props);

		this.state = {
      liked: this.props.item.liked,
			opened: this.props.item.opened,
      opacity: new Animated.Value(1)
		};
    this.storeInFirebase = this.storeInFirebase.bind(this);
    this.getLike = this.getLike.bind(this);
    this.likeAction = this.likeAction.bind(this);

    // this.getFromFirebase(this.props.db, 'data/' + this.props.item.id + '/liked', this.getLike)
  }
  componentDidMount() {
    
  }
  componentWillUnmount() {

  }
  componentDidUpdate() {
      
  }
  getLike(snapshot, key){
    if(snapshot){
      console.log(key,' OBTAINED ]]]')
      this.setState({liked: snapshot.val()});
    }
  }
  getFromFirebase(database, key, callback){
    console.log('[[[ GETTING ',key);
    database.ref(key).once('value', snapshot => {
      callback(snapshot, key);
    })
  }
  storeInFirebase(database, key, field, value){
    console.log('Stored in FB! ',value)
    database.ref(key).update({
      [field]: value,
    });
  }
  likeAction = () => {
    this.storeInFirebase(this.props.db, 'data/' + this.props.item.id, 'liked', !this.state.liked);
    this.props.likedCallback(this.props.item, !this.state.liked);
    this.setState({
      liked: !this.state.liked
    },()=>{
      this._swipeableRow.close();
    });
  }
  spotifyAction = () => {
    let url = this.props.item.spotify;
    Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('An error occurred', err));
    this._swipeableRow.close();
  }
  renderLeftActions = (progress, dragX) => {

      const trans = dragX.interpolate({
        inputRange: [0, 80],
        outputRange: [-30, 20],
        extrapolate: 'clamp',
      });
      const scale = dragX.interpolate({
        inputRange: [0, 80],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      });
      
      return (
        <RectButton style={styles.leftAction} onPress={this.spotifyAction}>
          <Animated.View
            style={
              {
                opacity: scale,
                transform: [{ translateX: trans }],
              }
            }>
          <SimpleLineIcons name="social-spotify" size={40} color="white" />
          </Animated.View>
        </RectButton>
      );
  }
  renderRightActions = (progress, dragX) => {

      const trans = dragX.interpolate({
        inputRange: [-80, 0],
        outputRange: [-20, 30],
        extrapolate: 'clamp',
      });
      const scale = dragX.interpolate({
        inputRange: [-80, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });
      let heart = !this.state.liked ? "ios-heart" : "ios-heart-dislike";
      return (
        <RectButton style={styles.rightAction} onPress={this.likeAction}>
          <Animated.View
            style={
              {
                opacity: scale,
                transform: [{ translateX: trans }],
              }
            }>
          <Ionicons name={heart} size={40} color="white" />
          </Animated.View>
        </RectButton>
      );
  }
  updateRef = (ref) => {
    this._swipeableRow = ref;
  }
  close = () => {
    this._swipeableRow.close();
  }
  onSwipeableLeftOpen(){
    console.log("onSwipeableLeftOpen");
    this.spotifyAction();
  }
  onSwipeableRightOpen(){
    console.log("onSwipeableRightOpen");
    this.likeAction();
  }
  onSwipeableLeftWillOpen(){
    console.log("onSwipeableLeftWillOpen");
    // this.spotifyAction();
  }
  onSwipeableRightWillOpen(){
    console.log("onSwipeableRightWillOpen");
    // this.likeAction();
  }
  handleMusicPlay(){
  	console.log("play music")
  }
  opened(){
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 2000,
    }).start(()=>{
      this.setState({
        opened: !this.state.opened
      },()=>{
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 2000,
        }).start();
      })
    });

  }

  render() {
    let d = new Date(this.props.item.date);
    let day = ("0" + d.getDate()).slice(-2);
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    if(!this.state.opened){
      return(
        <TouchableOpacity onPress={this.opened.bind(this)}>
        <Animated.View style={[styles.item, {opacity: this.state.opacity}]}>

          
          <View style={styles.date}>
            <Text allowFontScaling={false} style={styles.day}>{day}</Text>
            <Text allowFontScaling={false} style={styles.month}>{month}</Text>
          </View>
          
          <View style={styles.textContainer}>
              <Text allowFontScaling={false} style={[styles.title, {textDecorationLine: 'line-through'}]}>
                {"«".repeat(this.props.item.title.length)}
              </Text>
              <Text allowFontScaling={false} style={[styles.artist, {textDecorationLine: 'line-through'}]}>
                {"«".repeat(this.props.item.artist.length)}
              </Text>
          </View>

          <Image
            style={styles.image}
            source={require(emptyAlbum)}
            resizeMode={'cover'}
          />
        </Animated.View>
        </TouchableOpacity>
      )
    }
    return(
      <Swipeable 
      ref={this.updateRef.bind(this)}
      friction={2}
      leftThreshold={60}
      rightThreshold={60}
      renderLeftActions={this.renderLeftActions.bind(this)}
      renderRightActions={this.renderRightActions.bind(this)}
      onSwipeableLeftOpen={this.onSwipeableLeftOpen.bind(this)} 
      onSwipeableRightOpen={this.onSwipeableRightOpen.bind(this)}
      onSwipeableLeftWillOpen={this.onSwipeableLeftWillOpen.bind(this)}
      onSwipeableRightWillOpen={this.onSwipeableRightWillOpen.bind(this)}
      >
        <Animated.View style={[styles.item, {opacity: this.state.opacity}]}>

          
          <View style={styles.date}>
            <Text allowFontScaling={false} style={styles.day}>{day}</Text>
            <Text allowFontScaling={false} style={styles.month}>{month}</Text>
          </View>
          
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={this.handleMusicPlay.bind(this)}>
              <Text allowFontScaling={false} style={styles.title}>{this.props.item.title}</Text>
              <Text allowFontScaling={false} style={styles.artist}>{this.props.item.artist}</Text>
            </TouchableOpacity> 
          </View>

          <Image
            style={styles.image}
            source={{uri: this.props.item.albumImage}}
            resizeMode={'cover'}
          />
        </Animated.View>
			</Swipeable>
    )
  }
}


const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  	backgroundColor: '#FFF',
  	marginTop: 8,
  	marginBottom: 8,
    marginLeft: 10,
    marginRight: 10,
    padding: 0,
  	borderRadius: 15,
  	elevation: 5
  },
  image:{
    width: 70,
    height: 70,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 8,
  },
  textContainer:{
  	flex: 1,
  	justifyContent: 'center',
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#002642'
  },
  title:{
  	fontFamily: "Roboto-Bold",
  	fontSize: 16,
    textAlign: 'left',
  },
  artist:{
  	fontFamily: "Roboto-Regular",
  	fontSize: 16,
    textAlign: 'left',
    flexWrap: 'wrap',
    color: '#aaa',
  },
  album:{
  	fontFamily: "Roboto-Regular",
  	fontSize: 16,
    textAlign: 'right',
  },
  date: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  day: {
    fontSize: 16,
    fontFamily: "Roboto-Bold",
    color: '#000',
  },
  month: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: '#aaa',
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#1db954',
    justifyContent: 'center',
  },
  rightAction: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: '#e4405f',
    justifyContent: 'center',
  },
});


