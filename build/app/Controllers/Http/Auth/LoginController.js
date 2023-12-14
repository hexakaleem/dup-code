"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginController {
    async showLoginForm({ view }) {
        return view.render('auth/login');
    }
    async login({ request, response, auth, session }) {
        const { email, password } = request.only(['email', 'password']);
        try {
            let au = await auth.use("web").attempt(email, password);
            console.log(au);
            return response.redirect('/done');
        }
        catch (error) {
            session.flash('form', 'Your username, email, or password is incorrect');
            return response.redirect().back();
        }
    }
    async logout({ response, auth }) {
        await auth.logout();
        return response.redirect().toRoute('auth.login.show');
    }
}
exports.default = LoginController;
//# sourceMappingURL=LoginController.js.map