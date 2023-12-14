"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Client"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const ResetToken_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ResetToken"));
const EmailService_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/EmailService"));
var emailService = new EmailService_1.default();
class AuthController {
    async forgot({ view }) {
        return view.render('auth/forgot');
    }
    async reset({ view }) {
        return view.render('auth/reset');
    }
    async createResetToken({ request, response, session }) {
        try {
            const email = request.input('email');
            if (!email) {
                session.flash({
                    error: "Email is required in the request",
                });
                return response.redirect().back();
            }
            const user = await Client_1.default.findBy('email', email);
            if (!user) {
                session.flash({
                    error: "Invalid email address",
                    email: request.input("email"),
                });
                return response.redirect().back();
            }
            const resetToken = await ResetToken_1.default.createResetToken(email);
            await emailService.passwordRecovery(email, resetToken);
            return response.redirect().toPath("/reset-password");
        }
        catch (error) {
            console.log(error.message);
            session.flash({
                error: "There was a technical error",
                email: request.input("email"),
            });
            return response.redirect().back();
        }
    }
    async processResetToken({ request, response }) {
        try {
            const email = request.input('email');
            const token = request.input('token');
            await ResetToken_1.default.isTokenValid(email, token);
            return response.json({ message: 'Token is valid' });
        }
        catch (error) {
            return response.status(400).json({ message: error.message });
        }
    }
    async updatePasswordWithToken(ctx) {
        try {
            const newPostSchema = Validator_1.schema.create({
                token: Validator_1.schema.string(),
                password: Validator_1.schema.string(),
                confirm_password: Validator_1.schema.string()
            });
            const payload = await ctx.request.validate({ schema: newPostSchema });
            const token = payload.token;
            const password = payload.password;
            const confirmPassword = payload.confirm_password;
            if (password !== confirmPassword) {
                return ctx.response.status(400).json({ message: "Password confirmation does not match." });
            }
            const resetToken = await this.getResetTokenByToken(token);
            if (!resetToken || resetToken.used) {
                throw new Error('Invalid or used token');
            }
            const email = resetToken.email;
            const user = await Client_1.default.findBy('email', email);
            if (!user) {
                return ctx.response.status(400).json({ message: 'Invalid Token' });
            }
            user.password = password;
            await user.save();
            resetToken.used = true;
            await resetToken.save();
            return ctx.response.json({ message: 'Password updated successfully' });
        }
        catch (error) {
            return ctx.response.status(400).json(error);
        }
    }
    async getResetTokenByToken(token) {
        return ResetToken_1.default.query().where('token', token).where('used', false).firstOrFail();
    }
    async logout(ctx) {
        await ctx.auth.logout();
        return ctx.response.redirect().toPath("/");
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map