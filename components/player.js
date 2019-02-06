import React from 'react';
import { AppRegistry, Button, Component, Dimensions, Image, Modal, 
	Text, TouchableHighlight, ScrollView, Slider, StatusBar, StyleSheet, View} from 'react-native';


// import {Actions} from 'react-native-router-flux';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { Video } from 'expo';

const window = Dimensions.get('window');

const scrollBox = window.width - 60 - 55;

export class Player extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			playing: false,
			muted: false,
			shuffle: false,
			sliding: false,
			currentTime: 0,
			songIndex: this.props.songs.length-1,
			minified: true,
			loaded: false
		};
		// this.onSlidingStart = this.onSlidingStart.bind(this);
		this.onScroll = this.onScroll.bind(this);
	}
	componentDidMount(){
		console.log("Player Mount");
		if(this.state.minified){
			setTimeout(() => this.scroller.scrollTo({ x: scrollBox, y: 0, animated: false}) , 0);
		}
	}	
	componentWillUnmount() {
    	console.log("Player Unmount");
	}
	componentDidUpdate(){
		// console.log("Player Updated");
	}
	shouldComponentUpdate(nextProps, nextState) {

		return(true)
		console.log(this.props.songsOpened, nextProps.songsOpened)
	    if (JSON.stringify(this.props.songsOpened) !== JSON.stringify(nextProps.songsOpened) ){
			console.log("Player Should Update");
	    	return true;
	    }
		console.log("Player Should Not Update");
	    return false;
  	}

  	updateSongIndex(pressedSongIndex){
  		if(this.state.songIndex !== pressedSongIndex && this.state.loaded){
  			this.setState({
			  songIndex: pressedSongIndex,
			  currentTime: 0,
			  loaded: false,
			},()=>{
				// this.props.songCallback(this.state.songIndex);
				this.videoRef.setPositionAsync(0);
				console.log('UpdatedSongIndex');
			});
  		}
  	}

	togglePlay(){
		this.setState({ playing: !this.state.playing });
	}
	toggleVolume(){
		this.setState({ muted: !this.state.muted });
	}
	toggleShuffle(){
		this.setState({ shuffle: !this.state.shuffle });
	}	
	toggleMinify(){
		this.setState({ minified: !this.state.minified }, () => {
			if(this.state.minified){
				setTimeout(() => this.scroller.scrollTo({ x: scrollBox, y: 0, animated: true}) , 0);
			}
		});
	}
	goBackward(){
		if(this.state.currentTime < 3000 && this.state.songIndex !== 0){
			this.setState({
				songIndex: this.state.songIndex - 1,
				currentTime: 0,
			},()=>{
				this.props.songCallback(this.state.songIndex);
				console.log('Prev');
			});
		} else {
			this.videoRef.setPositionAsync(0);
			this.setState({
				currentTime: 0,
			});
		}
	}
	goForward(){
		if(this.state.songIndex !== (this.props.songs.length - 1)){
			this.setState({
			  songIndex: this.state.shuffle ? this.randomSongIndex() : this.state.songIndex + 1,
			  currentTime: 0,
			},()=>{
				this.props.songCallback(this.state.songIndex);
				console.log('Next');
			});
			this.videoRef.setPositionAsync(0);
		}
	}
	randomSongIndex(){
		let maxIndex = this.props.songs.length - 1;
		return Math.floor(Math.random() * (maxIndex - 0 + 1)) + 0;
	}
	setTime(params){
		if( !this.state.sliding ){
			this.setState({ currentTime: params.positionMillis });
		}
		if(params.didJustFinish){
			this.goForward();
		}
	}
	onLoad(params){
		console.log("song loaded");
		this.setState({ 
			songDuration: params.durationMillis,
			loaded: true
		});
		// this.videoRef.setPositionAsync(0);
	}
	onSlidingChange(value){
		this.setState({ sliding: true });
	}
	onSlidingComplete(value){
		let newPosition = value * this.state.songDuration;
		this.videoRef.setPositionAsync( newPosition );
		this.setState({ sliding: false });
	}
	onScroll(event){
		let posX = event.nativeEvent.contentOffset.x;
		if(posX > scrollBox){
			this.goForward();
		}else if(posX < scrollBox){
			this.goBackward();
		}
		this.scroller.scrollTo({ x: scrollBox, y: 0, animated: true});

	}
	render() {
		let songPlaying = this.props.songs[this.state.songIndex];
		if(!this.props.songsOpened[this.state.songIndex]){
			songPlaying = nullSongPlaying;
		}

		let songPercentage;
		if( this.state.songDuration !== undefined ){
			songPercentage = this.state.currentTime / this.state.songDuration;
		} else {
			songPercentage = 0;
		}
		let playButton;
		if( this.state.playing){
			playButton = <Ionicons onPress={ this.togglePlay.bind(this) } style={ styles.play } name="ios-pause" size={60} color="#19191c" />;
		} else {
			playButton = <Ionicons onPress={ this.togglePlay.bind(this) } style={ styles.play } name="ios-play" size={60} color="#19191c" />;
		}
		let playButtonMin;
		if( this.state.playing){
			playButtonMin = <Ionicons onPress={ this.togglePlay.bind(this) } style={ styles.playMin } name="ios-pause" size={30} color="#f62976" />;
		} else {
			playButtonMin = <Ionicons onPress={ this.togglePlay.bind(this) } style={ styles.playMin } name="ios-play" size={30} color="#f62976" />;
		}
		let forwardButton;
		if( !this.state.shuffle && this.state.songIndex + 1 === this.props.songs.length){
			forwardButton = <Ionicons style={ styles.forward } name="ios-skip-forward" size={36} color="#ababac" />;
		} else {
			forwardButton = <Ionicons onPress={ this.goForward.bind(this) } style={ styles.forward } name="ios-skip-forward" size={36} color="#19191c" />;
		}
		let forwardButtonMin;
		if( !this.state.shuffle && this.state.songIndex + 1 === this.props.songs.length){
			forwardButtonMin = <Ionicons style={ styles.forwardMin } name="ios-skip-forward" size={30} color="#ababac" />;
		} else {
			forwardButtonMin = <Ionicons style={ styles.forwardMin } name="ios-skip-forward" size={30} color="#19191c" />;
		}
		let backwardButton;
		if( !this.state.shuffle && this.state.songIndex === 0){
			backwardButton = <Ionicons style={ styles.backward } name="ios-skip-backward" size={36} color="#ababac" />;
		} else {
			backwardButton = <Ionicons onPress={ this.goBackward.bind(this) } style={ styles.backward } name="ios-skip-backward" size={36} color="#19191c" />;
		}
		let backwardButtonMin;
		if( !this.state.shuffle && this.state.songIndex === 0){
			backwardButtonMin = <Ionicons style={ styles.backwardMin } name="ios-skip-backward" size={30} color="#ababac" />;
		} else {
			backwardButtonMin = <Ionicons style={ styles.backwardMin } name="ios-skip-backward" size={30} color="#19191c" />;
		}
		let volumeButton;
		if( this.state.muted ){
			volumeButton = <Ionicons onPress={ this.toggleVolume.bind(this) } style={ styles.volume } name="ios-volume-off" size={28} color="#19191c" />;
		} else {
			volumeButton = <Ionicons onPress={ this.toggleVolume.bind(this) } style={ styles.volume } name="ios-volume-high" size={28} color="#19191c" />;
		}
		let shuffleButton;
		if( this.state.shuffle ){
			shuffleButton = <Ionicons onPress={ this.toggleShuffle.bind(this) } style={ styles.shuffle } name="ios-shuffle" size={28} color="#f62976" />;
		} else {
			shuffleButton = <Ionicons onPress={ this.toggleShuffle.bind(this) } style={ styles.shuffle } name="ios-shuffle" size={28} color="#19191c" />;
		}
		let image = songPlaying.albumImage;// ? songPlaying.albumImage : this.props.artist.background;
		return (
			<View style={styles.container}>
                <Video source={{uri: songPlaying.songFile }}
					ref={(ref) => { this.videoRef = ref; }}
					rate={1.0}
					volume={ this.state.muted ? 0 : 1.0}
					isMuted={false}
					shouldPlay={this.state.playing}
					onLoad={ this.onLoad.bind(this) }
					onPlaybackStatusUpdate={ this.setTime.bind(this) }
					isLooping={false}/>
				<Modal
		          animationType="slide"
		          transparent={true}
		          visible={!this.state.minified}
		          onRequestClose={this.toggleMinify.bind(this)}>
                <View style={styles.containerModal}>
					<View style={ styles.header }>
						<Text style={ styles.albumTitle }>
							{ songPlaying.album }
						</Text>
					</View>
					<View style={ styles.headerClose }>
						<Ionicons style={ styles.headerCloseIcon } onPress={ this.toggleMinify.bind(this) } name="ios-arrow-down" size={25} color="#ababac" />
					</View>
					<View style={ styles.songImage }>
					<Image
						source={{uri: image,
						width: window.width - 50,
						height: window.width - 50}}
						borderRadius={15}/>
					</View>
					<Text style={ styles.songTitle }>
						{ songPlaying.title }
					</Text>
					<Text style={ styles.artistTitle }>
						{ songPlaying.artist}
					</Text>
					<View style={ styles.sliderContainer }>
						<Slider
							onSlidingComplete={ this.onSlidingComplete.bind(this) }
							onValueChange={ this.onSlidingChange.bind(this) }
							style={ styles.slider }
							minimumTrackTintColor='#767488'
							thumbTintColor='#19191c'
							maximumTrackTintColor='#bab9c3'
							value={ songPercentage }/>

						<View style={ styles.timeInfo }>
							<Text style={ styles.time }>{ formattedTime(this.state.currentTime/1000)  }</Text>
							<Text style={ styles.timeRight }> - { formattedTime( (this.state.songDuration - this.state.currentTime)/1000 ) }</Text>
						</View>
					</View>
					<View style={ styles.controls }>
						{ shuffleButton }
						{ backwardButton }
						{ playButton }
						{ forwardButton }
						{ volumeButton }
					</View>
				</View>
                </Modal>
                { this.state.minified && (
					<View style={ styles.containerMin }>
						<View style={ styles.controlsMin }>
							<TouchableHighlight	onPress={this.toggleMinify.bind(this)} underlayColor={"#fff"}>
								<Image
									source={{uri: image,
									width: 60,
									height: 60}}/>
							</TouchableHighlight>
							
							<ScrollView 
							contentContainerStyle={{ flexGrow: 1 }}
							ref={(scroller) => {
								this.scroller = scroller;
							}}
							horizontal={true} 
							pagingEnabled={true} 
							showsHorizontalScrollIndicator={false}
							onMomentumScrollEnd={this.onScroll}
							>
								<View style={styles.scrollContainer}>
									{backwardButtonMin}
								</View>
								<View style={styles.scrollContainer}>
								<TouchableHighlight	onPress={this.toggleMinify.bind(this)} underlayColor={"#fff"}>
									<View>
										<Text style={ styles.songTitleMin }>
											{ songPlaying.title }
										</Text>
										<Text style={ styles.artistTitleMin }>
											{ songPlaying.artist }
										</Text>
									</View>
								</TouchableHighlight>
								</View>
								<View style={styles.scrollContainer}>
									{forwardButtonMin}
								</View>
							</ScrollView>
							
							{ playButtonMin }
						</View>
					</View>
                )}
			</View>
		)
	}
}
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    height: 60,
    marginTop: 'auto',
    alignItems: 'center',
    backgroundColor: '#f9fcff',
  },
  containerModal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f9fcff',
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
    width: window.width-100,
  },
  headerClose: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  headerCloseIcon: {
  	paddingTop: 10,
  	paddingBottom: 10,
  	paddingLeft: 15,
  	paddingRight: 15,
  },
  albumTitle: {
    color: "#ababac",
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    textAlign: 'center',
  },
  songImage: {
    backgroundColor: '#f9fcff',
    borderRadius:15,
    margin: 8,
    elevation: 15,
  },
  songTitle: {
    color: "#19191c",
    fontFamily: "Roboto-Bold",
    marginBottom: 8,
    marginTop: 8,
    fontSize: 19,
    textAlign: 'center',
  },
  artistTitle: {
    color: "#ababac",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    marginTop: 0,
  },
  play: {
	paddingTop: 12,
  	paddingBottom: 12,
  	paddingLeft: 20,
  	paddingRight: 20,
  },
  backward: {
    paddingTop: 24,
  	paddingBottom: 24,
  	paddingLeft: 15,
  	paddingRight: 15,
  },
  forward: {
    paddingTop: 24,
  	paddingBottom: 24,
  	paddingLeft: 15,
  	paddingRight: 15,
  },
  shuffle: {
    paddingTop: 28,
  	paddingBottom: 28,
  	paddingLeft: 15,
  	paddingRight: 15,
  },
  volume: {
    paddingTop: 28,
  	paddingBottom: 28,
  	paddingLeft: 15,
  	paddingRight: 15,
  },
  sliderContainer: {
    width: window.width - 40,
  },
  timeInfo: {
    flexDirection: 'row',
  },
  time: {
    color: '#19191c',
    flex: 1,
    fontSize: 12,
  },
  timeRight: {
    color: '#19191c',
    textAlign: 'right',
    flex: 1,
    fontSize: 12,
  },
  slider: {
    height: 20,
  },
  containerMin:{
  	position: 'absolute',
  	bottom: 0,
  },
  controlsMin: {
    flexDirection: 'row',
    marginTop: 30,
    width: window.width,
    backgroundColor: '#fff',
  	borderTopWidth: 2,
    borderTopColor: '#f62976',
  },
  songTitleMin: {
    color: "#19191c",
    fontFamily: "Roboto-Bold",
	paddingTop: 5,
  	paddingBottom: 0,
  	paddingLeft: 10,
  	paddingRight: 0,
    fontSize: 14,
  },
  artistTitleMin: {
    color: "#ababac",
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    paddingTop: 0,
  	paddingBottom: 0,
  	paddingLeft: 10,
  	paddingRight: 0,
  },
  playMin: {
	paddingTop: 15,
  	paddingBottom: 15,
  	paddingLeft: 20,
  	paddingRight: 20,
  	marginLeft: 'auto',
  },
  scrollContainer:{
  	width: scrollBox
  },
  forwardMin: {
    paddingTop: 15,
  	paddingBottom: 15,
  	paddingLeft: 40,
  	paddingRight: 20,
  	marginRight: 'auto',
  },
  backwardMin: {
    paddingTop: 15,
  	paddingBottom: 15,
  	paddingLeft: 20,
  	paddingRight: 40,
  	marginLeft: 'auto',
  },
});

//TODO: Move this to a Utils file
function withLeadingZero(amount){
  if (amount < 10 ){
    return `0${ amount }`;
  } else {
    return `${ amount }`;
  }
}

function formattedTime( timeInSeconds ){
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds - minutes * 60;

  if( isNaN(minutes) || isNaN(seconds) ){
    return "";
  } else {
    return(`${ withLeadingZero( minutes ) }:${ withLeadingZero( seconds.toFixed(0) ) }`);
  }
}

let nullSongPlaying = {
  "title": "«««««««««««««",
  "artist": "«««««««««",
  "album": "«««««««««",
  "albumImage": 'https://firebasestorage.googleapis.com/v0/b/giornale-ac271.appspot.com/o/emptyAlbum.jpg?alt=media&token=cc22cb45-1170-4b4a-b69f-ed96b5b7fa20',
  "songFile": 'http://cdn-data.motu.com/media/ethno/demo-audio/mp3/02-Africa.mp3',
  "liked": false,
  "opened": false
}

