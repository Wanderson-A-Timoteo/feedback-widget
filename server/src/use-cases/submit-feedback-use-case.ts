import { MailAdaper } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot: string;
}

export class SubmitFeedbackUseCase {

  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdaper,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    // Testes unitários de envio de email
    if (!type) {
      throw new Error('Type is required')
    }

    if (!comment) {
      throw new Error('Comment is required')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }
// Fim dos testes unitários
    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;"`,
        `<p>Tipo de feedback: ${type}</>`,
        `<p>Comentário: ${comment}</>`,
        `</div>`
      ].join('\n')
    })
  }
}