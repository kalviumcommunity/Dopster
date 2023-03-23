import React from 'react';
import '../css/PrivacyPolicy.css'
import ResponsiveAppBar from './Navbar';
import Footer from './Footer';
function PrivacyPolicy() {
  return (
    <div>
        <ResponsiveAppBar/>
    <div id="privacy-policy">
      <h2>Privacy Policy</h2>
      <p className="policy-text">
        At Dopster, we take your privacy very seriously. We understand that you
        are entrusting us with your personal information, and we are committed
        to ensuring that this information is kept safe and secure at all times.
      </p>
      <p className="policy-text">
        When you use Dopster to upload your projects, we collect certain
        information about you, such as your name, email address, and project
        details. This information is used to provide you with the best possible
        experience on our platform, and to allow us to provide you with updates
        and notifications about your projects.
      </p>
      <p className="policy-text">
        We store your data using MongoDB, one of the most secure and reliable
        database management systems available. This ensures that your data is
        protected from unauthorized access and that it is always available when
        you need it.
      </p>
      <p className="policy-text">
        We also take great care to secure your passwords. All passwords are
        encrypted using advanced encryption algorithms, which makes it virtually
        impossible for anyone to access your account without your permission.
      </p>
      <p className="policy-text">
        In addition to our commitment to data security, we also place a great
        emphasis on typography and design. Our website has been designed with
        readability and usability in mind, and we have taken great care to ensure
        that our typography is clear, concise, and easy to read.
      </p>
      <p className="policy-text">
        We believe that these factors – security, privacy, and design – are all
        critical components of a successful platform. We are committed to
        providing you with the best possible experience on Dopster, and we will
        continue to work hard to ensure that your privacy and security are always
        our top priorities. If you have any questions or concerns about our
        privacy policy or any other aspect of our platform, please don't hesitate
        to reach out to us.
      </p>
    </div>
<Footer/>
    
</div>
  );
}

export default PrivacyPolicy;
