//arquivo princiapal de módulos
class Login {
    preencherFormularioPreCadastro(user) {
        cy.get('[data-qa="signup-name"]').type(user.name);
        cy.get('[data-qa="signup-email"]').type(user.email);
        cy.get('[data-qa="signup-button"]').click();
    }

    preencherFormularioDeLogin(user,password) {
        cy.get('[data-qa="login-email"]').type(user);
        cy.get('[data-qa="login-password"]').type(password);
        cy.get('[data-qa="login-button"]').click();
    }
}
export default new Login();