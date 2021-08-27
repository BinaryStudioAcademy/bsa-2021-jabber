import sgMail from '@sendgrid/mail';
import { MailTemplate } from '~/common/types/types';

type Constructor = {
  mailerApiKey: string;
  mailerEmail: string;
};

class Mailer {
  #mailerEmail: string;

  constructor({ mailerApiKey, mailerEmail }: Constructor) {
    sgMail.setApiKey(mailerApiKey);
    this.#mailerEmail = mailerEmail;
  }

  public async sendMail(message: MailTemplate): Promise<boolean> {
    try {
      await sgMail.send({
        ...message,
        from: this.#mailerEmail,
      });
      return true;
    } catch {
      return false;
    }
  }
}

export { Mailer };
