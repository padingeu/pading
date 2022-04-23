import React from 'react';
import { withTranslation } from 'react-i18next';
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
          <span>{this.props.t("lowestPrices")}</span>
        </button>
        <button
          onClick={(event) => {
            this.props.sortByCarbon(event);
            this.props.displaySortBy();
          }}
        >
          <div className="check-box">
            {this.props.sortByChoice === 'carbon' ? (
              <i className="fas fa-angle-right"></i>
            ) : null}
          </div>
          <span>{this.props.t("greenestTrips")}</span>
        </button>
      </div>
    );
  }
}

export default withTranslation()(onClickOutside(SortBy));
