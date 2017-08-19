import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import SocialLogosSVGs from './socialLogosSvgs';

const socialLinks = {
    facebook: 'https://www.facebook.com/persianfusioncooking',
    twitter: 'http://www.twitter.com/@sinaiee_maryam',
    google: 'https://plus.google.com/u/0/+maryamsinaieeThepersianfusion',
    pinterest: 'https://www.pinterest.co.uk/MaryamSinaiee1/',
    instagram: 'https://www.instagram.com/maryamspersiancuisine/'
}

const MailListSignup = () => (
    <div className="mailListSignup">
      SIGN UP TO OUR EMAIL FOR NEWS & EXCLUSIVES
      <div className="field has-addons">
        <p className="control">
          <input className="input" type="text" placeholder="Add your email here..."/>
        </p>
        <p className="control">
          <a className="button">
            Subscribe
          </a>
        </p>
      </div>
    </div>
);

const Links = () => (
    <div className="links columns">
      <div className="column">
        <Link to="/contact">Contact Us</Link>
        <Link to="/press">Press</Link>
      </div>

      <div className="column">
        <Link to="/faqs">Frequently Asked Questions</Link>
        <Link to="/delivery-and-returns">Delivery and Returns</Link>
        <Link to="/terms-and-conditions">Terms and Conditions</Link>
        <Link to="/privacy">Privacy</Link>
      </div>

      <div className="column">
        <a href="http://www.thepersianfusion.com/">The Persian Fusion Blog</a>
        <div id="social">
          <a target="_blank" href={socialLinks['facebook']} className="c-link c-link--facebook c-tooltip" aria-label="Facebook">
              <svg className="c-icon"><use xlinkHref="#icon--facebook"></use></svg>
          </a>

          <a target="_blank" href={socialLinks['twitter']} className="c-link c-link--twitter c-tooltip" aria-label="Twitter">
              <svg className="c-icon"><use xlinkHref="#icon--twitter"></use></svg>
          </a>

          <a target="_blank" href={socialLinks['google']} className="c-link c-link--google c-tooltip" aria-label="Google+">
              <svg className="c-icon"><use xlinkHref="#icon--google"></use></svg>
          </a>

          <a target="_blank" href={socialLinks['pinterest']} className="c-link c-link--pinterest c-tooltip" aria-label="Pinterest">
              <svg className="c-icon"><use xlinkHref="#icon--pinterest"></use></svg>
          </a>

          <a target="_blank" href={socialLinks['instagram']} className="c-link c-link--instagram c-tooltip" aria-label="Instagram">
              <svg className="c-icon"><use xlinkHref="#icon--instagram"></use></svg>
          </a>

          <SocialLogosSVGs />
        </div>
      </div>
    </div>
);

const Footer = (props) => (
    <footer>
        <hr/>
        <MailListSignup />
        <hr />
        <Links />
        <hr />
        <center>
          <p>Copyright &copy; Maryam&#39;s Ingredients 2016</p>
          <p>Developed by Luke Southam &lt;luke@devthe.com&gt;</p>
        </center>
    </footer>
);

export default Footer;
