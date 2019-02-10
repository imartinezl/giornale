import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { AgendaItem } from './agendaItem.js';
import { AgendaDay } from './agendaDay.js';


const minDate = '2019-02-04';
const maxDate = getToday();//today;
const selected = getFromToday(20);//top dateeeee;

export class AgendaC extends React.Component {
	constructor(props){
		super(props);

		this.storeInFirebase = this.storeInFirebase.bind(this);
		this.getMarkedDays = this.getMarkedDays.bind(this);
		this.itemCallback = this.itemCallback.bind(this);
		this.pressedCallback = this.pressedCallback.bind(this);

		let items = this.dataPreprocessing(this.props.data);
		let markedDates = this.getMarkedDays(items);

		this.state = {
			selected: selected,
			items: items,
			markedDates: markedDates
		};

    	// this.storeInFirebase(this.props.db, 'dates/', 'selected', this.state.selected);

	}
	shouldComponentUpdate(nextProps, nextState) {
	    if (this.props.playerSongIndex !== nextProps.playerSongIndex || 
	    	JSON.stringify(this.state.markedDates) !== JSON.stringify(nextState.markedDates) ){
			console.log("Agenda Should Update");
	    	return true;
	    }
		console.log("Agenda Should Update");
	    return false;
  	}
	componentDidMount() {
    	console.log("Agenda Mount");
    	// setTimeout(() => {
    		// this.list.scrollToIndex({index: 11});
    		// this.list.scrollToIndex({index: this.props.playerSongIndex});
    		// this.list.scrollToEnd();
		// },0);
	}
	componentWillUnmount() {
    	console.log("Agenda Unmount");
	}
	componentDidUpdate(){
		console.log("Agenda Updated");
		// this.list.scrollToIndex({index: this.props.playerSongIndex});
	}
	onDayPress(day){
		console.log('Day pressed:', day.dateString);
		this.setState({ selected: day.dateString }, () => {
			console.log("State updated:",this.state.selected);
			// this.storeInFirebase(this.props.db, 'dates/', 'selected', this.state.selected);
		});
	}	
	onDayChange(day){
		console.log('Day changed:', day.dateString);
	}
	renderItem(item, firstItemInDay) {
	    return (
	      <AgendaItem item={item} db={this.props.db}  itemCallback={this.itemCallback} pressedCallback={this.pressedCallback}/>
	    );
	}
	renderEmptyDate() {
		return(null);
		return (
			<View style={styles.emptyDate}><Text>This is empty date!</Text></View>
		);
	}	
	renderDay(day, item) {
		return(
			<AgendaDay day={day} item={item}/>
		);
	}
	storeInFirebase(database, key, field, value){
		console.log('Stored in FB! ',value);
		database.ref(key).set({
		  [field]: value,
		});
	}
	dataPreprocessing(data){
		let items = {};
        for (var i = 0; i < data.length; i++) {
          let date = data[i].date;
          // delete data[i].date;
          items[date] = [data[i]];
        }
        // console.log(items);
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
		      //console.log(newItems);
		      this.setState({
		        items: newItems
		      });
		}, 200);
	}
	timeToString(time) {
	    const date = new Date(time);
	    return date.toISOString().split('T')[0];
	}
	getMarkedDays(items){
		let markedDates = {};
		Object.keys(items).forEach(key => {
			markedDates[key] = {marked: items[key][0].liked, disabled: !items[key][0].opened}
		});
		// console.log("MARKED:",markedDates);
		return(markedDates)
	}
	itemCallback(item, liked, opened){

		console.log("LIKED/OPENED", item.id, liked, opened);
		this.props.openedCallback(item);
        let markedDates = {...this.state.markedDates}
        markedDates[item.date] = {marked: liked, disabled: !opened};
        this.setState({ 
        	markedDates: markedDates 
        }, () => {
            // console.log(this.state.markedDates);
        });
	}
	pressedCallback(pressedSongIndex){
		console.log("pressedCallback",pressedSongIndex);
		this.props.pressedCallback(pressedSongIndex);
	}

	render() {
		
		return (
			<View style={{flex:1}}>
			<Agenda
			  ref={(c) => this.list = c}
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
			  pastScrollRange={7}
			  // Max amount of months allowed to scroll to the future. Default = 50
			  futureScrollRange={7}
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
			  rowHasChanged={(r1, r2) => {return r1.name !== r2.name}}
			  // Hide knob button. Default = false
			  hideKnob={false}
			  // By default, agenda dates are marked if they have at least one item, but you can override this if needed
			  markedDates={this.state.markedDates}
			  // markingType={'multi-dot'}
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
function getToday(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  return(today);
}
function getFromToday(span){
  var today = new Date(maxDate)
  today = new Date(today-span*24*3600*1000);
  today = new Date(Math.max(today,new Date(minDate)))

  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  return(today);
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

const theme = {
	agendaDayTextColor: '#7a92a5',
	agendaDayNumColor: '#7a92a5',
	agendaTodayColor: '#f62976',
	agendaKnobColor: '#f62976',
	dotColor: '#e4405f',
	selectedDayBackgroundColor: '#f62976',
	backgroundColor: '#fff',
	todayTextColor: '#f62976'
};



