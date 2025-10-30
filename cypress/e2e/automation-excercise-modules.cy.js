import { createNewUserData,getTestUser } from '../support/helpers';
import { } from '../fixtures/testData.json';
import userData from '../fixtures/support.json';
import menu from '../Modules/Menu';
import cadastro from '../Modules/Cadastro';
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
    });

    it('Login de usuario com email e senha corretos', () => {
        // ARRANGE - Preparar dados do usuário válido e navegar para login
        const validUser = testData.validUser;

        // ACT - Executar as ações de login
        login.preencherFormularioDeLogin(validUser.email, validUser.password);

        // ASSERT - Verificar se o login foi bem-sucedido
        cy.get('a[href="/logout"]').should('be.visible');
        cy.get('i.fa-user').parent().should('contain', validUser.name);
        cy.contains(`Logged in as ${validUser.name}`).should('be.visible');
    });

    it('Login de usuário com e-mail e senha incorretos', () => {
        // ARRANGE - Preparar credenciais inválidas e navegar para login
        const invalidUser = testData.invalidCredentials[0];

        // ACT - Executar as ações de login
        login.preencherFormularioDeLogin(invalidUser.email, invalidUser.password);

        // ASSERT - Verificar se a mensagem de erro é exibida
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!');
    });


    it('Sair do usuário logado', () => {
        // ARRANGE - Preparar dados do usuário e realizar login primeiro
        const validUser = testData.validUser;

        // ACT - Executar as ações de login
        login.preencherFormularioDeLogin(validUser.email, validUser.password);

        // ACT - Executar logout do sistema
        menu.efetuarLogout();

        // ASSERT - Verificar se o logout foi realizado com sucesso
        cy.url().should('include', '/login');
        cy.get('a[href="/logout"]').should('not.exist');
        cy.get('a[href="/login"]').should('contain', 'Signup / Login');
    });

    it('Registrar usuário com e-mail existente', () => {
        // ARRANGE - Usar dados de usuário já existente e navegar para cadastro
        const existingUser = testData.validUser;

        // ACT - Tentar cadastrar com email já existente
        login.preencherFormularioPreCadastro(existingUser);

        // ASSERT - Verificar mensagem de erro
        cy.contains('Email Address already exist!').should('be.visible');
    });

   it('Enviar uma formulario com upload de arquivo', () => {
    // ARRANGE - Preparar dados do formulário de contato
    menu.navegarParaMenuContato();
    
    // ACT - Preencher o formulário de contato
    contato.preencherFormularioContato(userData);

    //ASSERT verificar se estamos na pagina correta e mensagem de sucesso
    cy.get('.status').should('be.visible')
    cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
 
  })

});