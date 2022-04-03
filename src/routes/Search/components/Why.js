import React from 'react';
import { useTranslation } from 'react-i18next';
import happyCatsGif from '../img/happy-cats.gif';
import happyCatsVideo from '../img/happy-cats.mp4';
import greenShape from '../../../img/green-shape.svg';
import yellowShape from '../../../img/yellow-travel-shape.svg';
import './_Why.scss';

export default function Why() {
  let isIOS = /iPad|iPhone|iPod/.test(navigator.platform);
  const { t } = useTranslation();

  return (
    <div className="wrapper">
      <img src={greenShape} alt={t("greenShapeImgAlt")} className="green-shape"/>
      <img src={yellowShape} alt={t("greenShapeImgAlt")} className="yellow-shape"/>
      <div className="why-to-use-it">
        <div className="why-to-use-it-gif">
          {isIOS ? (
            <div>
              <img src={happyCatsGif} className="happy-cats" alt={t("happyCatsImgAlt")} />
            </div>
          ) : (
            <video className="happy-cats" autoPlay="autoplay" loop muted playsInline>
              <source src={happyCatsVideo} />
            </video>
          )}
        </div>
        <div className="why-to-use-it-text" id="why">
          <div className="why-to-use-it-title">
            <h2 className="focus-text"><span className="underline"></span>{t("whyTitle")}</h2>
          </div>
          <div className="why-to-use-it-content">
            <div className="why-to-use-it-content-card">
              <div className="why-to-use-it-number">
                <h3>1</h3>
              </div>
              <div className="why-to-use-it-details">
                <h3>{t("whySubTitle1")}</h3>
                <p>{t("whyDesc1")}</p>
              </div>
            </div>
            <div className="why-to-use-it-content-card">
              <div className="why-to-use-it-number">
                <h3>2</h3>
              </div>
              <div className="why-to-use-it-details">
                <h3>{t("whySubTitle2")}</h3>
                <p>{t("whyDesc2")}</p>
              </div>
            </div>
            <div className="why-to-use-it-content-card">
              <div className="why-to-use-it-number">
                <h3>3</h3>
              </div>
              <div className="why-to-use-it-details">
                <h3>{t("whySubTitle3")}</h3>
                <p>{t("whyDesc3")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
