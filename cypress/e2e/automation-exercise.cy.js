/// <reference types="cypress" />

import userData from '../fixtures/users.json';
import imageData from '../fixtures/images.json';
describe('Automation Exercise Test Suite', () => {
  beforeEach(() => {
    // Visitar o site antes de cada teste
    cy.visit('https://automationexercise.com/');
    cy.get('a[href="/login"]').should('be.visible').click();
    
    // Verificar se a página de login carregou corretamente
    cy.url().should('include', '/login');
    cy.get('.login-form').should('be.visible');
  });

  it('Cadastrar um novo usuário', () => {
    // ARRANGE - Preparar dados do usuário e navegar para página de cadastro
    const timestamp = new Date().getTime();
    const userData = {
      name: 'John Doe',
      email: `teste${timestamp}@example.com`,
      password: 'Password123',
      firstName: 'John',
      lastName: 'Doe',
      company: 'PGATS',
      address: '123 Test St',
      city: 'Test City',
      state: 'Test State',
      zipcode: '12345',
      mobile: '21 987653210'
    };

    cy.title().should('include', 'Automation Exercise');
    cy.get('.signup-form').should('be.visible').contains('New User Signup!').should('be.visible');

    // Preenchimento inicial para acessar formulário completo
    cy.get('[data-qa="signup-name"]').type(userData.name);
    cy.get('[data-qa="signup-email"]').type(userData.email);
    cy.get('[data-qa="signup-button"]').click();

    // ACT - Preencher formulário completo de cadastro e criar conta
    cy.get('#id_gender2').check();
    cy.get('[data-qa="password"]').type(userData.password, { log: false });
    cy.get('select[data-qa="days"]').select('10');
    cy.get('select[data-qa="months"]').select('May');
    cy.get('select[data-qa="years"]').select('1990');
    cy.get('input[type=checkbox]#newsletter').check();
    cy.get('input[type=checkbox]#optin').check();
    cy.get('input#first_name').type(userData.firstName);
    cy.get('input#last_name').type(userData.lastName);
    cy.get('input#company').type(userData.company);
    cy.contains('Street address, P.O. Box, Company name, etc.').should('be.visible');
    cy.get('input#address1').type(userData.address);
    cy.get('select#country').select('Canada');
    cy.get('input#city').type(userData.city);
    cy.get('input#state').type(userData.state);
    cy.get('[data-qa="zipcode"]').type(userData.zipcode);
    cy.get('[data-qa="mobile_number"]').type(userData.mobile);
    cy.get('[data-qa="create-account"]').click();

    // ASSERT - Verificar se a conta foi criada com sucesso
    cy.url().should('include', '/account_created');
    cy.contains('b', 'Account Created!');
    cy.get('[data-qa="continue-button"]').should('be.visible');
  });

  it('Login de usuario com email e senha corretos', () => {
    // ARRANGE - Preparar dados e navegar para página de login
    const testeUser = {
      name: 'naty',
      email: 'testenaty96@gmail.com',
      password: 'Teste@12'
    };

    // ACT - Executar o login (ação principal)
    cy.get('[data-qa="login-email"]').type(testeUser.email);
    cy.get('[data-qa="login-password"]').type(testeUser.password);
    cy.get('[data-qa="login-button"]').click();

    // ASSERT - Verificar se o login foi bem-sucedido
    cy.get('a[href="/logout"]').should('be.visible');
    cy.get('i.fa-user').parent().should('contain', testeUser.name);
    cy.contains(`Logged in as ${testeUser.name}`).should('be.visible');
  });

  it('Login de usuário com e-mail e senha incorretos', () => {
    // ARRANGE - Preparar credenciais inválidas e navegar para página de login
    const invalidCredentials = {
      email: 'testenaty96@gmail.com',
      password: 'senhaIncorreta123'
    };

    // ACT - Tentar fazer login com credenciais incorretas
    cy.get('[data-qa="login-email"]').type(invalidCredentials.email);
    cy.get('[data-qa="login-password"]').type(invalidCredentials.password);
    cy.get('[data-qa="login-button"]').click();

    // ASSERT - Verificar se a mensagem de erro é exibida
    cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!');
  });

  it('Registrar usuário com e-mail existente', () => {
    // ARRANGE - Usar dados importados
    const existingUser = userData.validUser;

    // ACT - Tentar cadastrar com email já existente
    cy.get('[data-qa="signup-name"]').type(existingUser.name);
    cy.get('[data-qa="signup-email"]').type(existingUser.email);
    cy.get('[data-qa="signup-button"]').click();

    // ASSERT - Verificar mensagem de erro
    cy.contains('Email Address already exist!').should('be.visible');
  });

  it('Sair do usuário logado', () => {
    // ARRANGE - Preparar credenciais válidas e fazer login primeiro
    const testeUser = {
      name: 'naty',
      email: 'testenaty96@gmail.com',
      password: 'Teste@12'
    };

    cy.get('[data-qa="login-email"]').type(testeUser.email);
    cy.get('[data-qa="login-password"]').type(testeUser.password);
    cy.get('[data-qa="login-button"]').click();
    cy.get('i.fa-user').parent().should('contain', testeUser.name);

    // ACT - Executar logout do sistema
    cy.get('a[href="/logout"]').should('be.visible').click();

    // ASSERT - Verificar se o logout foi realizado com sucesso
    cy.url().should('include', '/login');
    cy.get('a[href="/logout"]').should('not.exist');
    cy.get('a[href="/login"]').should('contain', 'Signup / Login');
  });

});
