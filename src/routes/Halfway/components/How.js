import React from 'react';
import { useTranslation } from 'react-i18next';
import './_How.scss';
import blueMarker from '../img/blue-marker.svg';

export default function How() {
    const { t } = useTranslation();

    return (
        <div className="wrapper">
           
            <div className="how-to-use-it">
                <img className="blue-marker-image" alt={t("blueMarkerImgAlt")} src={blueMarker}/>
                <div className="how-to-use-it-title">
                    <h2 className="focus-text"><span className="underline"></span>{t("howTitle")}</h2>
                </div>
                <div className="how-to-use-it-content">

                    <div className="how-to-use-it-content-card">           
                        <div className="how-to-use-it-number">
                            <h3>1</h3>
                        </div>
                        <div className="how-to-use-it-details">
                            <h3>{t("howSubTitle1")}</h3>
                            <p><b>{t("howDesc1")}</b></p>
                        </div>
                    </div>
                    <div className="how-to-use-it-content-card">
                        <div className="how-to-use-it-number">
                            <h3>2</h3>
                        </div>
                        <div className="how-to-use-it-details">
                            <h3>{t("howSubTitle2")}</h3>
                            <p><b>{t("howDesc2")}</b></p>
                        </div>
                    </div>
                    <div className="how-to-use-it-content-card">
                        <div className="how-to-use-it-number">
                            <h3>3</h3>
                        </div>
                        <div className="how-to-use-it-details">
                            <h3>{t("howSubTitle3")}</h3>
                            <p><b>{t("howDesc3")}</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}