import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import Popup from 'reactjs-popup';
import Faq from './Faq';
import CustomEmailForm from './CustomEmailForm';
import './_Footer.scss';

class Footer extends React.Component {
  state = {
    faq: false,
  };

  render() {
    const url =
      'https://pading.us8.list-manage.com/subscribe/post?u=f662f9f87cc780ecd97294f34&amp;id=0ef42685e7';
    return (
      <div className="wrapper">
        <div className="footer">
          <div className="footer-menu">
            <div className="footer-menu-email">
              <p>{this.props.t("footerEmailText")}</p>
              <div>
                <MailchimpSubscribe
                  url={url}
                  render={({ subscribe, status, message }) => (
                    <CustomEmailForm
                      status={status}
                      message={message}
                      onValidated={(formData) => subscribe(formData)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="footer-menu-app">
              <Link to="/blog" onClick={this.props.scrollUp}>
                <button className="btn-footer">
                  <span>Blog</span>
                </button>
              </Link>
              <Popup
                modal
                trigger={
                  <button className="btn-footer">
                    <span>{this.props.t("faqBtn")}</span>
                  </button>
                }
              >
                {(closePopup) => (
                  <div className="popup">
                    <button className="close-popup" onClick={closePopup}>
                      <i className="fas fa-times fa-lg"></i>
                    </button>
                    <Faq />
                  </div>
                )}
              </Popup>
              <a
                className="btn-footer"
                href="https://trello.com/b/NoQieqmu/pading-public-roadmap"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Roadmap</span>
              </a>
              <a href="mailto:contact@pading.eu" target="_blank" rel="noopener noreferrer">
                <span>{this.props.t("contactBtn")}</span>
              </a>
              <div className="footer-social">
                <a
                  href="https://www.facebook.com/Pading-103563007939325/?view_public_for=103563007939325"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  href="https://www.instagram.com/pading.eu/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Footer);