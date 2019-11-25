import { connect } from 'react-redux';
import FormSearch from '../components/FormSearch';
import { onClick } from '../actions'


const mapStateToProps =  ({ search, app }, ownProps) => {
  return {
    search
  }
}

const mapDispatchToProps = dispatch => ({
  onClick: (cities, dateFrom, dateTo) => dispatch(onClick(cities, dateFrom, dateTo))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormSearch)
