import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export class AgendaC extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			selected: selected,
			items: {}
		};
		this.storeInFirebase = this.storeInFirebase.bind(this);
    	this.getFromFirebase = this.getFromFirebase.bind(this);
		this.itemsCallback = this.itemsCallback.bind(this);

    	this.getFromFirebase(this.props.db, 'items', this.itemsCallback);
    	console.ignoredYellowBox = ['Setting a timer'];

	}

	componentDidMount() {
    	console.log("Component Mount");
	}
	componentWillUnmount() {
    	console.log("Component Unmount");
	}
	onDayPress(day){
		console.log('day pressed:', day.dateString);
		// this.setState({ selected: day.dateString }, () => {
		// 	console.log("State updated:",this.state.selected);
		// 	this.storeInFirebase(this.props.db, 'dates/', 'selected', this.state.selected);
		// 	this.loadItems();			
		// });
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
		if(isDefined(day)){
			return (
					<View style={styles.date}><Text>{day.dateString}</Text></View>
			);
		}else{
			return(<View />);
		}
	}
	storeInFirebase(database, key, field, value){
		console.log('Value received!!!:',value);
		database.ref(key).set({
		  [field]: value,
		});
	}
	getFromFirebase(database, key, callback){
		console.log('[[[ GETTING ',key);
    	this.props.db.ref(key).once('value', snapshot => {
			callback(snapshot, key);
    	});
	}
	itemsCallback(snapshot, key){
		if(snapshot){
			console.log(key,' OBTAINED ]]]')
			this.setState({[key]: snapshot.val()});
			// this.loadItemsForMonth(this.state.selected);
		}
	}
	loadItemsForMonth(day){
		console.log('trigger items loading:', day);
		var s = day;
		if (isDefined(day.dateString)){
			s = day.dateString;
		}
		// var items = {};
		// if (isDefined(this.state.items)){
		// 	items = this.state.items;
		// }

		// console.log('Items: ',items,'day: ',s);
		var itemsFil = {};
		itemsFil[s] = this.state.items[s];
		// for(var key in items){
		// 	if(key <= maxDate){
		// 		result[key] = items[key];
		// 	}
		// }
		this.setState({
			itemsFil : itemsFil
		})
	}

	render() {
		return (
			<Agenda
			  // the list of items that have to be displayed in agenda. If you want to render item as empty date
			  // the value of date key kas to be an empty array []. If there exists no value for date key it is
			  // considered that the date in question is not yet loaded
			  items={this.state.items}
			  // callback that gets called when items for a certain month should be loaded (month became visible)
			  loadItemsForMonth={this.loadItemsForMonth.bind(this)}
			  // callback that fires when the calendar is opened or closed
			  onCalendarToggled={(calendarOpened) => {console.log("Calendar opened:",calendarOpened)}}
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
			  // specify how each date should be rendered. day can be undefined if the item is not first in that day.
			  renderDay={this.renderDay.bind(this)}
			  // specify how empty date content with no items should be rendered
			  renderEmptyDate={this.renderEmptyDate.bind(this)}
			  // specify how agenda knob should look like
			  // renderKnob={() => {return (<View />);}}
			  // specify what should be rendered instead of ActivityIndicator
			  renderEmptyData = {() => {return (<View />);}}
			  // specify your item comparison function for increased performance
			  rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
			  // Hide knob button. Default = false
			  hideKnob={false}
			  // By default, agenda dates are marked if they have at least one item, but you can override this if needed
			  markedDates={markedDates}
			  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
			  firstDay={1}
			  // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
			  onRefresh={() => {console.log('refreshing...');this.getFromFirebase(this.props.db, 'items', this.itemsCallback);}}
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
function isDefined(x){
	return(typeof(x) !== 'undefined');
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
  date:{
	padding: 10,
    marginRight: 10,
    marginTop: 17
  }
});

var today = new Date();
var yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

var items2 = {
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
	agendaDayTextColor: '#7a92a5',
	agendaDayNumColor: '#7a92a5',
	agendaTodayColor: '#00adf5',
	agendaKnobColor: '#4ac4f7',
	dotColor: '#00adf5',
	selectedDayBackgroundColor: '#00adf5',
	backgroundColor: '#ddd'
};
const minDate = '2018-11-01';
const maxDate = today;
const selected = '2019-01-06';//yesterday;

