import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const smtpConfig: SMTPTransport.Options = {
	host: process.env.SMTP_HOST,
	port: 465,
	secure: true,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
};

class MailService {
	transporter: nodemailer.Transporter<
		SMTPTransport.SentMessageInfo,
		SMTPTransport.Options
	>;
	constructor() {
		this.transporter = nodemailer.createTransport(smtpConfig);
	}

	async sendConfirmedMail(userEmail: string, link: string) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: userEmail,
			subject: 'Confirm account',
			html: `
                <div>
                    <h1>To confirm your account, follow the link below</h1>
                    <a href='${link}'>${link}</a>
                </div>
            `,
		});
	}
	async sendForgotPasswordMail(userEmail: string, link: string) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: userEmail,
			subject: 'Forgot password',
			html: `
                <div>
                    <h1>To change password follow the link bellow</h1>
                    <a href='${link}'>${link}</a>
                </div>
            `,
		});
	}
}

export default MailService;
