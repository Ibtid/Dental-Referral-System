import { errorhandler, successHandler } from './response.handler';

//used send in blue
const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];

apiKey.apiKey =
  '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';

const tranEmailApi = new Sib.TransactionalEmailsApi();
const sender = {
  email: 'ibtid012@gmail.com',
  name: 'DRS',
};

export const sendMailTest = async (email: string, code: string) => {
  console.log(code);
  console.log(process.env.SEND_IN_BLUE_API_KEY);
  const receivers = [
    {
      email: email,
    },
  ];
  try {
    const response = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Confirm Your Email',
      textContent: `Verification Code`,
      htmlContent: `
      <p>Hey ${email},</p>
      <p>Please use the code below to confirm your email</p>
      <h1>
          ${code}
      </h1>
      <p>If you did not request this email you can safely ignore it.</p>
                `,
      params: {
        role: 'Frontend',
      },
    });
    return successHandler(
      { response },
      `We have sent a verification code to ${email}, that will expire in 5 minutes from now. Make sure to check your promotion tab or spam tab if not found.`,
    );
  } catch (err) {
    return errorhandler(500, JSON.stringify(err.message));
  }
};
