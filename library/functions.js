const sgMail = require("@sendgrid/mail");
require("dotenv").config();

var sendEmail = (email, subject, htmlBody) => {
  
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: "noreply@xipto.com",
    subject: subject,
    //text: "send as plain/text"
    html: htmlBody
  };
  return (sgMail.send(msg));
};

module.exports = {
  sendEmail: sendEmail
};