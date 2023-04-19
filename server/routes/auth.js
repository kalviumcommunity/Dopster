const express = require("express");
const router = express.Router();

require("dotenv").config();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const fetch = require("node-fetch");
var randomString = require("random-string");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const requireLogin = require("../middleware/requireLogin");
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.NODEMAILER,
    },
  })
);

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(422).json({ error: "plz add all the fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "user allready exists" });
      }

      bcrypt.hash(password, 12).then((password) => {
        const user = new User({
          email,
          password,
          name,
        });
        user
          .save()
          .then((user) => {
            transporter.sendMail({
              to: user.email,
              from: "dopster.platform@gmail.com",
              subject: "Signup successful",
              html: `<h1> Hi ${user.name}, Welcome to Dopster</h1>`,
            });
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            res.status(400).json({ error: err.message });
          });
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "plz fill all the fields" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "invalid email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const { _id, name, email, pic, dopeCredits } = savedUser;
          console.log(pic, dopeCredits);
          // res.json({message:"Successfully signed in"})
          const token = jwt.sign({ _id: savedUser._id }, secret);
          res.json({ token, user: { _id, name, email, pic, dopeCredits } });
        } else {
          return res.status(422).json({ error: "Invalid email or password" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ error: err.message });
      });
  });
});
async function verifyToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const user = {
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  };
  return user;
}
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  const userFind = await User.findOne({ email: email });

  const token = jwt.sign({ _id: userFind._id }, secret, {
    expiresIn: "1d",
  });

  const { _id, name } = userFind;

  const setUserToken = await User.findByIdAndUpdate(
    { _id: _id },
    { resetToken: token },
    { new: true }
  );

  if (setUserToken) {
    transporter.sendMail({
      to: userFind.email,
      from: "dopster.platform@gmail.com",
      subject: "Reset Password",
      html: `
              <p>You requested for password reset</p>
              <h3>Click <a href="${process.env.LOCALHOST}/newpassword/${userFind._id}/${token}">here</a> to reset your password</h3>
              `,
    });
    res.status(200).json({
      message: "password reset mail has been sent to you registered email",
    });
  }
});
router.post("/new-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  console.log(token);
  const validuser = await User.findOne({ _id: id, resetToken: token });
  // const verifytoken = jwt.verify(token,secret)

  if (validuser) {
    const newpassword = await bcrypt.hash(password, 12);
    const setnewpass = await User.findByIdAndUpdate(
      { _id: id },
      { password: newpassword }
    );
    setnewpass.save();
    res.status(201).json({ message: "Password updated successfully" });
  } else {
    res.json({ error: "Link has been expired" });
  }
});
async function verifyToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const user = { email: payload.email, name: payload.name };
  return user;
}
router.post("/auth/googleauth", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(402).json({ error: "Unexpected error occured" });
  }
  const user = await verifyToken(token);

  const userexist = await User.findOne({ email: user.email });

  if (userexist) {
    const { _id, name, email, dopeCredits } = userexist;
    const updateUser = await User.findByIdAndUpdate(
      { _id: _id },
      { pic: user.picture },
      { new: true }
    );
    const { pic } = updateUser;
    const jwtoken = jwt.sign({ _id: userexist._id }, secret);
    res.json({ jwtoken, user: { _id, name, email, dopeCredits, pic } });
  } else {
    const newuser = await new User({
      email: user.email,
      password: "",
      pic: user.picture,
      name: user.name,
      isGoogleUser: true,
    });
    await newuser.save();

    const googleuser = await User.findOne({ email: user.email });
    console.log(user);
    const { _id, name, email, pic } = googleuser;
    const jwtoken = jwt.sign({ _id: googleuser._id }, secret);
    res.json({ jwtoken, user: { _id, name, email } });
  }
});
router.get("/profile", requireLogin, async (req, res) => {
  const findUser = await User.findById({ _id: req.user._id });
  console.log(findUser);
  res.send(findUser);
});

// Payments

router.post("/cashfree", requireLogin, (req, res) => {
  const { _id, email } = req.user;
  const { amount } = req.body;
  var x = randomString({
    length: 8,
    numeric: true,
    letters: true,
    special: false,
    exclude: ["a", "b", "1"],
  });
  console.log(x);
  const url = "https://sandbox.cashfree.com/pg/orders";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "x-client-id": process.env.CASHFREE_CLIENT_ID,
      "x-client-secret": process.env.CASHFREE_SECRET,
      "x-api-version": "2022-09-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      customer_details: {
        customer_id: _id,
        customer_email: email,
        customer_phone: "9467104915",
      },
      order_meta: {
        return_url: "https://dopster.pages.dev/cashfree/{order_id}",
      },
      order_id: x,
      order_amount: amount,
      order_currency: "INR",
    }),
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      if (json.payment_session_id) {
        console.log(json);
        res.status(200).json(json.payment_session_id);
      }
    })
    .catch((err) => console.error("error:" + err));
});

router.post("/payment-result", (req, res) => {
  const { orderid } = req.body;

  const url = `https://sandbox.cashfree.com/pg/orders/${orderid}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-client-id": process.env.CASHFREE_CLIENT_ID,
      "x-client-secret": process.env.CASHFREE_SECRET,
      "x-api-version": "2022-09-01",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      res.status(200).json(json);
      console.log(json);
    })
    .catch((err) => console.error("error:" + err));
});

module.exports = router;
