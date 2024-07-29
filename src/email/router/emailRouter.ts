import { Router, Request, Response } from 'express';
import transporter from '../controller/emailConfig';

const emailRouter = Router();

emailRouter.post('/send-email', (req: Request, res: Response) => {
    const { recipient, subject, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Correo enviado: ' + info.response);
    });
});

export default emailRouter;