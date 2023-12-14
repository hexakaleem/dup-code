"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@adonisjs/core/build/standalone");
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class CreateAdmin extends standalone_1.BaseCommand {
    async run() {
        const name = await this.prompt.ask("Enter name");
        const email = await this.prompt.ask('Enter Email: ');
        const password = await this.prompt.ask('Enter password: ');
        await User_1.default.create({
            email: email,
            password: password,
            name: name
        });
        this.logger.info('Admin Created');
    }
}
exports.default = CreateAdmin;
CreateAdmin.commandName = 'make:admin';
CreateAdmin.description = '';
CreateAdmin.settings = {
    loadApp: true,
    stayAlive: false,
};
//# sourceMappingURL=CreateAdmin.js.map