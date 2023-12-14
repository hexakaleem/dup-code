// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Client from "App/Models/Client"
import {schema} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import ResetToken from "App/Models/ResetToken";
import EmailService from "App/Services/EmailService";

var emailService = new EmailService()
export default class AuthController {

  async forgot({ view }) {

    return view.render('auth/forgot')
  }
  async reset({ view }) {

    return view.render('auth/reset')
  }
  /**
   * Generates a reset token for the specified email
   * @param ctx - The HTTP context containing the request and response objects
   */
  public async createResetToken({ request, response,   session }: HttpContextContract) {
    try {
      // Extract the email from the request
      const email = request.input('email')

      // Check if the email exists in the request
      if (!email) {
         session.flash({
          error:"Email is required in the request",
        })
        return response.redirect().back()
      }

      // Check if the email exists in the User model
      const user = await Client.findBy('email', email)

      if (!user) {
        session.flash({
          error:"Invalid email address",
          email:request.input("email"),
        })
        return response.redirect().back()
       }

      // Generate a reset token using the model method
      const resetToken = await ResetToken.createResetToken(email)

      // You can send the reset token to the user via email or other means
      await emailService.passwordRecovery(email,resetToken)
      // For now, we'll just return it in the response

      return response.redirect().toPath("/reset-password")
    } catch (error) {
      console.log(error.message)
      // Handle errors, such as email not found
      session.flash({
        error:"There was a technical error",
        email:request.input("email"),
      })
      return response.redirect().back()
    }
  }

  /**
   * Validates and processes a reset token for the specified email
   * @param ctx - The HTTP context containing the request and response objects
   */
  public async processResetToken({ request, response }: HttpContextContract) {
    try {
      // Extract the email and token from the request
      const email = request.input('email')
      const token = request.input('token')

      // Validate the token using the model method
      await ResetToken.isTokenValid(email, token)



      return response.json({ message: 'Token is valid' })
    } catch (error) {
      // Handle errors, such as invalid token or other validation issues
      return response.status(400).json({ message: error.message })
    }
  }



  /**
   * Validates and updates the password using the reset token
   * @param ctx - The HTTP context containing the request and response objects
   */
  public async updatePasswordWithToken(ctx: HttpContextContract ) {
    try {

      const newPostSchema = schema.create({
        token: schema.string(),
        password: schema.string(),
        confirm_password:schema.string()
      })

      const payload = await ctx.request.validate({ schema: newPostSchema })

      // Extract the token, password, and confirm_password from the request
      const token = payload.token
      const password = payload.password
      const confirmPassword = payload.confirm_password

      if(password!==confirmPassword){
        return ctx.response.status(400).json({ message:"Password confirmation does not match." })

      }

      // Retrieve the reset token instance by token
      const resetToken = await this.getResetTokenByToken(token)

      // Validate the token
      if (!resetToken || resetToken.used) {
        throw new Error('Invalid or used token')
      }

      // Retrieve the email associated with the token
      const email = resetToken.email

      // Find the user by email
      const user = await Client.findBy('email', email)

      if (!user) {
        return ctx.response.status(400).json({ message: 'Invalid Token' })
      }

      // Update the user's password
      user.password = password
      await user.save()

      // Mark the reset token as used
      resetToken.used = true
      await resetToken.save()

      return ctx.response.json({ message: 'Password updated successfully' })
    } catch (error) {
      // Handle errors, such as invalid token or other validation issues
      return ctx.response.status(400).json( error  )
    }
  }

  /**
   * Retrieves the reset token instance by token
   * @param token - The reset token to retrieve
   * @returns {Promise<ResetToken | null>} - The reset token instance or null if not found
   */
  private async getResetTokenByToken(token: string): Promise<ResetToken | null> {
    return ResetToken.query().where('token', token).where('used',false).firstOrFail()
  }

  public async logout(ctx: HttpContextContract){
    await ctx.auth.logout()
    return ctx.response.redirect().toPath("/")
  }

}
