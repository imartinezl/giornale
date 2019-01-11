import React from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export class Calendario extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			date : new Date()
		};

		// This binding is necessary to make `this` work in the callback
		this._onDayPress = this._onDayPress.bind(this);
	}
	componentDidMount(){
		console.log(this.state.date);
	}
	_onDayPress(day){
		console.log('selected day', day);
		this.setState({
			currentDate: day.dateString
		});
	}
	onDayLongPress(day){
		console.log('selected day', day)
	}
	render() {
		return (
			<Calendar
			// Initially visible month. Default = Date()
			current={Date()}
			// Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
			minDate={'2018-10-01'}
			// Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
			maxDate={Date()}
			// Handler which gets executed on day press. Default = undefined
			onDayPress={this._onDayPress}
			// Handler which gets executed on day long press. Default = undefined
			onDayLongPress={this._onDayLongPress}
			// Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
			// monthFormat={'yyyy MM'}
			// Handler which gets executed when visible month changes in calendar. Default = undefined
			onMonthChange={(month) => {console.log('month changed', month)}}
			// Hide month navigation arrows. Default = false
			hideArrows={false}
			// Replace default arrows with custom ones (direction can be 'left' or 'right')
			//renderArrow={(direction) => (<Arrow />)}
			// Do not show days of other months in month page. Default = false
			hideExtraDays={false}
			// If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
			// day from another month that is visible in calendar page. Default = false
			disableMonthChange={false}
			// If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
			firstDay={1}
			// Hide day names. Default = false
			hideDayNames={false}
			// Show week numbers to the left. Default = false
			showWeekNumbers={false}
			// Handler which gets executed when press arrow icon left. It receive a callback can go back month
			onPressArrowLeft={substractMonth => substractMonth()}
			// Handler which gets executed when press arrow icon left. It receive a callback can go next month
			onPressArrowRight={addMonth => addMonth()}

			// Collection of dates that have to be colored in a special way. Default = {}
			markedDates={
				{
				// '2019-01-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
				// '2019-01-04': {disabled: true, startingDay: true, color: 'green', endingDay: true},
				// '2019-01-18': {marked: true, dotColor: 'red', activeOpacity: 0},
				[this.state.currentDate] : {selected: true}
				}}
			// Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
			markingType={'simple'}
			/>
		);
  }
}
