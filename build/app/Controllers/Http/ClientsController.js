"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Client_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Client"));
class ClientsController {
    async index({ view, request }) {
        let page = request.input("page", 1);
        let clients = await Client_1.default.query().paginate(page, 20);
        return view.render('clients.index', {
            clients: clients
        });
    }
    async add({ view }) {
        return view.render('clients.add');
    }
    async store({ request, response, session }) {
        const newPostSchema = Validator_1.schema.create({
            name: Validator_1.schema.string(),
            email: Validator_1.schema.string([
                Validator_1.rules.email()
            ]),
            password: Validator_1.schema.string([
                Validator_1.rules.minLength(6)
            ])
        });
        const payload = await request.validate({ schema: newPostSchema });
        let email = payload.email;
        let exists = await Client_1.default.query().where("email", email).first();
        if (exists) {
            session.flash('error', 'Your username, email, or password is incorrect');
            return response.redirect().back();
        }
        else {
            await Client_1.default.create({
                name: payload.name,
                email: payload.email,
                password: payload.password
            });
            session.flash('success', 'Client has been added successfully');
            return response.redirect().back();
        }
    }
}
exports.default = ClientsController;
//# sourceMappingURL=ClientsController.js.map