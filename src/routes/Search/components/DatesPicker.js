import React from 'react';
import Calendar from 'react-calendar';
import './_DatesPicker.scss';
import onClickOutside from 'react-onclickoutside';

class DatesPicker extends React.Component {
  state = {
    showCalendar: false,
    showTravelTypeBtn: false
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

  showOffCalendar = () => {
    this.setState({ showCalendar: false });
  };

  showOnCalendar = () => {
    this.setState({ showTravelTypeBtn: false });
    this.setState({ showCalendar: true });
  };

  showTravelTypeBtn = () => {
    this.setState({ showTravelTypeBtn: !this.state.showTravelTypeBtn });
  }

  switchButton = event => {
    event.preventDefault();
    this.setState({ showCalendar: false });
    this.setState({ showTravelTypeBtn: !this.state.showTravelTypeBtn });
  }


  render() {
    return (
      <div>
        <form className="simple_form search" action="/">
          <div>
            {
              this.state.showTravelTypeBtn ?
                <div className="travel-type-change">
                  <a href="/" onClick={(event) => {
                    this.props.switchToOneWay(event);
                    this.showTravelTypeBtn();}
                  }>
                    <div className="check-box">
                      {
                        this.props.travelType === "one-way" ?
                          <i className="fas fa-check fa-xs"></i>
                        : null
                      }
                    </div>
                    <div className="one-way-return-div">
                      <h6>One-way</h6>
                    </div>
                  </a>

                  <a href="/" onClick={(event) => {
                    this.props.switchToReturn(event);
                    this.showTravelTypeBtn();}
                  }>
                    <div className="check-box">
                      {
                        this.props.travelType === "return" ?
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
              <h6>{this.props.travelType}</h6>
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
              onChange={this.props.onChange}
              onClick={this.showOnCalendar}
              placeholder='Departure'
              value={this.props.showDateFrom ? this.props.dateFrom.toLocaleDateString() : ''}
            />
            {this.props.travelType === "return" ?
              <input
              className="inputdateto"
              type="text"
              onChange={this.props.onChange}
              onClick={this.showOnCalendar}
              placeholder='Return'
              value={this.props.showDateTo ? this.props.dateTo.toLocaleDateString() : ''}
            /> :
              <input
                className="inputdateto"
                type="text"
                onChange={this.props.onChange}
                onClick={(event) => {
                  this.props.switchToReturn(event);
                  this.showOnCalendar();
                  }
                }
                placeholder='no-return'
                value='no-return'
              />
            }
          </div>
        </div>

          { this.state.showCalendar &&
            <div className="calendar">
              <Calendar
                locale={"en"}
                minDate={new Date()}
                onClickOutside={this.handleClickOutside}
                onChange={this.props.onChange}
                selectRange={this.props.travelType === "return" ? true : false}
                returnValue={"range"}
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