import React from "react";
import "../css/HowItWorks.css";
import ResponsiveAppBar from "./Navbar";
import Footer from "./Footer";
function HowItWorks() {
  return (
    <div>
      <ResponsiveAppBar />
      <div className="dopster-how-it-works" id="how-it-works">
        <h2>How it works</h2>
        <p>
          Welcome to Dopster, the online platform that allows you to easily
          upload and showcase your projects! Whether you're a creative
          professional, a student, or simply someone who loves to share your
          work with others, Dopster is the perfect place for you.
        </p>
        <ol>
          <li>
            Sign up for an account: The first step is to create an account on
            Dopster. It's easy and free, and all you need is an email address
            and a password. Once you're signed up, you can start uploading your
            projects right away.
          </li>
          <li>
            Upload your projects: With Dopster, you can upload all kinds of
            projects, from artwork and photography to music and videos. Simply
            choose the project you want to share, and upload it to your account.
            You can add a title, a description, and tags to help other users
            find your project.
          </li>
          <li>
            Showcase your work: Once your project is uploaded, it will be
            visible on your profile page for all to see. You can also share it
            on social media or embed it on your website or blog. Other users can
            like, comment, and share your project, helping to spread the word
            about your work.
          </li>
          <li>
            Discover other projects: Dopster is also a great place to discover
            new and exciting projects from other users. You can browse projects
            by category, search for specific keywords, or check out what's
            trending on the platform. Who knows - you might just find your next
            source of inspiration!
          </li>
        </ol>
        <p>
          So what are you waiting for? Sign up for Dopster today and start
          sharing your projects with the world!
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default HowItWorks;
