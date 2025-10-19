const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // For a real app, you would use a service like SendGrid, Mailgun, or AWS SES
  // For this example, we'll use a test account from Ethereal, which traps emails.
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        // IMPORTANT: These are placeholder credentials from ethereal.email
        // They are for testing and anyone can view the emails sent.
        // In a real application, use environment variables for your actual email service credentials.
        user: 'maddison53@ethereal.email',
        pass: 'jn7jnAPss4f63QBp6D'
    }
  });

  const mailOptions = {
    from: '"University Department MS" <noreply@udms.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    // You can see the preview of the sent email at the URL below
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
    // We don't re-throw the error because registration should not fail if the email fails.
  }
};

module.exports = sendEmail;
