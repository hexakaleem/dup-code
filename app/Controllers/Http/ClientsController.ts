// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Client from "App/Models/Client";

export default class ClientsController {
  async index({ view,request }:HttpContextContract) {
    let page=  request.input("page",1)
    let clients =await Client.query().paginate(page,20)
    return view.render('clients.index',{
      clients:clients
    })
  }

  async add({ view }) {
    return view.render('clients.add')
  }

  async store({ request, response,   session }: HttpContextContract){

    const newPostSchema = schema.create({
      name: schema.string(),
      email: schema.string([
        rules.email()
      ]),
      password: schema.string([
        rules.minLength(6)
      ])

    })

    /**
     * Validate request body against the schema
     */
    const payload = await request.validate({ schema: newPostSchema })

    let email = payload.email
    let exists =await Client.query().where("email",email).first()
    if(exists){
      session.flash('error', 'Your username, email, or password is incorrect')
      return response.redirect().back()
    }else{
      await Client.create({
        name:payload.name,
        email:payload.email,
        password:payload.password
      })

      session.flash('success', 'Client has been added successfully')
      return response.redirect().back()
    }


  }
}
