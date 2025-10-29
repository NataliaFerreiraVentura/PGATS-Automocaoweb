/// <reference types="cypress" />

import { createNewUserData,getTestUser } from '../support/helpers';
import { } from '../fixtures/testData.json';
import userData from '../fixtures/support.json';

describe('Automation Exercise Test Suite', () => {
  let testData;

  before(() => {
    // Carregar os dados do fixture antes de todos os testes
    cy.fixture('testData.json').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    // Setup básico - apenas navegação inicial
    cy.visit('https://automationexercise.com/');
  });

  it('Cadastrar um novo usuário', () => {
    // ARRANGE - Preparar dados do usuário e navegar para página de cadastro
    const newUser = createNewUserData();
    cy.get('a[href="/login"]').click();

    // ACT - Executar cadastro (pré-cadastro + cadastro completo)
    // Passo 1: Preenchimento inicial para acessar formulário completo
    cy.get('[data-qa="signup-name"]').type(newUser.name);
    cy.get('[data-qa="signup-email"]').type(newUser.email);
    cy.get('[data-qa="signup-button"]').click();

    // Passo 2: Preencher formulário completo de cadastro
    cy.get('#id_gender2').check();
    cy.get('[data-qa="password"]').type(newUser.password, { log: false });
    cy.get('select[data-qa="days"]').select('10');
    cy.get('select[data-qa="months"]').select('May');
    cy.get('select[data-qa="years"]').select('1990');
    cy.get('input[type=checkbox]#newsletter').check();
    cy.get('input[type=checkbox]#optin').check();
    cy.get('input#first_name').type(newUser.firstName);
    cy.get('input#last_name').type(newUser.lastName);
    cy.get('input#company').type(newUser.company);
    cy.get('input#address1').type(newUser.address);
    cy.get('select#country').select('Canada');
    cy.get('input#city').type(newUser.city);
    cy.get('input#state').type(newUser.state);
    cy.get('[data-qa="zipcode"]').type(newUser.zipcode);
    cy.get('[data-qa="mobile_number"]').type(newUser.mobile);
    cy.get('[data-qa="create-account"]').click();

    // ASSERT - Verificar se a conta foi criada com sucesso
    cy.url().should('include', '/account_created');
    cy.contains('b', 'Account Created!');
    cy.get('[data-qa="continue-button"]').should('be.visible');
  });

  it('Login de usuario com email e senha corretos', () => {
    // ARRANGE - Preparar dados do usuário válido e navegar para login
    const validUser = testData.validUser;
    cy.get('a[href="/login"]').click();

    // ACT - Executar o login com credenciais válidas
    cy.get('[data-qa="login-email"]').type(validUser.email);
    cy.get('[data-qa="login-password"]').type(validUser.password);
    cy.get('[data-qa="login-button"]').click();

    // ASSERT - Verificar se o login foi bem-sucedido
    cy.get('a[href="/logout"]').should('be.visible');
    cy.get('i.fa-user').parent().should('contain', validUser.name);
    cy.contains(`Logged in as ${validUser.name}`).should('be.visible');
  });

  it('Login de usuário com e-mail e senha incorretos', () => {
    // ARRANGE - Preparar credenciais inválidas e navegar para login
    const invalidUser = testData.invalidCredentials[0];
    cy.get('a[href="/login"]').click();

    // ACT - Tentar fazer login com credenciais incorretas
    cy.get('[data-qa="login-email"]').type(invalidUser.email);
    cy.get('[data-qa="login-password"]').type(invalidUser.password);
    cy.get('[data-qa="login-button"]').click();

    // ASSERT - Verificar se a mensagem de erro é exibida
    cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!');
  });

  it('Registrar usuário com e-mail existente', () => {
    // ARRANGE - Usar dados de usuário já existente e navegar para cadastro
    const existingUser = testData.validUser;
    cy.get('a[href="/login"]').click();

    // ACT - Tentar cadastrar com email já existente
    cy.get('[data-qa="signup-name"]').type(existingUser.name);
    cy.get('[data-qa="signup-email"]').type(existingUser.email);
    cy.get('[data-qa="signup-button"]').click();

    // ASSERT - Verificar mensagem de erro
    cy.contains('Email Address already exist!').should('be.visible');
  });

  it('Sair do usuário logado', () => {
    // ARRANGE - Preparar dados do usuário e realizar login primeiro
    const validUser = testData.validUser;
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="login-email"]').type(validUser.email);
    cy.get('[data-qa="login-password"]').type(validUser.password);
    cy.get('[data-qa="login-button"]').click();

    // ACT - Executar logout do sistema
    cy.get('a[href="/logout"]').click();

    // ASSERT - Verificar se o logout foi realizado com sucesso
    cy.url().should('include', '/login');
    cy.get('a[href="/logout"]').should('not.exist');
    cy.get('a[href="/login"]').should('contain', 'Signup / Login');
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

});
