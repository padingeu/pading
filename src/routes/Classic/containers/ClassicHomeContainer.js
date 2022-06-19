import { connect } from 'react-redux';
import ClassicHome from '../components/ClassicHome';
import { searchClassicTrips } from '../../../actions';

const mapStateToProps = ({ classic, app }, ownProps) => {
  return {
    classic,
  };
};

const mapDispatchToProps = (dispatch) => ({
  searchClassicTrips: (departureCity, destinationCity, dateFrom, dateTo, directTrip, returnTrip) =>
    dispatch(
      searchClassicTrips(departureCity, destinationCity, dateFrom, dateTo, directTrip, returnTrip)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassicHome);
