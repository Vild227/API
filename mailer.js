const nodemailer = require('nodemailer');
require('dotenv').config();

const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

module.exports = transport;

const sendPasswordResetEmail = async (to, token) => {
    const resetUrl = `http://130.225.170.71/reset-password/${token}`;

    const message = {
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Password Reset Request',
        text: `Click the following link to reset your password: ${resetUrl}`,
        html: `<p>Click the following link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`,
    };

    await transport.sendMail(message);
};

const sendFeatureUpdateEmail = async (users, featureTitle, featureDescription) => {
    const message = {
        from: process.env.EMAIL_FROM,
        to: users.map((user) => user.email).join(','),
        subject: `New Feature: ${featureTitle}`,
        text: `${featureTitle}\n\n${featureDescription}`,
        html: `<h2>${featureTitle}</h2><p>${featureDescription}</p>`,
    };

    await transport.sendMail(message);
};

module.exports = {
    sendPasswordResetEmail,
    sendFeatureUpdateEmail,
};
