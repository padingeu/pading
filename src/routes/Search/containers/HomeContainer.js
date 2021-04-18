import { connect } from 'react-redux';
import Home from '../components/Home';
import { searchTrips } from '../../../actions';

const mapStateToProps = ({ search, app }, ownProps) => {
  return {
    search
  };
};

const mapDispatchToProps = dispatch => ({
  searchTrips: (cities, dateFrom, dateTo, stopTrip, travelType) =>
    dispatch(searchTrips(cities, dateFrom, dateTo, stopTrip, travelType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
