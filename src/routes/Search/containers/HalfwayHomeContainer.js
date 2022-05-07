import { connect } from 'react-redux';
import HalfWayHome from '../components/HalfwayHome';
import { searchTrips } from '../../../actions';

const mapStateToProps = ({ search, app }, ownProps) => {
  return {
    search
  };
};

const mapDispatchToProps = dispatch => ({
  searchTrips: (cities, dateFrom, dateTo, directTrip, returnTrip) =>
    dispatch(searchTrips(cities, dateFrom, dateTo, directTrip, returnTrip))
});

export default connect(mapStateToProps, mapDispatchToProps)(HalfWayHome);
