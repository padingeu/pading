import { connect } from 'react-redux';
import HalfwayResults from '../components/HalfwayResults';
import { searchTrips, doFilter, clickOnFilter } from '../../../actions';

const mapStateToProps = ({ search, app }, ownProps) => {
  return {
    search,
  };
};

const mapDispatchToProps = (dispatch) => ({
  searchTrips: (cities, dateFrom, dateTo, directTrip, returnTrip) =>
    dispatch(searchTrips(cities, dateFrom, dateTo, directTrip, returnTrip)),
  doFilter: (filter, trips, cities, carb) => dispatch(doFilter(filter, trips, cities, carb)),
  clickOnFilter: (showFilter) => dispatch(clickOnFilter(showFilter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HalfwayResults);
