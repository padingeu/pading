import React from 'react';
import { Link } from 'react-router-dom';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import Popup from 'reactjs-popup';
import Faq from './Faq';
import CustomEmailForm from './CustomEmailForm';
import './_Footer.scss';

export default class Footer extends React.Component {
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
              <p>
                <b>Redesigning travel search experience</b>
              </p>
              <div className="footer-menu-email-form">
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
            <div className="footer-menu-app-contact">
              <div className="footer-menu-app">
                <h4>Pading</h4>
                <button className="btn-product" onClick={this.props.scrollToTop} href="">
                  <p>Product</p>
                </button>
                <Popup
                  modal
                  trigger={
                    <button>
                      <p>FAQ</p>
                    </button>
                  }
                >
                  <Faq />
                </Popup>
                <Link to="/privacypolicy" onClick={this.props.scrollUp}>
                  <p>Privacy policy</p>
                </Link>
              </div>
              <div className="footer-menu-contact">
                <h4>Contact</h4>
                <a href="mailto:contact@pading.eu" target="_blank" rel="noopener noreferrer">
                  <p>Contact us</p>
                </a>
                <div className="footer-social">
                  <a
                    href="https://www.instagram.com/padingapp/?hl=fr"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="tree-nations">
            <a
              href="https://tree-nation.com/profile/impact/pading-1#co2"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                paddingBottom: '2rem',
                position: 'relative',
                cursor: 'pointer',
                display: 'block',
                zIndex: 1,
              }}
            >
              <img
                src="https://tree-nation.com/images/tracking/label-co2-website-white-en.png"
                alt="logo of tree nation, environmental non profit association"
                style={{ width: 150, height: 'auto' }}
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
