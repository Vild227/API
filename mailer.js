const nodemailer = require('nodemailer');
require('dotenv').config();

const transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'christiaan.backendschool@gmail.com',
        pass: 'e6b971a8e10954',
    },
});

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
    transport,
    sendPasswordResetEmail,
    sendFeatureUpdateEmail,
};
