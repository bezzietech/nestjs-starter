import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SharedService {
  constructor() {
    //
  }

  private sendMail = (
    to: string,
    subject: string,
    fromName: string,
    text?: string,
    html?: string,
    from = 'no-reply@bezzietech.com',
  ) => {
    const mailOptions: nodemailer.SendMailOptions = {
      from: fromName ? `${fromName} ${from}` : from,
      to,
      subject,
      html,
      text,
    };
    const mailTransport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT, 10),
      secure: process.env.SECURE_MAIL == 'true',
      requireTLS: process.env.REQUIRE_TLS == 'true',
      auth: {
        type: 'login',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    return new Promise<boolean>((resolve, reject) => {
      mailTransport.sendMail(mailOptions, function (error: any) {
        if (error) {
          console.log(
            `Some error occurerd while sending mail. ${error}`,
            'error',
            'Nodemailer',
          );
          reject(false);
        } else {
          console.log(
            `Mail successfully sent to email - ${to}`,
            'info',
            'Nodemailer',
          );
          resolve(true);
        }
      });
    });
  };
}
