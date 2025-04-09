import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"GlowCure" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });
    // console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
