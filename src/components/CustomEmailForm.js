import React from 'react';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import './_CustomEmailForm.scss';

const SweetAlert = withSwalInstance(swal);

const CustomEmailForm = ({ status, message, onValidated }) => {
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
            title: 'NO CORRECT EMAIL ADRESS HAS BEEN ENTERED',
            text: 'Probably a typo. Please try again',
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
            title: `YOU ARE ALREADY REGISTERED`,
            text: 'You can also follow us on Facebook and instagram !',
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
            title:
              'THANKS A LOT FOR SIGNING UP !',
            text:
              'We will keep you informed about the latest news. Do you already follow us on social media ?',
            showConfirmButton: false,
            allowEnterKey: 'true',
            allowOutsideClick: 'true',
            buttonsStyling: 'false',
          })}
        </SweetAlert>
      )}

      <input className="input-newsletter" ref={(node) => (email = node)} type="email" placeholder="Register with your email" />

      <button className="btn-newsletter" onClick={submit} disabled={status === 'sending'}>
        <i className="fas fa-paper-plane fa-lg"></i>
      </button>
    </div>
  );
};

export default CustomEmailForm;
