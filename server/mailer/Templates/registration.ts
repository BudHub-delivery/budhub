const registration = (url: string, email: string) => {

  // Account Verification Email Template
  return `
  <br>
  <p style="font-size:20px">Click here to complete your <a href="${url}">account registration</a>.</p>
  <br>
  <p style="font-size:20px">This email verification is for <a href="mailto:${email}">${email}</a>.</p>
  <br>
  <p style="font-size:20px">If this is not correct, please ignore this email.</p>
  <br>
  <br>
  <p style="font-size:18px"> If the link above does not work please copy and paste this link into your browser</p>
  <p style="font-size:18px">${url}</p> 
  `
}

export default registration;