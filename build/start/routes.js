"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', async ({ auth, response }) => {
    let isLoggedin = await auth.check();
    if (isLoggedin) {
        return response.redirect().toPath("/dashboard");
    }
    else {
        return response.redirect().toPath("/login");
    }
});
Route_1.default.get('/login', 'Auth/LoginController.showLoginForm');
Route_1.default.post('/login', 'Auth/LoginController.login');
Route_1.default.get('/logout', 'Auth/AuthController.logout');
Route_1.default.get("/forgot-password", 'Auth/AuthController.forgot');
Route_1.default.post("/forgot-password", 'Auth/AuthController.createResetToken');
Route_1.default.get("/reset-password", 'Auth/AuthController.reset');
Route_1.default.post("/reset-password", 'Auth/AuthController.updatePasswordWithToken');
Route_1.default.group(() => {
    Route_1.default.get('/dashboard', 'DashboardController.index');
    Route_1.default.get('/clients', 'ClientsController.index');
    Route_1.default.get('/clients/add', 'ClientsController.add');
    Route_1.default.post('/clients/add', 'ClientsController.store');
    Route_1.default.get('/devices', 'DevicesController.index');
    Route_1.default.get('/devices/add', 'DevicesController.add');
    Route_1.default.post('/devices/add', 'DevicesController.store');
}).middleware('auth:web');
//# sourceMappingURL=routes.js.map