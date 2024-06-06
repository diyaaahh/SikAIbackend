const nodemailer = require("nodemailer");
const { formatDateTime } = require("../utils/formatDateAndTime");
const getAllStudentEmails = require("../Controllers/userController");

const transporterConfig = {
  service: "gmail",
  auth: {
    user: "mrknowall35423@gmail.com",
    pass: "hyit whps ickg qlec",
  },
};

const sendMail = async (mailMessage) => {
  const transporter = nodemailer.createTransport(transporterConfig);
  await transporter.sendMail(mailMessage);
};

const sendMailToUsersAboutExam = async (examData) => {
  const allEmails = await getAllStudentEmails();

  const [date, time] = formatDateTime(examData.date);

  const mailMessage = {
    from: process.env.email,
    to: allEmails,
    subject: "Notice About Upcoming Exam",
    html: `
        <p>Dear student,</p>
        <p>We would like to inform you about an upcoming exam:</p>
        
        <h3>Exam Details</h3>
        <p><strong>Title:</strong> ${examData.title}</p>
        <p><strong>Subject:</strong> ${examData.subject}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Duration:</strong> ${examData.duration} minutes</p>

        <p>Please make sure to prepare well and be ready for the exam on time. If you have any questions or concerns, feel free to reach out to your teacher or the administration.</p>
        
        <p>Good luck!</p>
        <p>Thank you!</p>
        `,
  };

  await sendMail(mailMessage);
};

module.exports = { sendMail, sendMailToUsersAboutExam };
