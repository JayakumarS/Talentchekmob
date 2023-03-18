export class AuthLoginInfo {
    userId: string;
    password: string;
    otpValue:string;
    userNameEmailId:string;
    companyCode :string;
    recaptchaResponse : string;

    constructor(userId: string, password: string,otpValue: string,userNameEmailId:string,recaptchaResponse:string) {
        this.userId = userId;
        this.password = password;
        this.otpValue = otpValue;
        this.userNameEmailId=userNameEmailId;
        this.recaptchaResponse = recaptchaResponse;
    }
}
