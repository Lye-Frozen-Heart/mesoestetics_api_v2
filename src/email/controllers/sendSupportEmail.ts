const sendSupportEmail = (transporter, emailUser) => {
  return async (req, res) => {
    const { recipient, subject, message } = req.body;
    if (!recipient || !subject || !message) return null;
    const emailOptions = {
      from: emailUser,
      to: recipient,
      subject,
      text: message,
    };
    try {
      const info = await transporter.sendMail(emailOptions);
      return res.status(200).send(`Correo enviado: ${info.response}`);
    } catch (error) {
      return res.status(500).send(`Error enviando correo: ${error.toString()}`);
    }
  };
};

export default sendSupportEmail;
