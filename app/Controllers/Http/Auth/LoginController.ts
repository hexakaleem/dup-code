// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

export default class LoginController {
  async showLoginForm({ view }) {
    return view.render('auth/login')
  }

  public async login({ request, response, auth, session }: HttpContextContract) {
    // grab uid and password values off request body
    const { email, password } = request.only(['email', 'password'])
    try {
      // attempt to login
     let au= await auth.use("web").attempt(email, password)
      console.log(au)
      // otherwise, redirect to home page
      return response.redirect('/assignments/dashboard')
    } catch (error) {
      // if login fails, return vague form message and redirect back
      session.flash('form', 'Your username, email, or password is incorrect')
      return response.redirect().back()
    }

  }
  public async logout({ response, auth }: HttpContextContract) {
    // logout the user
    await auth.logout()
    // redirect to login page
    return response.redirect().toRoute('auth.login.show')
  }
}
