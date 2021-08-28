import sgMail from '@sendgrid/mail';
import { MailTemplate } from '~/common/types/types';

type Constructor = {
  mailerApiKey: string;
};

class Mailer {

  constructor({ mailerApiKey }: Constructor) {
    sgMail.setApiKey(mailerApiKey);
  }

  public async sendMail(message: MailTemplate, mailerEmail: string): Promise<boolean> {
    try {
      await sgMail.send({
        ...message,
        from: mailerEmail,
      });
      return true;
    } catch {
      return false;
    }
  }
}

export { Mailer };
