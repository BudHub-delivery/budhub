import path from 'path';
require('dotenv').config({path: path.join(__dirname, '../../.env')})

// Password Reset Email Template
const reset = (url: string, email: string) => {

  return `
  <br>
  <p style="font-size:20px">Click here to complete your <a href="${url}">password reset</a>.</p>
  <br>
  <p style="font-size:20px"> This is a password reset email for <a href="mailto:${email}">${email}</a></p>
  <br>
  <p style="font-size:20px"> If this password reset was not initiated by you, please visit <a href="${process.env.SITE_URL}">${process.env.SITE_URL}</a> and reset your password.</p>
  <br>
  <p style="font-size:20px"> This link is valid for 24 hours forom the time issued.</p>
  <br>
  <p style="font-size:18px"> If the link above does not work please copy and paste this link into your browser</p>
  <p style="font-size:18px">${url}</p> 
  `
}

export default reset;