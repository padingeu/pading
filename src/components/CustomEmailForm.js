import React from 'react';
import { useTranslation } from 'react-i18next';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import './_CustomEmailForm.scss';

const SweetAlert = withSwalInstance(swal);

const CustomEmailForm = ({ status, message, onValidated }) => {
  const { t } = useTranslation();
  
  let email;

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const submit = () => {
    if (email && emailRegex.test(email.value)) {
      onValidated({
        EMAIL: email.value,
      });
    } else {
      return (
        <SweetAlert>
          {swal.fire({
            icon: 'error',
            text: `${t("signingUpErrorText")}`,
            showConfirmButton: false,
            allowEnterKey: 'true',
            allowOutsideClick: 'true',
            buttonsStyling: 'false',
            timer: 2500,
          })}
        </SweetAlert>
      );
    }
  };

  return (
    <div className="register-form">
      {status === 'error' && (
        <SweetAlert>
          {swal.fire({
            icon: 'info',
            title: `${t("signingUpInfoTitle")}`,
            text: `${t("signingUpInfoText")}`,
            showConfirmButton: false,
            allowEnterKey: 'true',
            allowOutsideClick: 'true',
            buttonsStyling: 'false',
          })}
        </SweetAlert>
      )}
      {status === 'success' && (
        <SweetAlert>
          {swal.fire({
            icon: 'success',
            title: `${t("signingUpSuccessTitle")}`,
            text: `${t("signingUpSuccessText")}`,
            showConfirmButton: false,
            allowEnterKey: 'true',
            allowOutsideClick: 'true',
            buttonsStyling: 'false',
          })}
        </SweetAlert>
      )}
      
      <div className="subscribe-newsletter">
        <input className="input-newsletter" ref={(node) => (email = node)} type="email" placeholder={t("emailPlaceholder")} />
        <button
          className="btn-newsletter"
          onClick={submit} disabled={status === 'sending'}
        >
          <i className="fas fa-envelope fa-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default CustomEmailForm;
