import { prisma } from "./prisma";
import nodemailer from 'nodemailer';
import express from 'express';
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";

export const routes =  express.Router()

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a7c56ee7a152f8",
    pass: "512a770de7a6cf"
  }
});

routes.post('/feedbacks', async (req, res) => {

  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository
  ) 

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  })

  // await transport.sendMail({
  //   from: 'Equipe Feedback Widget <oi@feedback.com>',
  //   to: 'Wanderson Timóteo <wanderson_timoteo@hotmail.com>',
  //   subject: 'Novo feedback',
  //   html: [
  //     `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
  //     `<p> Tipo do feedback: ${type}</p>`,
  //     `<p> Comentário: ${comment}</p>`,
  //     `</div>`,
  //   ].join('\n')
  // })

  return res.status(201).send()
})
1h27

