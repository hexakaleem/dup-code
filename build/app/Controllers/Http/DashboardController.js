"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const File_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/File"));
class DashboardController {
    async index({ view }) {
        return view.render('index', {});
    }
    async plagiarism({ view }) {
        const files = await File_1.default.all();
        return view.render('plagiarism', {
            uploadedFiles: files,
        });
    }
    async report({ view }) {
        return view.render('report', {});
    }
}
exports.default = DashboardController;
//# sourceMappingURL=DashboardController.js.map