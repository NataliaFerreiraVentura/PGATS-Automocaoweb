// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Configuração simples para screenshots consistentes
beforeEach(() => {
    // Aguarda página carregar completamente
    cy.document().should('have.property', 'readyState', 'complete')
    
    // Desabilita animações para capturas estáveis
    cy.get('body').then(($body) => {
        $body.css({
            'animation-duration': '0s',
            'transition-duration': '0s'
        })
    })
})