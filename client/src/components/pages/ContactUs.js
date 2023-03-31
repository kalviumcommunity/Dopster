import React from 'react';
import '../css/contact.css'
import ResponsiveAppBar from './Navbar';
import Footer from './Footer';
function ContactUs() {
  return (
    <>
    <ResponsiveAppBar/>
    <div className="contact" id="contact-us" style={{minHeight:"70vh"}} >
      <h2>Contact Us</h2>
      <p>We appreciate your interest in Dopster and would love to hear from you! If you have any questions, concerns, or feedback, please don't hesitate to reach out to us.</p>
      <ul>
        <li>Phone: xxxxxxxxxxx</li>
        <li>Email: dopster.platform@gmail.com</li>
        <li>Social Media: Follow us on Twitter and Facebook for updates and news</li>
        <li>Address: [Insert your company's physical address here]</li>
      </ul>
      <p>We are available during regular business hours, Monday through Friday, and will do our best to respond to your inquiry as soon as possible.</p>
      <p>Thank you for choosing Dopster!</p>
    </div>
    <Footer/>
    </>
  );
}

export default ContactUs;