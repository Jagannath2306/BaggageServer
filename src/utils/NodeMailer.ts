import * as nodeMailer from 'nodemailer'
import * as SendGrid from 'nodemailer-sendgrid-transport'

export class NodeMailer {
    private static initializeTransport() {
        return nodeMailer.createTransport(SendGrid({
            auth: {
                api_key: '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'
            }
        }))
    }

    public static sendEmail(data: { to: [string], subject: string, html: string }): Promise<any> {
        return NodeMailer.initializeTransport().sendMail({
            from: 'baggage.teams@gmail.com',
            to: data.to,
            subject: data.subject,
            html: data.html
        });
    }
}