// const { Resend } = require("resend");
// const resend = new Resend(process.env.RESEND_API_KEY)
import nodemailer from 'nodemailer'

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "860e84acb9c58f",
        pass: "c72587c3ca472b"
    }
});

export async function sendPasswordResetEmail(email, token) {

    const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;

    const mailOptions = {
        from: 'maddison53@ethereal.email',
        to: email,
        subject: "Reset Password",
        html: `<p>Click here: <a href="${confirmLink}">Reset Password </a> (ignore this message if it was not you) </p>`,
    }
    await transport.sendMail(mailOptions);
}

export async function sendVerificationEmail(email, token) {

    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    const mailOptions = {
        from: 'maddison53@ethereal.email',
        to: email,
        subject: "Confirm your email",
        html: `<p>Click here: <a href="${confirmLink}">Verify Account </a> </p>`,
    }
    await transport.sendMail(mailOptions);
}

export async function sendTwoFactorEmail(email, token) {

    const mailOptions = {
        from: 'maddison53@ethereal.email',
        to: email,
        subject: "2FA Token",
        html: `<p>Your code for 2FA: ${token} </p>`,
    }
    await transport.sendMail(mailOptions);
}



// export const sendVerificationEmail = async (email, token) => {
//     const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

//     await resend.emails.send({
//         from: "onboarding@resend.dev",
//         to: email,
//         subject: "Confirm your email",
//         html: `<p>Click here: <a href="${confirmLink}">Verify Account </a> </p>`,
//     })
// }


// export const sendPasswordResetEmail = async (email, token) => {
//     const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;

//     await resend.emails.send({
//         from: "onboarding@resend.dev",
//         to: email,
//         subject: "Reset Password",
//         html: `<p>Click here: <a href="${confirmLink}">Reset Password </a> (ignore this message if it was not you) </p>`,
//     })
// }