import React from 'react';
import { AppRegistry, Button, Component, Dimensions, Image, Modal, 
	Text, TouchableHighlight, Slider, StyleSheet, View} from 'react-native';


// import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Font, Video } from 'expo';

const window = Dimensions.get('window');

export class Player extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		      playing: false,
		      muted: false,
		      shuffle: false,
		      sliding: false,
		      currentTime: 0,
		      songIndex: this.props.songIndex,
		      minified: false,
		      fontLoaded: false,
		};
		// this.onSlidingStart = this.onSlidingStart.bind(this);
		// this.onSlidingChange = this.onSlidingChange.bind(this);
		// this.onSlidingComplete = this.onSlidingComplete.bind(this);
		this.toggleMinify = this.toggleMinify.bind(this);
	}
	async componentDidMount(){
		await Font.loadAsync({
			'Roboto-Condensed': require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
		});
		this.setState({ fontLoaded: true });
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
		this.setState({ minified: !this.state.minified });
	}
	goBackward(){
		if(this.state.currentTime < 3000 && this.state.songIndex !== 0 ){
			this.setState({
				songIndex: this.state.songIndex - 1,
				currentTime: 0,
			});
		} else {
			this.videoRef.setPositionAsync(0);
			this.setState({
				currentTime: 0,
			});
		}
	}
	goForward(){
		this.setState({
		  songIndex: this.state.shuffle ? this.randomSongIndex() : this.state.songIndex + 1,
		  currentTime: 0,
		});
		this.videoRef.setPositionAsync(0);
	}
	randomSongIndex(){
		let maxIndex = this.props.songs.length - 1;
		return Math.floor(Math.random() * (maxIndex - 0 + 1)) + 0;
	}
	setTime(params){
		if( !this.state.sliding ){
			this.setState({ currentTime: params.positionMillis });
		}
	}
	onLoad(params){
		this.setState({ songDuration: params.durationMillis });
	}
	onSlidingChange(value){
		this.setState({ sliding: true });
	}
	onSlidingComplete(value){
		let newPosition = value * this.state.songDuration;
		this.videoRef.setPositionAsync( newPosition );
		this.setState({ sliding: false });
	}
	onEnd(){
		this.setState({ playing: false });
	}
	render() {
		let songPlaying = this.props.songs[this.state.songIndex];
		let songPercentage;
		if( this.state.songDuration !== undefined ){
			songPercentage = this.state.currentTime / this.state.songDuration;
		} else {
			songPercentage = 0;
		}
		let playButton;
		if( this.state.playing ){
			playButton = <Icon onPress={ this.togglePlay.bind(this) } style={ styles.play } name="ios-pause" size={70} color="#fff" />;
		} else {
			playButton = <Icon onPress={ this.togglePlay.bind(this) } style={ styles.play } name="ios-play" size={70} color="#fff" />;
		}
		let forwardButton;
		if( !this.state.shuffle && this.state.songIndex + 1 === this.props.songs.length ){
			forwardButton = <Icon style={ styles.forward } name="ios-skip-forward" size={25} color="#333" />;
		} else {
			forwardButton = <Icon onPress={ this.goForward.bind(this) } style={ styles.forward } name="ios-skip-forward" size={25} color="#fff" />;
		}
		let backwardButton;
		if( !this.state.shuffle && this.state.songIndex === 0 ){
			backwardButton = <Icon style={ styles.back } name="ios-skip-backward" size={25} color="#333" />;
		} else {
			backwardButton = <Icon onPress={ this.goBackward.bind(this) } style={ styles.back } name="ios-skip-backward" size={25} color="#fff" />;
		}
		let volumeButton;
		if( this.state.muted ){
			volumeButton = <Icon onPress={ this.toggleVolume.bind(this) } style={ styles.volume } name="ios-volume-off" size={18} color="#fff" />;
		} else {
			volumeButton = <Icon onPress={ this.toggleVolume.bind(this) } style={ styles.volume } name="ios-volume-up" size={18} color="#fff" />;
		}
		let shuffleButton;
		if( this.state.shuffle ){
			shuffleButton = <Icon onPress={ this.toggleShuffle.bind(this) } style={ styles.shuffle } name="ios-shuffle" size={18} color="#f62976" />;
		} else {
			shuffleButton = <Icon onPress={ this.toggleShuffle.bind(this) } style={ styles.shuffle } name="ios-shuffle" size={18} color="#fff" />;
		}
		let image = songPlaying.albumImage ? songPlaying.albumImage : this.props.artist.background;
		return (
			<View style={styles.container}>
                <Video source={{uri: songPlaying.url }}
					ref={(ref) => { this.videoRef = ref; }}
					rate={1.0}
					volume={ this.state.muted ? 0 : 1.0}
					isMuted={false}
					shouldPlay={this.state.playing}
					onLoad={ this.onLoad.bind(this) }
					onPlaybackStatusUpdate={ this.setTime.bind(this) }
					// onEnd={ this.onEnd.bind(this) }
					// resizeMode="cover"
					isLooping={false}/>

				<Modal
		          animationType="slide"
		          transparent={false}
		          visible={!this.state.minified}
		          onRequestClose={this.toggleMinify}>
                <View style={styles.opened}>
					<View style={ styles.header }>
						<Text style={ styles.headerText }>
							{ this.props.artist.name }
						</Text>
					</View>
					<View style={ styles.headerClose }>
						<Icon style={ styles.headerCloseIcon } onPress={ this.toggleMinify } name="ios-arrow-down" size={25} color="#fff" />
					</View>
					<Image
						style={ styles.songImage }
						source={{uri: image,
						width: window.width - 30,
						height: 300}}/>
					{this.state.fontLoaded ? (
						<Text style={ styles.songTitle }>
							{ songPlaying.title }
						</Text>
					): null}
					{this.state.fontLoaded ? (
						<Text style={ styles.albumTitle }>
							{ songPlaying.album }
						</Text>
					): null}
					<View style={ styles.sliderContainer }>
						<Slider
							// onSlidingStart={ this.onSlidingStart.bind(this) }
							onSlidingComplete={ this.onSlidingComplete.bind(this) }
							onValueChange={ this.onSlidingChange.bind(this) }
							minimumTrackTintColor='#851c44'
							style={ styles.slider }
							// trackStyle={ styles.sliderTrack }
							// thumbStyle={ styles.sliderThumb }
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
                <View style={styles.minified}>
					<TouchableHighlight	
						onPress={this.toggleMinify}>
                		<Text style={{color: 'red'}}> Alo </Text>
					</TouchableHighlight>

                </View>
                )}
			</View>
		)
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#040126',
  },
  header: {
    marginTop: 17,
    marginBottom: 17,
    width: window.width,
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
  headerText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: 'center',
  },
  songImage: {
    marginBottom: 20,
  },
  songTitle: {
    color: "white",
    fontFamily: "Roboto-Condensed",
    marginBottom: 10,
    marginTop: 13,
    fontSize: 19
  },
  albumTitle: {
    color: "#BBB",
    fontFamily: "Roboto-Condensed",
    fontSize: 14,
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    marginTop: 30,
  },
  back: {
    marginTop: 22,
    marginLeft: 45,
  },
  play: {
    marginLeft: 50,
    marginRight: 50,
  },
  forward: {
    marginTop: 22,
    marginRight: 45,
  },
  shuffle: {
    marginTop: 26,
  },
  volume: {
    marginTop: 26,
  },
  sliderContainer: {
    width: window.width - 40,
  },
  timeInfo: {
    flexDirection: 'row',
  },
  time: {
    color: '#FFF',
    flex: 1,
    fontSize: 10,
  },
  timeRight: {
    color: '#FFF',
    textAlign: 'right',
    flex: 1,
    fontSize: 10,
  },
  slider: {
    height: 20,
  },
  sliderTrack: {
    height: 2,
    backgroundColor: '#333',
  },
  sliderThumb: {
    width: 10,
    height: 10,
    backgroundColor: '#f62976',
    borderRadius: 10 / 2,
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 1,
  },
  minified:{
  	position: 'absolute',
  	bottom: 0,
  },
  opened: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#040126',
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

