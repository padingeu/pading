import React from 'react';
import { useTranslation } from 'react-i18next';
import friendsMeeting from '../img/friends-meeting.svg';
import yellowMarker from '../img/yellow-marker.svg';
import blueLightShape from '../../../img/blue-light-travel-shape.svg';
import './_Simple.scss';

export default function Simple() {
  const { t } = useTranslation();

  return (
    <div className="wrapper">
      <img src={blueLightShape} alt={t("blueShapeImgAlt")} className="blue-light-shape" />
      <div className="simple-solution">
        <div className="simple-solution-content">
          <img
            className="simple-solution-image"
            alt={t("friendsImgAlt")}
            src={friendsMeeting}
          />
          <div className="simple-solution-title-details">
            <h2><span className="focus-text"><span className="underline"></span>{t("simpleTitle1")}</span><br/><span className="focus-text"><span className="underline"></span>{t("simpleTitle2")}</span></h2>
            <br />
            <p>{t("simpleDesc")}</p>
          </div>
        </div>
        <div className="testimonials">
          <div className="testimonial-card">
            <p>{t("testimonial1")}</p>
            <div className="user-name"><span>Eilidh</span></div>
            <img className="yellow-marker-image" alt={t("yellowMarkerImgAlt")} src={yellowMarker} />
          </div>
          <div className="testimonial-card">
            <p>{t("testimonial2")}</p>
            <div className="user-name"><span>Filippo</span></div>
            <img className="yellow-marker-image" alt={t("yellowMarkerImgAlt")} src={yellowMarker} />
          </div>
          <div className="testimonial-card">
            <p>{t("testimonial3")}</p>
            <div className="user-name"><span>Mamadou</span></div>
            <img className="yellow-marker-image" alt={t("yellowMarkerImgAlt")} src={yellowMarker} />
          </div>
        </div>
      </div>
    </div>
  );
}