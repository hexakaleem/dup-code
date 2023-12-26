// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import File from 'App/Models/File'


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
        // Pass any necessary data to the view

    });
}

}
