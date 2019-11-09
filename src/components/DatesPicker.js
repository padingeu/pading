import React from 'react';
import Calendar from 'react-calendar';
import './_DatesPicker.scss';
import onClickOutside from 'react-onclickoutside';

class DatesPicker extends React.Component {
  state = {
    showdate: false,
    showcalendar: false,
  };

  handleClickOutside = () => {
  this.setState({showcalendar: false })
  }

  onInputChange = date => {
    this.setState({ showdate: true });
  };

  showoff = () => {
    this.setState({ showcalendar: false });
  };

  showon = () => {
    this.setState({ showcalendar: true });
  };

  render() {
    return (
      <div>
        <form className="simple_form search" action="/">
          <div className="search-form-control form-group">
            <div className="inputdate">
              <input
                className="inputdatefrom"
                type="text"
                onChange={this.onInputChange}
                onClick={this.showon}
                value={this.state.showdate ? this.props.dateFrom.toLocaleDateString() : 'departure'}
              />
              <input
                className="inputdateto"
                type="text"
                onChange={this.onInputChange}
                onClick={this.showon}
                value={this.state.showdate ? this.props.dateTo.toLocaleDateString() : 'return'}
              />
            </div>
          </div>
        </form>
        <div>
          {this.state.showcalendar &&
            <div className="calendar">
              <Calendar
                locale={"en"}
                minDate={new Date()}
                onClickOutside={this.handleClickOutside}
                onClickDay={this.props.onSelectDate}
                onChange={this.onInputChange}
                selectRange={true}
              />
              <button className="btn btn-date" onClick={this.showoff}>Ok</button>
            </div>}
        </div>

      </div>
    );
  }
}

export default onClickOutside(DatesPicker);
