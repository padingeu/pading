import React from 'react';
import NavBar from '../../../components/NavBar';
import ClassicBanner from './ClassicBanner';
import Footer from '../../../components/Footer';

export default class ClassicHome extends React.Component {
  state = { isClassicSearchPage: true };

  scrollUp() {
    document.scrollingElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  render() {
    return (
      <div>
        <div className="overlay"></div>
        <NavBar scrollUp={this.scrollUp} isClassicSearchPage={this.state.isClassicSearchPage} />
        <ClassicBanner
          searchClassicTrips={this.props.searchClassicTrips}
          isClassicSearchPage={this.state.isClassicSearchPage}
        />
        <Footer scrollUp={this.scrollUp} />
      </div>
    );
  }
}
