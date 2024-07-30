import transporter from "./emailConfig";
import sendSupportEmail from "./sendSupportEmail";
const emailUser = process.env.EMAIL_USER;
const EmailController = () => ({
  sendSupportEmail: sendSupportEmail(transporter, emailUser),
});
export default EmailController;
