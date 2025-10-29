class Cadastro {

    preencherFormularioCadastro(user) {
        // Informações pessoais
        cy.get('#id_gender2').check();
        cy.get('[data-qa="password"]').type(user.password, { log: false });
        
        // Data de nascimento
        cy.get('select[data-qa="days"]').select('10');
        cy.get('select[data-qa="months"]').select('May');
        cy.get('select[data-qa="years"]').select('1990');
        
        // Newsletter e ofertas
        cy.get('input[type=checkbox]#newsletter').check();
        cy.get('input[type=checkbox]#optin').check();
        
        // Informações do endereço
        cy.get('input#first_name').type(user.firstName);
        cy.get('input#last_name').type(user.lastName);
        cy.get('input#company').type(user.company);
        cy.get('input#address1').type(user.address);
        cy.get('select#country').select('Canada');
        cy.get('input#city').type(user.city);
        cy.get('input#state').type(user.state);
        cy.get('[data-qa="zipcode"]').type(user.zipcode);
        cy.get('[data-qa="mobile_number"]').type(user.mobile);
        
        // Submeter formulário
        cy.get('[data-qa="create-account"]').click();
    }
}

export default new Cadastro();