import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'



export default class EmailService {

  public async passwordRecovery(email:string,token:string){

    var sender= Env.get("SMTP_FROM")
    var company_title= Env.get("COMPANY_NAME")
    await Mail.send((message) => {
      message
        .from(sender)
        .to(email)
        .subject('Password Reset Confirmation')
        .htmlView('emails/password_reset', { token: token,company_title:company_title })
    })
  }


}
