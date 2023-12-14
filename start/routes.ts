/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({  auth,response }) => {

  let isLoggedin =await auth.check()
  if(isLoggedin){
    return response.redirect().toPath("/dashboard")
  }
  else{
    return response.redirect().toPath("/login")
  }

})


Route.get('/login', 'Auth/LoginController.showLoginForm')
Route.post('/login', 'Auth/LoginController.login')
Route.get('/logout', 'Auth/AuthController.logout')

Route.get("/forgot-password",'Auth/AuthController.forgot')
Route.post("/forgot-password",'Auth/AuthController.createResetToken')
Route.get("/reset-password",'Auth/AuthController.reset')
Route.post("/reset-password",'Auth/AuthController.updatePasswordWithToken')



Route.group(() => {
  Route.get('/assignments/dashboard','DashboardController.index')

  Route.get('/plagiarism/checker','DashboardController.plagiarism')
  Route.post('/plagiarism/checker/upload', 'FileUploadController.upload')

  Route.get('/clients','ClientsController.index')
  Route.get('/clients/add','ClientsController.add')
  Route.post('/clients/add','ClientsController.store')


  Route.get('/devices','DevicesController.index')
  Route.get('/devices/add','DevicesController.add')
  Route.post('/devices/add','DevicesController.store')


}).middleware('auth:web')
