import express from "express";
import nodemailer from 'nodemailer';
import { prisma } from "./prisma";

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a7c56ee7a152f8",
    pass: "512a770de7a6cf"
  }
});

app.post('/feedbacks', async (req, res) => {

  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedback Widget <oi@feedback.com>',
    to: 'Wanderson Timóteo <wanderson_timoteo@hotmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p> Tipo do feedback: ${type}</p>`,
      `<p> Comentário: ${comment}</p>`,
      `</div>`,
    ].join('\n')
  })

  return res.status(201).json({ data: feedback });
})

app.listen(3000, () => {
  console.log('HTTP: http://localhost:3000 server running!')
})
1h55