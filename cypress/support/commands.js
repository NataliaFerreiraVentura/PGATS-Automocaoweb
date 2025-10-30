// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Importa o cypress-xpath para usar seletores XPath
require('cypress-xpath')

// Comando personalizado para navegar para login
Cypress.Commands.add('NavegarParaLogin', () => { 
    cy.get('a[href="/login"]').should('be.visible').click()
})

/**
 * Comando otimizado para capturas leves
 * @param {string} stepName - Nome da etapa
 */
Cypress.Commands.add('captureStep', (stepName) => {
    // Só captura se não estiver em modo headless para CI/CD
    if (Cypress.browser.isHeaded || Cypress.env('CAPTURE_SCREENSHOTS')) {
        cy.wait(100) // Reduzido para ser mais rápido
        
        const fileName = `${stepName}-${Date.now()}`
        cy.screenshot(fileName, {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            overwrite: true, // Sobrescreve para economizar espaço
            scale: false // Remove escala para arquivos menores
        })
    }
})

/**
 * Comando para capturar apenas em falhas (mais eficiente)
 * @param {string} selector - Seletor do elemento
 * @param {string} name - Nome do arquivo
 */
Cypress.Commands.add('captureElement', (selector, name) => {
    if (Cypress.browser.isHeaded || Cypress.env('CAPTURE_SCREENSHOTS')) {
        cy.get(selector).should('be.visible')
        cy.get(selector).screenshot(name, {
            disableTimersAndAnimations: true,
            overwrite: true,
            scale: false
        })
    }
})

/**
 * Comando para limpeza manual de arquivos antigos
 */
Cypress.Commands.add('cleanupOldFiles', () => {
    cy.task('cleanupFiles', { days: 3 })
})

/**
 * Comando personalizado para capturar screenshots em etapas de teste
 * Segue convenções de nomenclatura e organização
 * @param {string} stepName - Nome descritivo da etapa (ex: '01-login-page')
 * @param {object} options - Opções adicionais para captura
 */
Cypress.Commands.add('captureStep', (stepName, options = {}) => {
    // Aguarda estabilização da UI
    cy.wait(300)
    
    // Sanitiza nome do teste removendo caracteres especiais
    const testName = Cypress.currentTest.title
        .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove caracteres especiais
        .replace(/\s+/g, '-')            // Substitui espaços por hífens
        .toLowerCase()                   // Converte para minúsculas
        .substring(0, 50)                // Limita tamanho do nome
    
    // Sanitiza nome da etapa
    const cleanStepName = stepName
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
    
    // Cria estrutura de pastas por especfile
    const specName = Cypress.spec.name.replace('.cy.js', '')
    const fileName = `${specName}/${testName}/${cleanStepName}`
    
    const stepOptions = {
        capture: 'viewport',
        disableTimersAndAnimations: true,
        blackout: [
            '.loading-spinner',
            '.advertisement', 
            '[data-cy="sensitive-info"]'
        ],
        overwrite: false,
        ...options
    }
    
    cy.screenshot(fileName, stepOptions)
})

/**
 * Comando para capturar screenshot de elementos específicos
 * @param {string} selector - Seletor do elemento
 * @param {string} name - Nome do screenshot
 * @param {object} options - Opções adicionais
 */
Cypress.Commands.add('captureElement', (selector, name, options = {}) => {
    cy.get(selector).should('be.visible').then(($el) => {
        const elementOptions = {
            capture: 'runner',
            clip: {
                x: $el[0].offsetLeft,
                y: $el[0].offsetTop,
                width: $el[0].offsetWidth,
                height: $el[0].offsetHeight
            },
            disableTimersAndAnimations: true,
            overwrite: false,
            ...options
        }
        
        cy.screenshot(name, elementOptions)
    })
})

/**
 * Comando para capturar screenshot apenas em caso de falha
 * Útil para testes que não precisam de capturas constantes
 * @param {string} testStep - Descrição da etapa do teste
 */
Cypress.Commands.add('captureOnFailure', (testStep) => {
    cy.then(() => {
        // Este comando será executado apenas se houver falha
        // devido ao mecanismo automático do Cypress
        const fileName = `failure-${testStep}-${Date.now()}`
        cy.screenshot(fileName, { 
            capture: 'fullPage',
            disableTimersAndAnimations: true 
        })
    })
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })