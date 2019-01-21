import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { AgendaItem } from './agendaItem.js';

export class AgendaC extends React.Component {
	constructor(props){
		super(props);

		let items = this.dataPreprocessing(this.props.data);
		this.state = {
			selected: selected,
			items: items
		};
		this.storeInFirebase = this.storeInFirebase.bind(this);
    	this.storeInFirebase(this.props.db, 'dates/', 'selected', this.state.selected);

    	// let day = {timestamp: new Date(minDate).getTime()};
    	// this.loadItemsForMonth(day);
	}

	componentDidMount() {
    	console.log("Component Mount");
	}
	componentWillUnmount() {
    	console.log("Component Unmount");
	}
	onDayPress(day){
		console.log('day pressed:', day.dateString);
		this.setState({ selected: day.dateString }, () => {
			console.log("State updated:",this.state.selected);
			this.storeInFirebase(this.props.db, 'dates/', 'selected', this.state.selected);
			// this.loadItems();			
		});
	}	
	onDayChange(day){
		console.log('day changed:', day);
	}
	renderItem(item, firstItemInDay) {
	    return (
	      <AgendaItem item={item}/>
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
	dataPreprocessing(data){
		let items = {};
        for (var i = 0; i < data.length; i++) {
          let date = data[i].date;
          delete data[i].date;
          items[date] = [data[i]];
        }
        return(items);
	}
	loadItemsForMonth(day){
		console.log('trigger items loading:', day.timestamp);
		// let s = day.dateString;
		// var itemsFil = {};
		// itemsFil[s] = this.state.items[s];
		// // for(var key in items){
		// // 	if(key <= maxDate){
		// // 		result[key] = items[key];
		// // 	}
		// // }
		// this.setState({
		// 	itemsFil : itemsFil
		// })
		setTimeout(() => {
		      for (let i = -7; i < 40; i++) {
		        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
		        const strTime = this.timeToString(time);
		        if (!this.state.items[strTime] && strTime<this.timeToString(maxDate)) {
		        	this.state.items[strTime] = [];
		        }
		      }
		      //console.log(this.state.items);
		      const newItems = {};
		      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
		      this.setState({
		        items: newItems
		      });
		}, 1000);
	}
	timeToString(time) {
	    const date = new Date(time);
	    return date.toISOString().split('T')[0];
	}

	render() {
		return (
			<View style={{flex:1}}>
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
			  // renderDay={this.renderDay.bind(this)}
			  // specify how empty date content with no items should be rendered
			  renderEmptyDate={this.renderEmptyDate.bind(this)}
			  // specify how agenda knob should look like
			  // renderKnob={() => {return (<View />);}}
			  // specify what should be rendered instead of ActivityIndicator
			  renderEmptyData = {() => {return (<View />);}}
			  // specify your item comparison function for increased performance
			  rowHasChanged={(r1, r2) => {return r1.name !== r2.name}}
			  // Hide knob button. Default = false
			  hideKnob={false}
			  // By default, agenda dates are marked if they have at least one item, but you can override this if needed
			  markedDates={markedDates}
			  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
			  firstDay={1}
			  // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
			  onRefresh={() => {console.log('refreshing...');}}//this.getFromFirebase(this.props.db, 'items', this.itemsCallback);}}
			  // Set this true while waiting for new data from a refresh
			  refreshing={false}
			  // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
			  refreshControl={null}
			  // agenda theme
			  theme={theme}
			  // agenda container style
			  style={{height:300}}
			/>
			</View>
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
const maxDate = '2019-01-08';//today;
const selected = '2019-01-05';//yesterday;


