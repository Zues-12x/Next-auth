const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email, token) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click here: <a href="${confirmLink}">Verify Account </a> </p>`,
    })
}


export const sendPasswordResetEmail = async (email, token) => {
    const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset Password",
        html: `<p>Click here: <a href="${confirmLink}">Reset Password </a> (ignore this message if it was not you) </p>`,
    })
}