"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const File_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/File"));
const dolos_lib_1 = require("@dodona/dolos-lib");
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
async function report({ view }) {
    const files = await File_1.default.all();
    const filePaths = files.map((file) => file.path);
    const dolos = new dolos_lib_1.Dolos();
    const report = await dolos.analyzePaths(filePaths);
    for (const pair of report.allPairs()) {
        for (const fragment of pair.buildFragments()) {
            const left = fragment.leftSelection;
            const right = fragment.rightSelection;
            console.log(`${pair.leftFile.path}:{${left.startRow},${left.startCol} -> ${left.endRow},${left.endCol}} matches with ${pair.rightFile.path}:{${right.startRow},${right.startCol} -> ${right.endRow},${right.endCol}}`);
        }
    }
    return view.render('report', {});
}
Route_1.default.get('/', async ({ auth, response }) => {
    let isLoggedin = await auth.check();
    if (isLoggedin) {
        return response.redirect().toPath("/assignments/dashboard");
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
    Route_1.default.get('/assignments/dashboard', 'DashboardController.index').as("Dashbaord");
    Route_1.default.get('/plagiarism/checker', 'DashboardController.plagiarism');
    Route_1.default.get('/plagiarism/reports', report);
    Route_1.default.post('/plagiarism/checker/upload', 'FileUploadController.upload');
    Route_1.default.delete('/plagiarism/checker/delete/:id', 'FileUploadController.delete');
    Route_1.default.get('/clients', 'ClientsController.index');
    Route_1.default.get('/clients/add', 'ClientsController.add');
    Route_1.default.post('/clients/add', 'ClientsController.store');
    Route_1.default.get('/devices', 'DevicesController.index');
    Route_1.default.get('/devices/add', 'DevicesController.add');
    Route_1.default.post('/devices/add', 'DevicesController.store');
}).middleware('auth:web');
//# sourceMappingURL=routes.js.map