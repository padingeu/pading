import React from 'react';
import friendsMeeting from '../img/friends-meeting.svg';
import './_Simple.scss';

export default function Simple() {
  let isIOS = /iPad|iPhone|iPod/.test(navigator.platform);

  return (
    <div className="wrapper">
      <div className="simple-solution">
        <img className="simple-solution-image" src={friendsMeeting}/>
        <div className="simple-solution-content">
          <h2><span className="focus-text"><span className="underline"></span>SIMPLE SOLUTION FOR</span><br/><span className="focus-text"><span className="underline"></span>COMPLEX CONNECTIONS !</span></h2>
          <br />
          <p>
            Planning an Erasmus meeting, joining friends abroad, gathering with family ..
            <br />
            Pading is a simple solution built to bring you closer to each other
          </p>
      
         
 
        </div>
      </div>
    </div>
  );
}

