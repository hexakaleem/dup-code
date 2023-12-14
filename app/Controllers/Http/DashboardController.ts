// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UserDevice from "App/Models/UserDevice";
import File from 'App/Models/File'
import Drive from '@ioc:Adonis/Core/Drive'
import Application from '@ioc:Adonis/Core/Application'
export default class DashboardController {
  async index({ view }) {

    return view.render('index',{

    })
  }

  async plagiarism({ view }) {

    const files = await File.all();

    return view.render('plagiarism', {
      uploadedFiles:files,
     })

  }

  async report({ view }) {


    return view.render('report', {

     })

  }
}
