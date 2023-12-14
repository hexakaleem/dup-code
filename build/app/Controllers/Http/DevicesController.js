"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Client"));
const UserDevice_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/UserDevice"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class DevicesController {
    async index({ view, request }) {
        let page = request.input("page", 1);
        let devices = await UserDevice_1.default.query().paginate(page, 20);
        return view.render('devices/index', {
            devices: devices
        });
    }
    async add({ view }) {
        let clients = await Client_1.default.query().select(["name", "id"]).exec();
        return view.render('devices/add', {
            clients: clients
        });
    }
    async store({ request, response, session }) {
        const newPostSchema = Validator_1.schema.create({
            name: Validator_1.schema.string(),
            imei: Validator_1.schema.string(),
            grai: Validator_1.schema.string(),
            device_id: Validator_1.schema.string(),
            client: Validator_1.schema.number(),
        });
        const payload = await request.validate({ schema: newPostSchema });
        let exists = await UserDevice_1.default.query().where("device_id", payload.device_id).first();
        if (exists) {
            session.flash('error', 'A device is already exists with this device id.');
            session.flash({
                device_id: request.input("device_id"),
                name: request.input("name"),
                grai: request.input("grai"),
                imei: request.input("imei"),
                client: request.input("client"),
            });
            return response.redirect().back();
        }
        else {
            await UserDevice_1.default.create({
                name: payload.name,
                imei: payload.imei,
                grai: payload.grai,
                device_id: payload.device_id,
                user_id: payload.client
            });
            session.flash('success', 'Device successfully registered');
            return response.redirect().back();
        }
    }
}
exports.default = DevicesController;
//# sourceMappingURL=DevicesController.js.map