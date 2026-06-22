const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: options.to,
    subject: options.subject,
    html: options.text,
  });
};

module.exports = sendEmail;