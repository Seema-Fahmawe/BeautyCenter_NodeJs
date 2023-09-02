import nodemailer from 'nodemailer';

const sendEmail = async (to,subject,html) => {
    const transporter = nodemailer.createTransport({
       service:'gmail',
        auth: {
            user: process.env.EMAIL,
            pass:process.env.PASSWORD_EMAIL
        }
    });

    const info = await transporter.sendMail({
        from: `"Beauty Center" <${process.env.EMAIL}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
    });
}

export default sendEmail;