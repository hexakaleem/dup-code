"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDevice_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/UserDevice"));
const Client_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Client"));
class DashboardController {
    async index({ view }) {
        let devices = await UserDevice_1.default.query().count('* as total');
        let total = 0;
        if (devices.length > 0) {
            total = devices[0].$extras.total;
        }
        let users = await Client_1.default.query().count('* as total');
        let total_clients = 0;
        if (users.length > 0) {
            total_clients = users[0].$extras.total;
        }
        console.log(total);
        return view.render('index', {
            total_devices: total,
            total_clients: total_clients,
            payments: 0
        });
    }
}
exports.default = DashboardController;
//# sourceMappingURL=DashboardController.js.map