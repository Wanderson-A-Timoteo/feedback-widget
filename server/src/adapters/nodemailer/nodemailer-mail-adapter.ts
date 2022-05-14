import nodemailer from 'nodemailer';
import { MailAdaper, SendMailData } from "../mail-adapter";


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a7c56ee7a152f8",
    pass: "512a770de7a6cf"
  }
});

export class NodemailMailAdapter implements MailAdaper {
  async sendMail ({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedback Widget <oi@feedback.com>',
      to: 'Wanderson Timóteo <wanderson_timoteo@hotmail.com>',
      subject,
      html: body,
    });
  };
}