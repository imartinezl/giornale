import React from 'react';
import { AppRegistry, Button, Component, Dimensions, Image, Modal, 
	Text, TouchableHighlight, ScrollView, Slider, StyleSheet, View} from 'react-native';


// import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Font, Video } from 'expo';

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
		      songIndex: this.props.songIndex,
		      minified: true,
		      fontLoaded: false,
		};
		// this.onSlidingStart = this.onSlidingStart.bind(this);
		this.onScroll = this.onScroll.bind(this);
	}
	async componentDidMount(){
		await Font.loadAsync({
			'Roboto-Regular': require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
			'Roboto-Bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
		});
		this.setState({ fontLoaded: true });
		if(this.state.minified){
			setTimeout(() => this.scroller.scrollTo({ x: scrollBox, y: 0, animated: false}) , 0);
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
		if(this.state.songIndex !== (this.props.songs.length - 1) ){
			this.setState({
			  songIndex: this.state.shuffle ? this.randomSongIndex() : this.state.songIndex + 1,
			  currentTime: 0,
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
		let songPercentage;
		if( this.state.songDuration !== undefined ){
			songPercentage = this.state.currentTime / this.state.songDuration;
		} else {
			songPercentage = 0;
		}
		let playButton;
		if( this.state.playing ){
			playButton = <Icon onPress={ this.togglePlay.bind(this) } style={ styles.play } name="ios-pause" size={60} color="#fff" />;
		} else {
			playButton = <Icon onPress={ this.togglePlay.bind(this) } style={ styles.play } name="ios-play" size={60} color="#fff" />;
		}
		let playButtonMin;
		if( this.state.playing ){
			playButtonMin = <Icon onPress={ this.togglePlay.bind(this) } style={ styles.playMin } name="ios-pause" size={30} color="#fff" />;
		} else {
			playButtonMin = <Icon onPress={ this.togglePlay.bind(this) } style={ styles.playMin } name="ios-play" size={30} color="#fff" />;
		}
		let forwardButton;
		if( !this.state.shuffle && this.state.songIndex + 1 === this.props.songs.length ){
			forwardButton = <Icon style={ styles.forward } name="ios-skip-forward" size={36} color="#333" />;
		} else {
			forwardButton = <Icon onPress={ this.goForward.bind(this) } style={ styles.forward } name="ios-skip-forward" size={36} color="#fff" />;
		}
		let forwardButtonMin;
		if( !this.state.shuffle && this.state.songIndex + 1 === this.props.songs.length ){
			forwardButtonMin = <Icon style={ styles.forwardMin } name="ios-skip-forward" size={30} color="#333" />;
		} else {
			forwardButtonMin = <Icon style={ styles.forwardMin } name="ios-skip-forward" size={30} color="#fff" />;
		}
		let backwardButton;
		if( !this.state.shuffle && this.state.songIndex === 0 ){
			backwardButton = <Icon style={ styles.backward } name="ios-skip-backward" size={36} color="#333" />;
		} else {
			backwardButton = <Icon onPress={ this.goBackward.bind(this) } style={ styles.backward } name="ios-skip-backward" size={36} color="#fff" />;
		}
		let backwardButtonMin;
		if( !this.state.shuffle && this.state.songIndex === 0 ){
			backwardButtonMin = <Icon style={ styles.backwardMin } name="ios-skip-backward" size={30} color="#333" />;
		} else {
			backwardButtonMin = <Icon style={ styles.backwardMin } name="ios-skip-backward" size={30} color="#fff" />;
		}
		let volumeButton;
		if( this.state.muted ){
			volumeButton = <Icon onPress={ this.toggleVolume.bind(this) } style={ styles.volume } name="ios-volume-off" size={28} color="#fff" />;
		} else {
			volumeButton = <Icon onPress={ this.toggleVolume.bind(this) } style={ styles.volume } name="ios-volume-up" size={28} color="#fff" />;
		}
		let shuffleButton;
		if( this.state.shuffle ){
			shuffleButton = <Icon onPress={ this.toggleShuffle.bind(this) } style={ styles.shuffle } name="ios-shuffle" size={28} color="#f62976" />;
		} else {
			shuffleButton = <Icon onPress={ this.toggleShuffle.bind(this) } style={ styles.shuffle } name="ios-shuffle" size={28} color="#fff" />;
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
					isLooping={false}/>

				<Modal
		          animationType="slide"
		          transparent={false}
		          visible={!this.state.minified}
		          onRequestClose={this.toggleMinify.bind(this)}>
                <View style={styles.container}>
					<View style={ styles.header }>
						{this.state.fontLoaded ? (
						<Text style={ styles.albumTitle }>
							{ songPlaying.album }
						</Text>
						) : null}
					</View>
					<View style={ styles.headerClose }>
						<Icon style={ styles.headerCloseIcon } onPress={ this.toggleMinify.bind(this) } name="ios-arrow-down" size={25} color="#fff" />
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
						<Text style={ styles.artistTitle }>
							{ this.props.artist.name }
						</Text>
					): null}
					<View style={ styles.sliderContainer }>
						<Slider
							onSlidingComplete={ this.onSlidingComplete.bind(this) }
							onValueChange={ this.onSlidingChange.bind(this) }
							style={ styles.slider }
							minimumTrackTintColor='#767488'
							thumbTintColor='#FFF'
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
							<TouchableHighlight	onPress={this.toggleMinify.bind(this)}>
								<Image
									source={{uri: image,
									width: 60,
									height: 60}}/>
							</TouchableHighlight>
							{this.state.fontLoaded ? (
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
									<TouchableHighlight	onPress={this.toggleMinify.bind(this)}>
										<View>
											<Text style={ styles.songTitleMin }>
												{ songPlaying.title }
											</Text>
											<Text style={ styles.artistTitleMin }>
												{ this.props.artist.name }
											</Text>
										</View>
									</TouchableHighlight>
									</View>
									<View style={styles.scrollContainer}>
										{forwardButtonMin}
									</View>
								</ScrollView>
							): null}
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
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#040126',
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
    color: "#BBB",
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    textAlign: 'center',
  },
  songImage: {
    marginTop: 10,
    marginBottom: 15,
  },
  songTitle: {
    color: "white",
    fontFamily: "Roboto-Bold",
    marginBottom: 10,
    marginTop: 13,
    fontSize: 19
  },
  artistTitle: {
    color: "#BBB",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    marginTop: 10,
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
    color: '#FFF',
    flex: 1,
    fontSize: 12,
  },
  timeRight: {
    color: '#FFF',
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
    backgroundColor: '#1a1839'
  },
  songTitleMin: {
    color: "white",
    fontFamily: "Roboto-Bold",
	paddingTop: 5,
  	paddingBottom: 0,
  	paddingLeft: 10,
  	paddingRight: 0,
    fontSize: 14,
  },
  artistTitleMin: {
    color: "#BBB",
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

