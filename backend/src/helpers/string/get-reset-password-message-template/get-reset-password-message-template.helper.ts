import { MailTemplate } from '~/common/types/types';

const getResetPasswordMessageTemplate = (password: string, email: string): MailTemplate => ({
  to: email,
  subject: 'Your new Jabber password',
  text: `Your Jabber password has been reseted. Your new password is "${password}"`,
  html: `<div>Your Jabber password has been reseted. Your new password is <bold>"${password}"</bold></div>`,
});

export { getResetPasswordMessageTemplate };
