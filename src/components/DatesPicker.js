import React from 'react';
import { withTranslation } from 'react-i18next';
import i18n from '../i18n';
import onClickOutside from 'react-onclickoutside';
import Calendar from 'react-calendar';
import './_DatesPicker.scss';
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
      return this.props.t("selectDepandRetDates");
    } else if (!this.props.returnTrip && !this.props.dateFrom) {
      return this.props.t("selectDepDate");
    } else {
      return this.props.returnTrip ? `${this.props.t("saveDates")}` : `${this.props.t("saveDate")}`;
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
        <div className="inputdate">
          <label className="inp-dates">
            <input
              className="inputdate-bar"
              type="text"
              onChange={this.props.onChange}
              onClick={this.showOnCalendar}
              placeholder={this.props.t("PickDates")}
              value={
                this.props.returnTrip ?
                  this.props.dateFrom && this.props.dateTo ?
                    `${format(this.props.dateFrom, 'dd/MM/yyyy')} - ${format(this.props.dateTo, 'dd/MM/yyyy')}`
                    : ''
                :
                  this.props.dateFrom ?
                    `${format(this.props.dateFrom, 'dd/MM/yyyy')} - ${this.props.t("noReturn")}`
                    : ''
                }
              readOnly
            />     
            <i className="fas fa-calendar-day fa-lg"></i>
          </label>
        </div>
        {this.state.showCalendar && (
          <div className="calendar">
            <Calendar
              locale={i18n.languages[0]}
              minDate={new Date()}
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

export default withTranslation()(onClickOutside(DatesPicker));
