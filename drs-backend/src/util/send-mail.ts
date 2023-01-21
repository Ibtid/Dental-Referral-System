//used send in blue
import * as Sib from 'sib-api-v3-sdk';
import { errorhandler, successHandler } from './response.handler';
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];

apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();
const sender = {
  email: 'ibtid012@gmail.com',
  name: 'DRS',
};

export const sendMailTest = async (emailConfig: any) => {
  const receivers = [
    {
      email: emailConfig.receiver,
    },
  ];

  try {
    const messageInfo = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: emailConfig.subject,
      textContent: emailConfig.textContent,
      htmlContent: emailConfig.htmlContent,
      params: {
        role: 'Frontend',
      },
    });
    return successHandler(
      messageInfo,
      `We have sent a verification code to ${emailConfig.receiver}, that will expire in 5 minutes from now. Make sure to check your promotion tab or spam tab if not found.`,
    );
  } catch (error) {
    return errorhandler(400, JSON.stringify(error.message));
  }
};
