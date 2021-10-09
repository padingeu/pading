import React from 'react';
import friendsMeeting from '../img/friends-meeting.svg';
import yellowMarker from '../img/yellow-marker.svg';
import blueLightShape from '../../../img/blue-light-travel-shape.svg';
import './_Simple.scss';

export default function Simple() {
  return (
    <div className="wrapper">
      <img src={blueLightShape} alt="blue light travel shape" className="blue-light-shape" />
      <div className="simple-solution">
        <div className="simple-solution-content">
          <img
            className="simple-solution-image"
            alt="friends gathering and chilling on the beach"
            src={friendsMeeting}
          />
          <div className="simple-solution-title-details">
            <h2>
              <span className="focus-text">
                <span className="underline"></span>SIMPLE SOLUTION FOR
              </span>
              <br />
              <span className="focus-text">
                <span className="underline"></span>COMPLEX CONNECTIONS !
              </span>
            </h2>
            <br />
            <p>
              Planning an Erasmus reunion, joining friends abroad, gathering with family ..
              <br />
              Pading is a simple solution built to bring you closer to each other
            </p>
          </div>
        </div>
        <div className="testimonials">
          <div className="testimonial-card">
            <p>
              « Since our year abroad, we organise an annual Erasmus reunion. It's always so amazing
              to get together! Organising the trip and choosing the right destination for everyone
              is now much easier. We hope to plan even more reunions and continue to discover places
              together »
            </p>
            <span className="user-name">Eilidh, Erasmus family</span>
            <img className="yellow-marker-image" alt="yellow marker" src={yellowMarker} />
          </div>
          <div className="testimonial-card">
            <p>
              « Like many students, opportunities lead us to move to other places. My girlfriend and
              I continue to see each other regularly and use Pading to catch up in halfway cities.
              Our long-distance relationship is now an opportunity to discover the world together »
            </p>
            <span className="user-name">Fillipo, long-distance relationship</span>
            <img className="yellow-marker-image" alt="yellow marker" src={yellowMarker} />
          </div>
          <div className="testimonial-card">
            <p>
              « I have lived in Manchester for four years now. I have some family in Senegal and
              friends living in many places (Lille, Brussels, Wroclaw, Barcelona, ..). Pading helps
              us to find the best destinations to meet »
            </p>
            <span className="user-name">Mamadou, living abroad</span>
            <img className="yellow-marker-image" alt="yellow marker" src={yellowMarker} />
          </div>
        </div>
      </div>
    </div>
  );
}
