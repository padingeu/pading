import React from 'react';
import './_SortBy.scss';
import onClickOutside from 'react-onclickoutside';

class SortBy extends React.Component {
  render() {
    return (
      <div className="sortby-change">
        <button
          onClick={(event) => {
            this.props.sortByPrice(event);
            this.props.displaySortBy();
          }}
        >
          <div className="check-box">
            {this.props.sortByChoice === 'lowest price' ? (
              <i className="fas fa-angle-right"></i>
            ) : null}
          </div>
          <span>lowest prices</span>
        </button>
        <button
          onClick={(event) => {
            this.props.sortByCarbon(event);
            this.props.displaySortBy();
          }}
        >
          <div className="check-box">
            {this.props.sortByChoice === 'carb. footprint' ? (
              <i className="fas fa-angle-right"></i>
            ) : null}
          </div>
          <span>greenest trips</span>
        </button>

        {/* <button
          onClick={(event) => {
            this.props.displaySortBy();
          }}
        >
          <div className="check-box">
            {this.props.sortByChoice === 'same schedule' ? (
              <i className="fas fa-angle-right"></i>
            ) : null}
          </div>
          <span>same schedules</span>
        </button> */}
      </div>
    );
  }
}

export default onClickOutside(SortBy);
