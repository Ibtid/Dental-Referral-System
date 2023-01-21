import * as nodemailer from 'nodemailer';
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const CLIENTSECRET = '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';
const CLIENTID =
  '380415895296-mbnt7acej5a8vf3v5cco9l310b67ml4d.apps.googleusercontent.com';
const REDIRECTURL = 'https://developers.google.com/oauthplayground';
const REFRESHTOKEN =
  '1//04-xvPzPyzzI5CgYIARAAGAQSNwF-L9IrwPOZyZpvosHfmtY6w6tCuslfQ63I4WI-rEbVOuuKIR1fzxYPL2L44ac0ybQtwV96q3g';

const scopes = ' https://mail.google.com/';

const AuthorizationCode =
  '4/0AX4XfWgAemOM7sHVdeNZ8y5yX1OCyfjY91SE4xnAxssunkKvc13mSFbIZ_e4FBtsXkR4Pg';

export const sendEmail = async (email: string, url: string) => {
  const oauth2Client = new OAuth2(CLIENTID, CLIENTSECRET, REDIRECTURL);

  oauth2Client.setCredentials({
    refresh_token: REFRESHTOKEN,
  });
  const accessToken = oauth2Client.getAccessToken();

  const link = await oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  //console.log(link);

  oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
      console.log('REFRESH: ', tokens.refresh_token);
    }
    console.log('ACCESS: ', tokens.access_token);
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'teamupp89@gmail.com',
      clientSecret: CLIENTSECRET,
      clientId: CLIENTID,
      refreshToken: REFRESHTOKEN,
      accessToken,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    to: email,
    subject: 'Welcome to DRS! Confirm your Email',
    text: 'Hello world?', // plain text body
    html: `<p>Hey ${email},</p>
    <p>Please use the code below to confirm your email</p>
    <h1>
        ${url}
    </h1>
    <p>If you did not request this email you can safely ignore it.</p>
    `,
  });
  console.log(url);
  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};
