import React from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export class Calendario extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			date : new Date()
		};
	}
	componentDidMount(){
		console.log(this.state.date);
	}
	_onDayPress(day){
		console.log('selected day', day)
	}
	onDayLongPress(day){
		console.log('selected day', day)
	}
	render() {
		return (
			<Calendar
			// Initially visible month. Default = Date()
			current={new Date().toString()}
			// Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
			minDate={'2019-01-01'}
			// Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
			maxDate={'2019-09-01'}
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
			/>
		);
  }
}
