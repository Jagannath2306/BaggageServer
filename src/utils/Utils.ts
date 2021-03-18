import * as Bcrypt from 'bcrypt';

export class Utils {

    public MAX_TOKEN_TIME = 6000;
    static generateVerificationToken(size: number = 5) {
        let digits = '0123456789';
        let otp = '';
        for (let i = 0; i < size; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return parseInt(otp);
    }

    static encryptPassword(password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, ((err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            }))
        })
    }

    static async passwordCompare(password: { password: string, encryptPassword: string }): Promise<any> {
        return new Promise((resolve, reject) => {
            Bcrypt.compare(password.password, password.encryptPassword, (err, isValid) => {
                if (err) {
                    reject(err)
                } else if (!isValid) {
                    reject(new Error("User and Password Does Not Match."));
                } else {
                    resolve(true);
                }

            })
        })
    }
}