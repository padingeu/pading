import React from 'react';
import Calendar from 'react-calendar';
import './_DatesPicker.scss';
import onClickOutside from 'react-onclickoutside';

class DatesPicker extends React.Component {
  state = {
    showDate: false,
    showCalendar: false,
    showTravelTypeBtn: false,
    travelType: "return"
  };

  //ontravelTypeChange
  // reset datefrom and dateto
  // selectrange = true if "return" or = false if "one-way" --> OK
  // if "one-way", setState only datefrom and puts "no return" for inputdate return
  // if click on inputdate return, change travelType and reset datefrom and dateto

  handleClickOutside = () => {
  this.setState({showCalendar: false });
  this.setState({showTravelTypeBtn: false });
  }

  onInputChange = () => {
    this.setState({ showDate: true });
  };

  showOffCalendar = () => {
    this.setState({ showCalendar: false });
  };

  showOnCalendar = () => {
    this.setState({ showCalendar: true });

  };

  switchButton = event => {
    event.preventDefault();
    this.setState({ showTravelTypeBtn: !this.state.showTravelTypeBtn });
  }

  switchToOneWay = event => {
    event.preventDefault();
    this.setState({ travelType: "one-way" });
    this.setState({ showTravelTypeBtn: !this.state.showTravelTypeBtn });
  }

  switchToReturn = event => {
    event.preventDefault();
    this.setState({ travelType: "return" });
    this.setState({ showTravelTypeBtn: !this.state.showTravelTypeBtn });
  }

  render() {
    return (
      <div>
        <form className="simple_form search" action="/">
          <div>
            {
              this.state.showTravelTypeBtn ?
                <div className="travel-type-change" onClickOutside={this.handleClickOutside}>
                  <a onClick={this.switchToOneWay}>
                    <div className="check-box">
                      {
                        this.state.travelType === "one-way" ?
                          <i className="fas fa-check fa-xs"></i>
                        : null
                      }
                    </div>
                    <div className="one-way-return-div">
                      <h6>One-way</h6>
                    </div>
                  </a>

                  <a onClick={this.switchToReturn}>
                    <div className="check-box">
                      {
                        this.state.travelType === "return" ?
                          <i className="fas fa-check fa-xs"></i>
                        : null
                      }
                    </div>
                    <div className="one-way-return-div">
                      <h6>Return</h6>
                    </div>
                  </a>
                </div>
              : null
            }
          <div className="travel-type">
            <button className="travel-type-btn" onClick={this.switchButton}>
              <h6>{this.state.travelType}</h6>
              <div className="chevron-up-down">
                <i className="fas fa-chevron-down fa-xs"></i>
              </div>
            </button>
          </div>
        </div>


        <div className="search-form-control form-group">

          <div className="inputdate">
            <input
              className="inputdatefrom"
              type="text"
              onChange={this.onInputChange}
              onClick={this.showOnCalendar}
              placeholder='Departure'
              value={this.state.showDate ? this.props.dateFrom.toLocaleDateString() : ''}
            />
            <input
              className="inputdateto"
              type="text"
              onChange={this.onInputChange}
              onClick={this.showOnCalendar}
              placeholder='Return'
              value={this.state.showDate ? this.props.dateTo.toLocaleDateString() : ''}
            />
          </div>
        </div>

          { this.state.showCalendar &&
            <div className="calendar">
              <Calendar
                locale={"en"}
                minDate={new Date() && this.props.dateFrom}
                onClickOutside={this.handleClickOutside}
                onClickDay={this.props.onSelectDate}
                onChange={this.onInputChange}
                selectRange={this.state.travelType === "return" ? true : false}
              />
              <button className="btn btn-date" onClick={this.showOffCalendar}>Ok</button>
            </div>
          }

        </form>
      </div>
    );
  }
}

export default onClickOutside(DatesPicker);
