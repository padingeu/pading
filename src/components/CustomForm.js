import React from "react";
import { withSwalInstance } from "sweetalert2-react";
import swal from "sweetalert2";
import "./_CustomForm.scss";

const SweetAlert = withSwalInstance(swal);

const CustomForm = ({ status, message, onValidated }) => {
    let email;
  
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
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
              title: 'This email address is not valid. Can you check it please?',
              text: "Probably a typo :)",
              showConfirmButton: false,
              allowEnterKey: 'true',
              allowOutsideClick: 'true',
              buttonsStyling: 'false',
              timer: 2500
            })}
          </SweetAlert>
        )
      }
    }
  
    return (
      <div>
        {status === "error" && (
          <SweetAlert>
            {swal.fire({
              icon: "info",
              title: `You are already part of our community but you can still follow us on Facebook and Instagram!`,
              text: "To be noticed of Pading's upcoming launch, check your emails sometimes",
              showConfirmButton: false,
              allowEnterKey: "true",
              allowOutsideClick: "true",
              buttonsStyling: "false"
            })}
          </SweetAlert>
        )}
        {status === "success" && (
          <SweetAlert>
            {swal.fire({
              icon: "success",
              title: "Thanks a lot for registrating! You can also follow us on Facebook and Instagram",
              text: "We will inform you soon about Pading's launch so you can be among the first to use the app",
              showConfirmButton: false,
              allowEnterKey: "true",
              allowOutsideClick: "true",
              buttonsStyling: "false"
            })}
          </SweetAlert>
        )}
  
        <input
          ref={(node) => (email = node)}
          type="email"
          placeholder="Register with your email"
        />
  
        <button
          className="btn-blue"
          onClick={submit}
          disabled={status === "sending"}
        >
          <i className="fas fa-paper-plane fa-lg"></i>
        </button>
      </div>
    );
  };

  export default CustomForm;