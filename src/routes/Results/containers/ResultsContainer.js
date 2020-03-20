import { connect } from 'react-redux';
import Results from '../components/Results';

const mapStateToProps = ({ search }, ownProps) => {
  return {
    search
  };
};

export default connect(mapStateToProps)(Results);
