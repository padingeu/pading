import { connect } from 'react-redux';
import FormSearch from '../components/FormSearch';
import { searchTrips } from "../actions";


const mapStateToProps =  ({ search, app }, ownProps) => {
  return {
    search
  }
}

const mapDispatchToProps = dispatch => ({
  searchTrips: (cities, dateFrom, dateTo, stopTrip) =>
    dispatch(searchTrips(cities, dateFrom, dateTo, stopTrip))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormSearch)
