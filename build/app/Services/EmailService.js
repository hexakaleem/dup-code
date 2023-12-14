"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mail_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/Mail"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
class EmailService {
    async passwordRecovery(email, token) {
        var sender = Env_1.default.get("SMTP_FROM");
        var company_title = Env_1.default.get("COMPANY_NAME");
        await Mail_1.default.send((message) => {
            message
                .from(sender)
                .to(email)
                .subject('Password Reset Confirmation')
                .htmlView('emails/password_reset', { token: token, company_title: company_title });
        });
    }
}
exports.default = EmailService;
//# sourceMappingURL=EmailService.js.map