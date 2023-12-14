import { BaseCommand } from '@adonisjs/core/build/standalone'
import User from "App/Models/User";

export default class CreateAdmin extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'make:admin'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {

    const name = await this.prompt.ask("Enter name")
    const email = await this.prompt.ask('Enter Email: ')
    const password = await this.prompt.ask('Enter password: ')

    await User.create({
      email: email,
      password: password,
      name: name
    })

    this.logger.info('Admin Created')
  }
}
