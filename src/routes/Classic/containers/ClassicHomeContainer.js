import { connect } from 'react-redux';
import ClassicHome from '../components/ClassicHome';

const mapStateToProps = ({ classic, app }, ownProps) => {
  return {
    classic,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ClassicHome);
