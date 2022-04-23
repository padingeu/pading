import React from 'react';
import NavBar from '../../../components/NavBar';
import './_Classic.scss';
import LinearProgress from '@material-ui/core/LinearProgress';

import Footer from '../../../components/Footer';

export default function Results(props) {
  const scrollUp = () => {
    document.scrollingElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <div className="linear-progress">
        <LinearProgress />
      </div>
      <div className="overlay"></div>
      <NavBar scrollUp={scrollUp} />
      Classic
      <Footer scrollUp={scrollUp} />
    </div>
  );
}
