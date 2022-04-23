import React from 'react';
import onClickOutside from 'react-onclickoutside';
import './_LanguageChoice.scss';
import en from '../img/languages/en.png';
import fr from '../img/languages/fr.png';
import es from '../img/languages/es.png';
import de from '../img/languages/de.png';

function LanguageChoices(props) {

    return (
        <div className="language-set">
            <button onClick={(event) => props.setLanguageChoices(event)}><img src={require(`../img/languages/${props.lang}.png`)} alt={props.lang} /></button>
            {props.showLanguageChoices && (
            <div className="language-choices">
                <button className="change-language-btn" onClick={props.changeLanguage("en")}><img src={en} alt="english flag" /><span>english</span></button>
                <button className="change-language-btn" onClick={props.changeLanguage("fr")}><img src={fr} alt="french flag" /><span>français</span></button>
                <button className="change-language-btn" onClick={props.changeLanguage("es")}><img src={es} alt="spanish flag" /><span>español</span></button>
                <button className="change-language-btn" onClick={props.changeLanguage("de")}><img src={de} alt="german flag" /><span>deutsch</span></button>
            </div>
            )}
        </div>
    )
}

export default (onClickOutside(LanguageChoices));