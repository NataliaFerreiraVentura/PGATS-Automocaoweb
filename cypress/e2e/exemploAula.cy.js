
/// <reference types="cypress" />
import userData from '../fixtures/support.json';

describe('Automation Exercise Test Suite', () => {

    beforeEach(() => {
    // Visitar o site antes de cada teste
    cy.visit('https://automationexercise.com/');

    })

   it('Cadastrar um novo usuário', () => {
   });

   it('Login de usuário com e-mail e senha corretos', () => {
   });

   it('Login de usuário com e-mail e senha incorretos', () => {
   });

   it('Sair do usuário logado', () => {
   });

   it('Enviar uma formulario com upload de arquivo', () => {
      cy.get(`a[href*=contact]`).click();
      cy.get('[data-qa="name"]').type(userData.name);
      cy.get('[data-qa="email"]').type(userData.email);
      cy.get('[data-qa="subject"]').type(userData.subject);
      cy.get('[data-qa="message"]').type(userData.message);
      cy.fixture('formData.json').as('arquivo')
      cy.get('input[type=file]').selectFile('@arquivo');
      //cy.get('input[type=file]').selectFile('cypress/fixtures/formData.json');
      cy.get('[data-qa="submit-button"]').click();

      cy.get('.status').should('be.visible')
      cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
   })

})