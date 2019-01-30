import React from 'react';
import { Animated, Dimensions, Easing, Image, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';

const window = Dimensions.get('window');

export class AgendaItem extends React.Component {
	constructor(props){
		super(props);
    
		this.state = {
			
		};
    this.storeInFirebase = this.storeInFirebase.bind(this);
    this.getLike = this.getLike.bind(this);

    this.getFromFirebase(this.props.db, 'data/' + this.props.item.id + '/liked', this.getLike)
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
        <RectButton style={styles.leftAction} onPress={this.likeAction}>
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
  likeAction = () => {
    this.storeInFirebase(this.props.db, 'data/' + this.props.item.id, 'liked', !this.state.liked);
    this.setState({
      liked: !this.state.liked
    });
    this._swipeableRow.close();
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
      // let heart = this.props.item.liked ? "ios-heart" : "ios-heart-dislike";
      return (
        <RectButton style={styles.rightAction} onPress={this.close}>
          <Animated.View
            style={
              {
                opacity: scale,
                transform: [{ translateX: trans }],
              }
            }>
          <Ionicons name="ios-heart" size={40} color="white" />
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
    console.log("onSwipeableLeftOpen")
  }
  onSwipeableRightOpen(){
    console.log("onSwipeableRightOpen")
  }
  handleMusicPlay(){
  	console.log("play music")
  }

  render() {
    let d = new Date(this.props.item.date);
    let day = ("0" + d.getDate()).slice(-2);
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    return (
        <Swipeable 
        ref={this.updateRef.bind(this)}
        friction={3}
        leftThreshold={40}
        rightThreshold={40}
        renderLeftActions={this.renderLeftActions.bind(this)}
        renderRightActions={this.renderRightActions.bind(this)}
        onSwipeableRightOpen={this.onSwipeableRightOpen.bind(this)}
        onSwipeableLeftOpen={this.onSwipeableLeftOpen.bind(this)}
        >
        <View style={styles.item}>

          
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

      </View>
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


