class Contato {

    preencherFormularioContato(userData) {
      cy.get('[data-qa="name"]').type(userData.name);
      cy.get('[data-qa="email"]').type(userData.email);
      cy.get('[data-qa="subject"]').type(userData.subject);
      cy.get('[data-qa="message"]').type(userData.message);
      cy.fixture('formData.json').as('arquivo')
      cy.get('input[type=file]').selectFile('@arquivo');
      cy.get('[data-qa="submit-button"]').click();
    }

}

export default new Contato();