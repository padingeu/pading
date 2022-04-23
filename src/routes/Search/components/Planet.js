import React from 'react';
import { useTranslation } from 'react-i18next';
import './_Planet.scss';
import earthPlanet from '../img/earth-planet.svg';


export default function Planet() {
    const { t } = useTranslation();

    return (
        <div className="wrapper">
            <div className="planet">
                <div className="planet-content">
                    <div className="planet-title-details">
                        <h2><span className="focus-text"><span className="underline"></span>{t("planetTitle1")}</span><br/><span className="focus-text"><span className="underline"></span>{t("planetTitle2")}</span></h2>
                        <br/>
                        <p>{t("planetDesc1")}</p>
                        <p>{t("planetDesc2")}</p>
                    </div>
                    <img className="planet-image" alt={t("planetandCatImgAlt")} src={earthPlanet}/>
                </div>
            </div>
        </div>
    )
}
