import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ResetToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  email : string

  @column()
  token : string

  @column()
  used : boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static generateRandomCode() {
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10); // Generates a random digit between 0 and 9
    }
    return code;
  }

  public static async createResetToken(email: string): Promise<string> {

    // Generate a reset token
    const resetToken = this.generateRandomCode()

    // Create a new reset token record
    await this.create({
      email,
      token: resetToken,
      used: false,
    })

    return resetToken
  }

  public static async isTokenValid(email: string, token: string): Promise<boolean> {
    // Check if the email and token combination exists and is not used
    const existingToken = await this.query()
      .where('email', email)
      .where('token', token)
      .where('used', false)
      .first()

    return !!existingToken
  }

}
