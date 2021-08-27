import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = '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';

class Mailer {
  public sendMail(): void {
    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
      to: 'artem.totality@gmail.com', // Change to your recipient
      from: 'acid_jazz@ukr.net', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail
      .send(msg)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('Email sent');
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    return;
  }
}

export { Mailer };
