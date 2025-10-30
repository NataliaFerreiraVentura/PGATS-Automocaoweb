import { createNewUserData,getTestUser } from '../support/helpers';
import { } from '../fixtures/testData.json';
import userData from '../fixtures/formContact.json';
import menu from '../Modules/Menu';
import cadastro from '../Modules/Cadastro/index.js';
import login from '../Modules/Login';
import contato from '../Modules/Contato';


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
        
        menu.navegarParaMenuLogin();
        
        cy.url().should('include', '/login');
        cy.get('.login-form').should('be.visible');
    });

    it('Cadastrar um novo usuário', () => {
        // ARRANGE - Preparar dados e navegar para a tela de cadastro
        const newUser = createNewUserData();
        
        // ACT - Executar as ações de cadastro
        login.preencherFormularioPreCadastro(newUser);
        cadastro.preencherFormularioCadastro(newUser);

        // ASSERT - Verificar se o cadastro foi bem-sucedido
        cy.get('[data-qa="account-created"]')
            .should('be.visible')
            .and('contain', 'Account Created!');
        
        cy.get('[data-qa="continue-button"]')
            .should('be.visible')
            .and('contain', 'Continue');
        cy.captureStep('cadastro-modulo-sucesso');
    });

    it('Login de usuario com email e senha corretos', () => {
        // ARRANGE - Preparar dados do usuário válido e navegar para login
        const validUser = testData.validUser;

        // ACT - Executar as ações de login usando módulos
        login.preencherFormularioDeLogin(validUser.email, validUser.password);

        // ASSERT - Verificar se o login foi bem-sucedido
        cy.get('a[href="/logout"]').should('be.visible');
        cy.get('i.fa-user').parent().should('contain', validUser.name);
        cy.contains(`Logged in as ${validUser.name}`).should('be.visible');
        cy.captureStep('login-modulo-sucesso');
    });

    it('Login de usuário com e-mail e senha incorretos', () => {
        // ARRANGE - Preparar credenciais inválidas e navegar para login
        const invalidUser = testData.invalidCredentials[0];
  

        // ACT - Executar as ações de login
        login.preencherFormularioDeLogin(invalidUser.email, invalidUser.password);

        // ASSERT - Verificar se a mensagem de erro é exibida
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!');
        cy.captureStep('erro-login-modulo');
    });


    it('Sair do usuário logado', () => {
        // ARRANGE - Preparar dados do usuário e realizar login primeiro
        const validUser = testData.validUser;

        // ACT - Executar as ações de login
        login.preencherFormularioDeLogin(validUser.email, validUser.password);
        cy.captureStep('01-usuario-logado');

        // ACT - Executar logout do sistema
        menu.efetuarLogout();
        cy.captureStep('02-apos-logout');

        // ASSERT - Verificar se o logout foi realizado com sucesso
        cy.url().should('include', '/login');
        cy.get('a[href="/logout"]').should('not.exist');
        cy.get('a[href="/login"]').should('contain', 'Signup / Login');
        cy.captureStep('03-logout-realizado-com-sucesso');
    });

    it('Registrar usuário com e-mail existente', () => {
        // ARRANGE - Usar dados de usuário já existente e navegar para cadastro
        const existingUser = testData.validUser;

        // ACT - Tentar cadastrar com email já existente
        login.preencherFormularioPreCadastro(existingUser);
        cy.captureStep('01-apos-tentativa-cadastro-email-existente');

        // ASSERT - Verificar mensagem de erro
        cy.contains('Email Address already exist!').should('be.visible');
        cy.captureStep('02-mensagem-erro-email-existente');
    });

   it('Enviar uma formulario com upload de arquivo', () => {
    // ARRANGE - Preparar dados do formulário de contato
    menu.navegarParaMenuContato();
    cy.get('[data-qa="name"]').should('be.visible')
    
    // ACT - Preencher o formulário de contato usando módulo
    contato.preencherFormularioContato(userData);

    //ASSERT verificar se estamos na pagina correta e mensagem de sucesso
    cy.get('.status').should('be.visible')
    cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
    cy.captureStep('contato-modulo-sucesso');
 
  })

});