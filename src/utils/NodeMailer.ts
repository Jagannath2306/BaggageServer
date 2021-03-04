import * as nodeMailer from 'nodemailer'
import * as SendGrid from 'nodemailer-sendgrid-transport'

export class NodeMailer {
    private static initializeTransport() {
        return nodeMailer.createTransport(SendGrid({
            auth: {
                api_user: 'jagannathjena2306@gmail.com',
                api_key: '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'
            }
        }))
    }

    public static sendEmail(data: { to: [string], subject: string, html: string }): Promise<any> {
        return NodeMailer.initializeTransport().sendMail({
            from: 'account@baggage.com',
            to: data.to,
            subject: data.subject,
            html: data.html
        });
    }
}