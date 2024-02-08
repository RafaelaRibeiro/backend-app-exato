import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { emailReply } from 'src/shared/templates/emailReply';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: Number(process.env.PORT_EMAIL),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    this.transporter.on('log', console.log);
  }

  async sendEmail(
    to: string,
    ticketId: number,
    subject: string,
    agentName: string,
    userName: string,
    content: string,
  ) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: `Chamado #${ticketId} - ${subject} foi respondido`,
      html: emailReply(ticketId, subject, agentName, userName, content),
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
      console.log('Erro de autenticação SMTP:', error);
      throw new Error('Erro ao enviar e-mail.');
    }
  }
}
