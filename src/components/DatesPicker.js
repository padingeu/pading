import React from 'react';
import Calendar from 'react-calendar';
import './_DatesPicker.scss';
import onClickOutside from 'react-onclickoutside';
import { format } from 'date-fns';

class DatesPicker extends React.Component {
  state = {
    showCalendar: false,
  };

  handleClickOutside = () => {
    this.setState({ showCalendar: false });
  };

  messageValidationDates = () => {
    if (this.props.returnTrip && !this.props.dateTo) {
      return 'Select departure and return dates';
    } else if (!this.props.returnTrip && !this.props.dateFrom) {
      return 'Select a departure date';
    } else {
      return 'Ok';
    }
  }

  showOffCalendar = (props) => {
    this.setState({ showCalendar: false });
  };

  showOnCalendar = () => {
    this.setState({ showTravelTypeBtn: false });
    this.setState({ showStopTripBtn: false });
    this.setState({ showCalendar: true });
  };

  render() {
    return (
      <div className="datespicker">
        {}
        <div className="inputdate">
          <input
            className="inputdate-bar"
            type="text"
            onChange={this.props.onChange}
            onClick={this.showOnCalendar}
            placeholder="When do you travel ?"
            value={
              this.props.returnTrip ?
                this.props.dateFrom && this.props.dateTo ?
                  `${format(this.props.dateFrom, 'dd/MM/yyyy')} - ${format(this.props.dateTo, 'dd/MM/yyyy')}`
                  : ''
              :
                this.props.dateFrom ?
                  `${format(this.props.dateFrom, 'dd/MM/yyyy')} - no return`
                  : ''
              }
            readOnly
          />
        </div>

        {this.state.showCalendar && (
          <div className="calendar">
            <Calendar
              locale={'en'}
              minDate={new Date()}
              //onClickOutside={this.handleClickOutside}
              onChange={this.props.onChange}
              selectRange={this.props.returnTrip ? true : false}
              returnValue={'range'}
              showFixedNumberOfWeeks={false}
              activeStartDate={this.props.dateFrom ? this.props.dateFrom : new Date()}
            />
            <button className="btn btn-date"
              disabled={(this.props.returnTrip && !this.props.dateTo) || ('One-way' && !this.props.dateFrom)}
              onClick={this.showOffCalendar}
            >
              {this.messageValidationDates()}
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default onClickOutside(DatesPicker);
