import { connect } from 'react-redux';
import FormSearch from '../components/FormSearch';
import { onClick } from '../actions'


const mapStateToProps =  ({ search, app }, ownProps) => {
  return {
    search
  }
}

const mapDispatchToProps = dispatch => ({
  onClick: cities => dispatch(onClick(cities))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormSearch)
