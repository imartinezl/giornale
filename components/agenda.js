import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export class AgendaC extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			
		};

	}
	componentDidMount(){
		this.setState({
			currentDate: '2012-05-22'
		});
		console.log('Component mount:');
		console.log(this.state);

	}
	_onDayPress(day){
		console.log('day pressed:', day);
		this.setState({
			currentDate: day.dateString
		});
	}
	renderItem(item, firstItemInDay) {
		if(item.dateString === this.state.currentDate){
		    return (
		      <View style={styles.item}><Text>{item.text}</Text></View>
		    );
		}
	}
	renderEmptyDate() {
		return (
			<View style={styles.emptyDate}><Text>This is empty date!</Text></View>
		);
	}	
	renderDay(day, item) {
		console.log("DAY:")
		console.log(day,item);
		if(typeof day !== "undefined"){
			return (
					<View style={styles.day}><Text>{day.dateString}</Text></View>
			);
		}else{
			return(<View />);
		}
	}
	render() {
		return (
			<Agenda
			  // the list of items that have to be displayed in agenda. If you want to render item as empty date
			  // the value of date key kas to be an empty array []. If there exists no value for date key it is
			  // considered that the date in question is not yet loaded
			  items={
			    {'2012-05-22': [{text: 'item 1 - any js object'}],
			     '2012-05-23': [{text: 'item 2 - any js object'}],
			     '2012-05-24': [],
			     '2012-05-28': [{text: 'item 3 - any js object'},{text: 'any js object'}],
			    }}
			  // callback that gets called when items for a certain month should be loaded (month became visible)
			  loadItemsForMonth={(month) => {console.log('trigger items loading')}}
			  // callback that fires when the calendar is opened or closed
			  onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
			  // callback that gets called on day press
			  onDayPress={this._onDayPress.bind(this)}
			  // callback that gets called when day changes while scrolling agenda list
			  onDayChange={(day)=>{console.log('day changed')}}
			  // initially selected day
			  selected={'2012-05-22'}
			  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
			  minDate={'2012-05-10'}
			  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
			  maxDate={'2012-05-30'}
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
			  markedDates={{
			    '2012-05-16': {selected: true, marked: true},
			    '2012-05-17': {marked: true},
			    '2012-05-18': {disabled: true}
			  }}
			  // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
			  onRefresh={() => console.log('refreshing...')}
			  // Set this true while waiting for new data from a refresh
			  refreshing={false}
			  // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
			  refreshControl={null}
			  // agenda theme
			  theme={{
			    agendaDayTextColor: 'yellow',
			    agendaDayNumColor: 'green',
			    agendaTodayColor: 'red',
			    agendaKnobColor: 'blue'
			  }}
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
