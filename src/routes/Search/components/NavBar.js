import React from 'react';
import './_NavBar.scss';
import logo from '../img/logo.png';

export default function NavBar() {

  return (

    <div className="navbar">
      <div className="navbar-brand">
        <a href="/"><img src={logo} alt="Pading find the perfect place to meet"/></a>
      </div>
      <div className="navbar-menu">

        <div class="navbar-social">
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-linkedin"></i></a>
        </div>


        <div className=" email-form email-form-background">
          <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
          method="get">
            <input name="EMAIL" placeholder="@ Help us to be known" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Your Email Address '"
            required="" type="email"/>
            <button className="btn-blue">Share with friends</button>
          </form>
        </div>
      </div>
    </div>
  );
}