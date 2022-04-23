import { connect } from 'react-redux';
import Classic from '../components/Classic';

const mapStateToProps = ({ classic, app }, ownProps) => {
  return {
    classic,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Classic);
