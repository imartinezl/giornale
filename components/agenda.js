import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export class AgendaC extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			selected: selected
		};
		this.loadItems.bind(this);
		this.storeInFirebase = this.storeInFirebase.bind(this);
    	this.getFromFirebase = this.getFromFirebase.bind(this);

    	this.loadItems(this.getFromFirebase(this.props.db, 'items'))
	}

	componentDidMount() {

	}
	componentWillUnmount() {

	}
	onDayPress(day){
		console.log('day pressed:', day);
		this.setState({ selected: day.dateString }, () => {
			console.log("State updated:",this.state);
			//this.loadItems(items);
			this.storeInFirebase(this.props.db, 'dates/', this.state);
			
		});
	}	
	onDayChange(day){
		console.log('day changed:', day);
	}
	renderItem(item, firstItemInDay) {
	    return (
	      <View style={styles.item}><Text>{item.text}</Text></View>
	    );
	}
	renderEmptyDate() {
		return (
			<View style={styles.emptyDate}><Text>This is empty date!</Text></View>
		);
	}	
	renderDay(day, item) {
		//console.log("DAY:")
		//console.log(day,item);
		if(typeof day !== "undefined"){
			return (
					<View style={styles.day}><Text>{day.dateString}</Text></View>
			);
		}else{
			return(<View />);
		}
	}
	loadItems(){
		items = this.state.items;
		console.log("ITEMS:",items);
		var result = {};
		for(var key in items){
			if(key === this.state.selected){
				console.log(key, items[key]);
				result[key] = items[key];
			}
			// if(key <= maxDate){
			// 	result[key] = items[key];
			// }
		}
		this.setState({
			result : result
		})
		// return(result);
	}
	storeInFirebase(database, key, value){
		console.log("Value received!!!:",value);
		database.ref(key).set({
		  selected: value.selected,
		});
	}
	getFromFirebase(database, key){
		console.log("Getting key !!!:",key);
		var result;
		database.ref(key).once('value', function(snapshot) {
			if(snapshot){
				doMyThing(snapshot);
			}
		    // result = snapshot.val();
		});
		function doMyThing(snapshot){
			result = snapshot.val();
			console.log("result: ", result);
			// this.setState({
			// 	items : snapshot.val()
			// })
		}
		// database.ref(key).once('value', function(snapshot) {
		//     console.log('first');   
		//     result = snapshot.val();
		// }).then(function() { console.log('second') });
		// return(result);
	}
	render() {
		return (
			<Agenda
			  // the list of items that have to be displayed in agenda. If you want to render item as empty date
			  // the value of date key kas to be an empty array []. If there exists no value for date key it is
			  // considered that the date in question is not yet loaded
			  items={this.state.result}
			  // callback that gets called when items for a certain month should be loaded (month became visible)
			  loadItemsForMonth={(month) => {console.log('trigger items loading')}}
			  // callback that fires when the calendar is opened or closed
			  onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
			  // callback that gets called on day press
			  onDayPress={this.onDayPress.bind(this)}
			  // callback that gets called when day changes while scrolling agenda list
			  onDayChange={this.onDayChange.bind(this)}
			  // initially selected day
			  selected={this.state.selected}
			  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
			  minDate={minDate}
			  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
			  maxDate={maxDate}
			  // Max amount of months allowed to scroll to the past. Default = 50
			  pastScrollRange={5}
			  // Max amount of months allowed to scroll to the future. Default = 50
			  futureScrollRange={5}
			  // specify how each item should be rendered in agenda
			  renderItem={this.renderItem.bind(this)}
			  //renderItem={(item, firstItemInDay) => {console.log(item);return (<Text/>);}}
			  // specify how each date should be rendered. day can be undefined if the item is not first in that day.
			  renderDay={this.renderDay.bind(this)}
			  //renderDay={(day, item) => {return (<View />);}}
			  // specify how empty date content with no items should be rendered
			  renderEmptyDate={this.renderEmptyDate.bind(this)}
			  // renderEmptyDate={() => {return (<View />);}}
			  // specify how agenda knob should look like
			  //renderKnob={() => {return (<View />);}}
			  // specify what should be rendered instead of ActivityIndicator
			  renderEmptyData = {() => {return (<View />);}}
			  // specify your item comparison function for increased performance
			  rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
			  // Hide knob button. Default = false
			  hideKnob={false}
			  // By default, agenda dates are marked if they have at least one item, but you can override this if needed
			  markedDates={markedDates}
			  // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
			  onRefresh={() => console.log('refreshing...')}
			  // Set this true while waiting for new data from a refresh
			  refreshing={false}
			  // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
			  refreshControl={null}
			  // agenda theme
			  theme={theme}
			  // agenda container style
			  style={{}}
			/>
		);
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  day:{
	padding: 10,
    marginRight: 10,
    marginTop: 17
  }
});

var today = new Date();
var yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

var items = {
	'2018-12-31': [{text: 'item 1 - any js object'},{link:'https://open.spotify.com/track/00FRRwuaJP9KimukvLQCOz'}],
	'2019-01-06': [{text: 'item 2 - any js object'},{link:'https://open.spotify.com/track/00FRRwuaJP9KimukvLQCOz'}],
	'2019-01-07': [],
	'2019-01-08': [{text: 'item 3 - any js object'},{text: 'any js object'},{link:'https://open.spotify.com/track/00FRRwuaJP9KimukvLQCOz'}],
};
var markedDates = {
	'2019-01-01': {selected: true, marked: true},
	'2019-01-02': {marked: true},
	'2019-01-03': {disabled: true}
};
const theme = {
	agendaDayTextColor: 'yellow',
	agendaDayNumColor: 'green',
	agendaTodayColor: 'red',
	agendaKnobColor: 'red',
	dotColor: 'blue',
	selectedDayBackgroundColor: 'blue',
	backgroundColor: 'blue'
};
const minDate = '2018-12-10';
const maxDate = today;
const selected = yesterday;

